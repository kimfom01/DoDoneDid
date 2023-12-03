using System.Security.Claims;
using DoDoneDid.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace DoDoneDid.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly SignInManager<User> _signInManager;

    public AuthController(SignInManager<User> signInManager)
    {
        _signInManager = signInManager;
    }
    
    [HttpGet("user-id")]
    public IActionResult GetUserId()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (string.IsNullOrEmpty(userId))
        {
            return Unauthorized("User ID not found.");
        }

        return Ok(new { UserId = userId });
    }

    [HttpGet("logout")]
    public async Task Logout()
    {
        await _signInManager.SignOutAsync();
    }
}