using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Identity;

namespace api.Models
{
    public class Routine
    {

        public required string Id {get; set;}

        public required string Name {get; set;}
 
        public string Type {get; set;} = "Routine";

        // Foreign Key
        // public string? ScheduleId {get; set;} 

        // Reference Navigation to dependent
        [JsonIgnore] // Prevent circular reference
        public Schedule? Schedule {get; set;}

        // Many to Many relationship
        public List<Exercise>? Exercises { get; set; } = new();

        public string? UserId { get; set; } // Foreign key to IdentityUser
        public IdentityUser? User { get; set; } // Navigation property

    }
}