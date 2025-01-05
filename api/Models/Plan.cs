namespace api.Models 

{

    public class Plan
    
    {
        public required string Id {get; set;}
        public required string Name {get; set;}
        public string Type {get; set;} = "Plan";

        // one to many relationship with Exercise
        public List<Routine> Routines { get; set; } = new List<Routine>();

    }

}