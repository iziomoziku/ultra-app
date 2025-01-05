namespace api.Models


{
    public class Routine 
    {

        public required string Id {get; set;}
        public required string Name {get; set;}

        public string Type {get; set;} = "Routine";

        // one to many relationship with Exercise
        public List<Exercise> Exercises { get; set; } = new List<Exercise>();

    }

    public class RoutineLog 
    {
        public required string Id {get; set;}
        public List<string?> Set {get; set;} = new();
        public string? Note {get; set;}

    }
}