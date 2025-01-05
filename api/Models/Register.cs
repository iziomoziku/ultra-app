using System.ComponentModel.DataAnnotations;

namespace api.Models 

{

    public class Register
    
    {
        public required string Username {get; set;}
        
        [EmailAddress]
        public required string Email {get; set;}
        
        [MinLength(6, ErrorMessage = "Password must be at least 6 characters long.")]
        public required string Password {get; set;}
    }

}