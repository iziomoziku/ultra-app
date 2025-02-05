using api.Models;
using api.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ExerciseController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IUserValidationService _userValidationService;


        public ExerciseController(AppDbContext context, IUserValidationService userValidationService)
        {
            _context = context;
            _userValidationService = userValidationService;

        }

        // function to remove exercise from routine
        // function to update name of exercise
        // function to delete exercise

        /***
        Add a new exercise make sure all logs are empty
        **/
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Add(Exercise exercise)
        {
            if (exercise == null)
            {
                return BadRequest("Exercise cannot be null.");
            }

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                return Unauthorized("UserId not found in token.");
            }

            // Console.WriteLine($"Extracted UserId: {userId}");
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
            {
                return BadRequest("User not found in database.");
            }

            exercise.UserId = userId;

            if (string.IsNullOrWhiteSpace(exercise.Id) || string.IsNullOrWhiteSpace(exercise.Name))
            {
                return BadRequest("Exercise must have a valid Id and Name.");
            }

            // var existingExercise = await _context.Exercises.FindAsync(exercise.Id);
            var existingExercise = await _context.Exercises
                                        .Where(e => e.Id == exercise.Id && e.UserId == exercise.UserId)
                                        .FirstOrDefaultAsync();
            if (existingExercise != null)
            {
                return Conflict($"User with ID'{userId}' already has an exercise with this ID '{exercise.Id}'.");
            }

            exercise.Rep ??= new List<Rep>();
            exercise.Log ??= new List<ExerciseLog>();

            await _context.Exercises.AddAsync(exercise);
            await _context.SaveChangesAsync();

            return Ok("Exercise Added");
        }

        /****
        Get an exercise based on the id
        ****/
        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetExercise(string id)
        {

            if (id == null)
            {
                return BadRequest("Exercise id is required.");
            }

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                return Unauthorized("UserId not found");
            }

            var exercise = await _context.Exercises
                                        .Include(e => e.Log) // Eagerly load the related entity
                                        .Where(e => e.Id == id && e.UserId == userId)
                                        .FirstOrDefaultAsync();

            if (exercise == null) return NotFound($"Exercise with ID '{id}' not found for the current user.");

            return Ok(exercise);
        }

        /****
        Add an exercise log to the exercise
        ****/
        [Authorize]
        [HttpPost("log")] // http://localhost:8081/api/exercise/log?id=e1&scheduleId=s1
        public async Task<IActionResult> LogExercise([FromBody] ExerciseLog log, string id, string scheduleId)
        {
            if (log == null)
            {
                return BadRequest("Exercise log is required.");
            }

            // validate user
            var (user, errorResult) = await _userValidationService.ValidateUserAsync(User);
            if (errorResult != null) return errorResult;

            // Use GetExercise to fetch the exercise
            var result = await GetExercise(id);
            if (result is OkObjectResult okResult && okResult.Value is Exercise exercise)
            {
                // add exercise id which is FK to exercise
                log.ExerciseId = id;

                // Add the log to the exercise
                exercise.Log.Add(log);

                // Save changes to the database
                await _context.SaveChangesAsync();

                // ✅ Find the schedule and mark the exercise as complete
                var schedule = await _context.Schedules
                    .FirstOrDefaultAsync(s => s.Id == scheduleId);

                if (schedule != null && !schedule.CompletedExercises.Contains(id))
                {
                    schedule.CompletedExercises.Add(id);
                    await _context.SaveChangesAsync();
                }

                var updatedschedule = await _context.Schedules
                                    .Include(s => s.Routine)
                                        .ThenInclude(r => r.Exercises)
                                    .Include(s => s.Exercises)
                                        .ThenInclude(e => e.Log)
                                    .Where(s => s.UserId == user.Id && s.Complete == false)
                                    .OrderBy(s => s.Order)
                                    .ToListAsync();

                return Ok(updatedschedule);
            }

            // Handle errors from GetExercise
            return result;
        }

        /****
        Get all the exercises
        ****/
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAll()
        {

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                return Unauthorized("UserId not found");
            }

            var user = await _context.Users.FindAsync(userId);
            if (user == null)
            {
                return BadRequest("User not found in database.");
            }

            var exercises = await _context.Exercises
                            .Include(e => e.Log)
                            .Where(e => e.UserId == userId)
                            .ToListAsync();

            if (exercises == null || exercises.Count == 0) return NotFound("No exercise found");

            return Ok(exercises);
        }
    }
}

