namespace api.Models


{
    public class Exercise
    {
        
        public required string Id {get; set;}
        public required string Name {get; set;}

        public bool Complete {get; set;}

        public int Set {get; set;}

        public List<Rep> Rep { get; set; } = new();
        public List<ExerciseLog> Log { get; set; } = new();

    }

    public class Rep 
    {
        public required string Id {get; set;}
        public string? Reps {get; set;}

    }
    public class ExerciseLog 
    {
        public required string Id {get; set;}
        public string? Set {get; set;}
        
        public List<string?> Rep {get; set;} = new();
        
        public string? Note {get; set;}

    }
}