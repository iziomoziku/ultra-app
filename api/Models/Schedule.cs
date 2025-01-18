using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Identity;

namespace api.Models
{ 
    public class Schedule 
    {
        public required string Id {get; set;}

        public bool Complete {get; set;}

        // Composite foreign key to Routine
        public string? RoutineId { get; set; }
        public string? RoutineUserId { get; set; } // This matches the UserId part of the composite key in Routine

        [JsonIgnore] // Prevent circular reference
        public Routine? Routine { get; set; } // Navigation property

        public string? UserId { get; set; } // Foreign key to IdentityUser
        public IdentityUser? User { get; set; } // Navigation property
    }
}