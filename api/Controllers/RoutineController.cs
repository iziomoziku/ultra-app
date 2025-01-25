using api.Models;
using api.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class RoutineController : ControllerBase
    {
        private readonly AppDbContext _context;

        public RoutineController(AppDbContext context)
        {
            _context = context;
        }




        /*******
        Add new routine
        routine.exercise needs to be empty
        *******/
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Add(Routine routine) 
        {
            if (routine == null) return BadRequest("Routine cannot be null.");

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null) return Unauthorized("UserId not found in token.");

            // Console.WriteLine($"Extracted UserId: {userId}");

            var user = await _context.Users.FindAsync(userId);
            if (user == null) return BadRequest("User not found in database.");

            var existingRoutine = await _context.Routines
                .Include(r => r.Exercises)
                .Where(r => r.Id == routine.Id && r.UserId == userId)
                .FirstOrDefaultAsync();

            if (existingRoutine != null) return Conflict($"A Routine with Id '{routine.Id}' already exists.");

            // Validate that exercises list is empty
            if (routine.Exercises != null && routine.Exercises.Any())
            {
                return BadRequest("New routines must not contain exercises.");
            }

            routine.UserId = userId;
            routine.Exercises = new List<Exercise>();

            await _context.Routines.AddAsync(routine);
            
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }

            return Ok(new { Message = "Routine Added",});
        }

        public class AddExerciseRequest
        {
            public string? ExerciseID { get; set; }
        }

        /*******
        Add exercise to routine
        http://localhost:8081/api/routine/{routineID}/add-exercise
        
        body: 
        {
            "exerciseID": "e1"
        }
        *******/
        [HttpPost("{routineID}/add-exercise")]
        [Authorize]
        public async Task<IActionResult> AddExercise(string routineID, [FromBody] AddExerciseRequest request)
        {
            if (string.IsNullOrEmpty(request.ExerciseID))
                return BadRequest("Exercise ID is required.");

            if (string.IsNullOrEmpty(routineID))
                return BadRequest("Routine ID is required.");

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

            // Fetch the routine
            var existingRoutine = await _context.Routines
                                                .Include(r => r.Exercises)
                                                .FirstOrDefaultAsync(r => r.Id == routineID && r.UserId == userId);

            if (existingRoutine == null)
                return NotFound($"Routine with ID '{routineID}' not found for the current user.");

            // Initialize Exercises if null and add the exercise
            if (existingRoutine.Exercises == null)
            {
                existingRoutine.Exercises = new List<Exercise>();
                existingRoutine.Exercises.Add(exercise);
            } else {
                // Check if the exercise already exists in the routine
                var existingExercise = existingRoutine.Exercises.FirstOrDefault(ex => ex.Id == request.ExerciseID);

                if (existingExercise != null)
                {
                    // Remove the exercise if it already exists
                    existingRoutine.Exercises.Remove(existingExercise);
                }
                else
                {
                    // Add the exercise if it doesn't exist
                    existingRoutine.Exercises.Add(exercise);
                }
            }

            // Save changes
            await _context.SaveChangesAsync();


            return Ok( new { Message = $"Exercise '{exercise.Name}' added to routine '{existingRoutine.Name}' successfully." });
        }
        

         /*******
        Remove exercise from routine
        http://localhost:8081/api/routine/{routineID}/add-exercises
        
        body: 
        {
            "exerciseID": "e1"
        }
        *******/
        [HttpPost("{routineID}/remove-exercise")]
        [Authorize]
        public async Task<IActionResult> RemoveExercise(string routineID, [FromBody] AddExerciseRequest request)
        {
            if (string.IsNullOrEmpty(request.ExerciseID))
                return BadRequest("Exercise ID is required.");

            if (string.IsNullOrEmpty(routineID))
                return BadRequest("Routine ID is required.");

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

            // Fetch the routine
            var existingRoutine = await _context.Routines
                                                .Include(r => r.Exercises)
                                                .FirstOrDefaultAsync(r => r.Id == routineID && r.UserId == userId);

            if (existingRoutine == null)
                return NotFound($"Routine with ID '{routineID}' not found for the current user.");

            // Initialize Exercises if null
            if (existingRoutine.Exercises == null)
                existingRoutine.Exercises = new List<Exercise>();

            // Check if the exercise is part of the routine
            if (!existingRoutine.Exercises.Contains(exercise))
                return NotFound($"Exercise '{exercise.Name}' is not part of routine '{existingRoutine.Name}'.");

            // Remove the exercise
            existingRoutine.Exercises.Remove(exercise);


            // Save changes
            await _context.SaveChangesAsync();

            return Ok($"Exercise '{exercise.Name}' removed from routine '{existingRoutine.Name}' successfully.");
        }


        // function to update name of routine
        // function to delete routine
        
        /*******
        Get routine based on id
        *******/
        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> Get(string id)
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
            
            var routine = await _context.Routines
                                .Include(r => r.Exercises)
                                .FirstOrDefaultAsync(e => e.Id == id && e.UserId == userId);

            if (routine == null) return NotFound($"Routine with ID '{id}' not found for the current user.");

            return Ok(routine);
        }

        /*******
        Get all routines
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

            var routines = await _context.Routines
                            .Include(r => r.Exercises)
                            .Where(r => r.UserId == userId)
                            .ToListAsync();

            if (routines == null || routines.Count == 0) return NotFound("No routines found");

            return Ok(routines);
        }
    }
}

