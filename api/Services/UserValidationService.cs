using api.Models;
using api.Data;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;


public interface IUserValidationService
{
    Task<(IdentityUser user, IActionResult errorResult)> ValidateUserAsync(ClaimsPrincipal userClaims);
}

public class UserValidationService : IUserValidationService
{
    private readonly AppDbContext _context;

    public UserValidationService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<(IdentityUser user, IActionResult errorResult)> ValidateUserAsync(ClaimsPrincipal userClaims)
    {
        var userId = userClaims.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userId == null)
        {
            return (null, new UnauthorizedObjectResult("UserId not found"));
        }

        var user = await _context.Users.FindAsync(userId);
        if (user == null)
        {
            return (null, new BadRequestObjectResult("User not found in database."));
        }

        return (user, null);
    }
}
