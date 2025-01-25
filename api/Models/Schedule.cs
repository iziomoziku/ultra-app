using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Identity;

namespace api.Models
{ 
    public class Schedule 
    {
        public required string Id {get; set;}

        public bool Complete {get; set;}

        public int Order { get; set; } 

        // Many to Many relationship
        public List<Exercise>? Exercises { get; set; } = new();

        public string? Note {get; set;}

        public Routine? Routine { get; set; } // Navigation property

        // Composite foreign key to Routine
        [JsonIgnore] // Prevent circular reference
        public string? RoutineId { get; set; }
        
        [JsonIgnore] // Prevent circular reference
        public string? RoutineUserId { get; set; } // This matches the UserId part of the composite key in Routine

        [JsonIgnore] // Prevent circular reference 
        public string? UserId { get; set; } // Foreign key to IdentityUser

        [JsonIgnore] // Prevent circular reference
        public IdentityUser? User { get; set; } // Navigation property
    }
}