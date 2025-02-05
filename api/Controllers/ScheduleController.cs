using api.Models;
using api.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ScheduleController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IUserValidationService _userValidationService;

        private async Task<(Schedule schedule, IActionResult errorResult)> GetScheduleEntityAsync(string id)
        {
            // Check if id is provided
            if (string.IsNullOrEmpty(id)) return (null, BadRequest("Schedule id is required."));

            // validate user
            var (user, errorResult) = await _userValidationService.ValidateUserAsync(User);
            if (errorResult != null) return (null, NotFound($"User not found"));

            var schedule = await _context.Schedules
                .Include(s => s.Routine)
                .ThenInclude(r => r.Exercises)
                .FirstOrDefaultAsync(s => s.Id == id && s.UserId == user.Id);

            if (schedule == null) return (null, NotFound($"Schedule with ID '{id}' not found for the current user."));


            return (schedule, null);
        }


        public ScheduleController(AppDbContext context, IUserValidationService userValidationService)
        {
            _context = context;
            _userValidationService = userValidationService;
        }

        /*******
        Add new schedule
        *******/
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Add(string routineID, [FromBody] Schedule schedule)
        {

            if (schedule == null) 
                return BadRequest("Schedule cannot be null.");

            if (string.IsNullOrEmpty(routineID))
                return BadRequest("Routine ID is required.");

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null) 
                return Unauthorized("UserId not found in token.");

            // Console.WriteLine($"Extracted UserId: {userId}");

            var user = await _context.Users.FindAsync(userId);
            if (user == null) 
                return BadRequest("User not found in database.");

            // Fetch the routine
            var routine = await _context.Routines
                                        .Include(r => r.Exercises )
                                        .FirstOrDefaultAsync(r => r.Id == routineID && r.UserId == userId);

            if (routine == null)
                return NotFound($"Routine with ID '{routineID}' not found for the current user.");

            // Check if schedule already exist
            var existingSchedule = await _context.Schedules
                                                .FirstOrDefaultAsync(s => s.Id == schedule.Id && s.UserId == userId);

            if (existingSchedule != null)   
                return Conflict($"A Schedule with Id '{routine.Id}' already exists.");

            // Set foreign key values
            schedule.UserId = userId;
            schedule.RoutineId = routine.Id;
            schedule.RoutineUserId = routine.UserId;
            schedule.Exercises = routine.Exercises.ToList();
            schedule.Note = "";
            schedule.Routine = routine;

            // save to the DB
            _context.Schedules.Add(schedule);
            await _context.SaveChangesAsync();

            var updatedschedule = await _context.Schedules
                                    .Include(s => s.Routine)
                                    .ThenInclude(r => r.Exercises)
                                    .Include(s => s.Exercises)
                                    .Where(e => e.UserId == userId)
                                    .OrderBy(s => s.Order)
                                    .ToListAsync();

            return Ok(updatedschedule);
        }

        
        [HttpGet("complete/{id}")]
        public async Task<IActionResult> MarkComplete(string id)
        {

            if (id == null)
            {
                return BadRequest("Schedule id is required.");
            }

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

            var schedule = await _context.Schedules
                                .Include(s => s.Routine)
                                .FirstOrDefaultAsync(s => s.Id == id && s.UserId == userId);

            if (schedule == null) return NotFound($"Schedule with ID '{id}' not found for the current user.");

            schedule.Complete = true;

            // Update the the DB
            _context.Schedules.Update(schedule);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Schedule marked as complete successfully." });
        }

        /*******
        Get a specific schedule
        *******/
        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> Get(string id)
        {


            if (string.IsNullOrEmpty(id)) return (BadRequest("Schedule id is required."));

            // Vslidate user
            var (user, validateErrorResult) = await _userValidationService.ValidateUserAsync(User);
            if (validateErrorResult != null) return validateErrorResult;

            var (schedule, errorResult) = await GetScheduleEntityAsync(id);
            if (errorResult != null) return errorResult;

            return Ok(schedule);
        }

        /*******
        Get all schedule
        *******/
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
            
            var schedule = await _context.Schedules
                                    .Include(s => s.Routine)
                                    .ThenInclude(r => r.Exercises)
                                    .Include(s => s.Exercises)
                                    .ThenInclude(e => e.Log)
                                    .Where(e => e.UserId == userId)
                                    .OrderBy(s => s.Order)
                                    .ToListAsync();

            if (schedule == null || schedule.Count == 0) return NotFound("No schedules found");

            return Ok(schedule);
        }


        /*******
        Reorder schedule
        *******/
        [HttpPost("reorder")]
        [Authorize]
        public async Task<IActionResult> ReorderSchedules([FromBody] List<Schedule> reorderedSchedules)
        {
            if (reorderedSchedules == null || reorderedSchedules.Count == 0)
                return BadRequest("Reordered schedules cannot be null or empty.");

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
                return Unauthorized("UserId not found in token.");

            int index = 1;
            foreach (var schedule in reorderedSchedules)
            {

                var existingSchedule = await _context.Schedules
                                .FirstOrDefaultAsync(s => s.Id == schedule.Id && s.UserId == userId);

                if (existingSchedule == null || existingSchedule.UserId != userId)
                    return BadRequest($"Schedule with ID '{schedule.Id}' not found or not owned by the user.");

                existingSchedule.Order = index;
                index++;
            }

            await _context.SaveChangesAsync();
            return Ok(reorderedSchedules);
        }



        public class AddExerciseRequests
        {
            public string? ExerciseID { get; set; }
        }

         /*******
        Add exercise to routine
        http://localhost:8081/api/schedule/{scheduleID}/update-exercise
        
        body: 
        {
            "exerciseID": "e1"
        }
        *******/

        [HttpPost("{scheduleID}/update-exercise")]
        [Authorize]
        public async Task<IActionResult> AddExercises(string scheduleID, [FromBody] AddExerciseRequests request)
        {
            if (string.IsNullOrEmpty(request.ExerciseID))
                return BadRequest("Exercise ID is required.");

            if (string.IsNullOrEmpty(scheduleID))
                return BadRequest("Schedule ID is required.");

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
                return Unauthorized("User ID not found in token.");

            // Validate user existence
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
                return BadRequest("User not found in the database.");

            // Fetch the exercise
            var exercise = await _context.Exercises
                                        .FirstOrDefaultAsync(e => e.Id == request.ExerciseID && e.UserId == userId);

            if (exercise == null)
                return NotFound($"Exercise with ID '{request.ExerciseID}' not found for the current user.");

            // Fetch the schedule
            var existingSchedule = await _context.Schedules
                                                .Include(s => s.Exercises)
                                                .Include(s => s.Routine)
                                                .FirstOrDefaultAsync(s => s.Id == scheduleID && s.UserId == userId);

            if (existingSchedule == null)
                return NotFound($"Schedule with ID '{scheduleID}' not found for the current user.");

            // Initialize Exercises if null and add the exercise
            if (existingSchedule.Exercises == null)
            {
                existingSchedule.Exercises = new List<Exercise>();
                existingSchedule.Exercises.Add(exercise);
            } else {
                // Check if the exercise already exists in the routine
                var existingExercise = existingSchedule.Exercises.FirstOrDefault(ex => ex.Id == request.ExerciseID);

                if (existingExercise != null)
                {
                    // Remove the exercise if it already exists
                    existingSchedule.Exercises.Remove(existingExercise);
                }
                else
                {
                    // Add the exercise if it doesn't exist
                    existingSchedule.Exercises.Add(exercise);
                }
            }


            // Save changes
            await _context.SaveChangesAsync();
            return Ok( new { Message = $"Exercise '{exercise.Name}' added to schedule '{existingSchedule.Routine.Name}' successfully." });
        }
        


        [HttpGet("delete")]
        [Authorize]
        // /schedule/delete?id=
        public async Task<IActionResult> DeleteSchedule(string id)
        {
            // check if id is provided
            if (string.IsNullOrEmpty(id)) return (BadRequest("Schedule id is required."));


            // validate user
            var (user, errorResult) = await _userValidationService.ValidateUserAsync(User);
            if (errorResult != null) return errorResult;

            // Use the helper method to retrieve the schedule entity.
            var (schedule, getErrorResult) = await GetScheduleEntityAsync(id);
            if (getErrorResult != null) return getErrorResult;

            // Remove the schedule and save changes.
            _context.Schedules.Remove(schedule);
            await _context.SaveChangesAsync();

            var updatedSchedule = await _context.Schedules
                                    .Include(s => s.Routine)
                                    .ThenInclude(r => r.Exercises)
                                    .Include(s => s.Exercises)
                                    .Where(e => e.UserId == user.Id)
                                    .OrderBy(s => s.Order)
                                    .ToListAsync();

            if (updatedSchedule == null || updatedSchedule.Count == 0) return NotFound("No schedules found");

            return Ok(updatedSchedule);

        }

    }
}

