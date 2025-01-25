using api.Models;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Identity;
using api.Data;
using Microsoft.Net.Http.Headers;


namespace api.Controllers 
{
    [ApiController]
    [Route("api/[controller]")]

    public class SignupController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly AppDbContext _context;


        public SignupController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager, IConfiguration configuration, AppDbContext context)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
            _context = context;

        }

        private async Task AddDefaultData(string userId)
        {

            // Create default exercises
            var exercise1 = new Exercise
            {
                Id = Guid.NewGuid().ToString(),
                Type = "Exercise",
                Name = "Push Up",
                Complete = false,
                Set = 3,
                UserId = userId,
                Log = new List<ExerciseLog>
                {
                    new ExerciseLog
                    {
                        Id = Guid.NewGuid().ToString(),
                        Set = new List<string>
                        {
                            "10x0",
                            "10x0",
                            "10x0"
                        },
                        Note = "Proper form. Felt good",
                        Date = new DateTime(2025, 1, 17, 14, 30, 0)
                    }
                }
            };

            var exercise2 = new Exercise
            {
                Id = Guid.NewGuid().ToString(),
                Type = "Exercise",
                Name = "Squat",
                Complete = false,
                Set = 3,
                UserId = userId,
                Log = new List<ExerciseLog>
                {
                    new ExerciseLog
                    {
                        Id = Guid.NewGuid().ToString(),
                        Set = new List<string>
                        {
                            "10x270",
                            "10x250",
                            "10x250"
                        },
                        Note = "Very heavy but we got through. Do again",
                        Date = new DateTime(2025, 1, 16, 14, 30, 0)
                    }
                }
            };

            // Add exercises to database
            await _context.Exercises.AddRangeAsync(exercise1, exercise2);

            // Create default routines
            var routine1 = new Routine
            {
                Id = Guid.NewGuid().ToString(),
                Name = "Upper Body",
                Type = "Routine",
                UserId = userId,
                Exercises = new List<Exercise> { exercise1 }
            };

            var routine2 = new Routine
            {
                Id = Guid.NewGuid().ToString(),
                Name = "Lower Body",
                Type = "Routine",
                UserId = userId,
                Exercises = new List<Exercise> { exercise2 }
            };

            // Add routines to database
            await _context.Routines.AddRangeAsync(routine1, routine2);

            // Create default schedules
            var schedule1 = new Schedule
            {
                Id = Guid.NewGuid().ToString(),
                Complete = false,
                RoutineId = routine1.Id,
                RoutineUserId = userId,
                UserId = userId,
                Order = 1,
                Note = ""
            };

            var schedule2 = new Schedule
            {
                Id = Guid.NewGuid().ToString(),
                Complete = false,
                RoutineId = routine2.Id,
                RoutineUserId = userId,
                UserId = userId,
                Order = 2,
                Note = ""

            };

            schedule1.Exercises.Add(exercise1);
            schedule2.Exercises.Add(exercise2);

            // Add schedules to database
            await _context.Schedules.AddRangeAsync(schedule1, schedule2);

            // Save changes to the database
            await _context.SaveChangesAsync();
        }


        // test endpoint to generate a JWT token
        [HttpPost]
        public async Task<IActionResult> Signup([FromBody] UserSignupModel model)
        {
            var user = new IdentityUser { UserName = model.Username, Email = model.Email };
            var result = await _userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
            {
                var errors = result.Errors.Select(e => e.Description).ToList();
                return BadRequest(new { Errors = errors });
            }

            // Add default routines, exercises, and schedules
            await AddDefaultData(user.Id);

            return Ok(new { Message = "User registered successfully" });
        }



    }
}