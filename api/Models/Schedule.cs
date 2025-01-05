namespace api.Models
{


    public class Schedule 
    {

        public required string Id {get; set;}

        public bool Complete {get; set;}

        public List<Routine> Routines {get; set;} = new List<Routine>();


    }
}