using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Identity;

namespace api.Models
{
    public class Exercise
    {

        public required string Id {get; set;}

        public required string Name {get; set;}
 
        public string Type {get; set;} = "Exercise";

        public bool Complete {get; set;}

        public int Set {get; set;}

        // not needed, will need to remove
        public List<Rep> Rep { get; set; } = new();

        public List<ExerciseLog> Log { get; set; } = new();

        // Many to manuy relationship with routines
        [JsonIgnore] // Prevents serialization loop
        public List<Routine>? Routines { get; set; } = new();
        
        [JsonIgnore] // Prevents serialization loop
        public List<Schedule>? Schedules { get; set; }

        [JsonIgnore] // Prevents serialization loop
        public string? UserId { get; set; } // Foreign key to IdentityUser

        [JsonIgnore] // Prevents serialization loop
        public IdentityUser? User { get; set; } // Navigation property

    }

    public class Rep 
    {
        public required string Id {get; set;}
        public string? Reps {get; set;}

    }
    public class ExerciseLog 
    {
        public required string Id {get; set;}

        // rep x weight - ex 10x270 
        public List<string?> Set {get; set;}
        
        public string? Note {get; set;}

        public DateTime Date { get; set; }  // Represents the date of the log

        [JsonIgnore]
        public List<string?> Rep {get; set;} = new();
        


        // Foreign Key to Exercise
        [JsonIgnore]
        public string? ExerciseId { get; set; }
        
        [JsonIgnore]
        public Exercise? Exercise { get; set; } // Navigation property

    }
}