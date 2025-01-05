namespace api.Models
{


    public class Event
    {

        public required string Id {get; set;}
        public string? Title {get; set;}

        public DateTime Start { get; set; } 
        public DateTime End { get; set; } 
        public List<Schedule> Schedule { get; set; } = new List<Schedule>();

    }

}