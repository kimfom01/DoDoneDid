using DoDoneDid.Entities;
using Microsoft.AspNetCore.Identity;

namespace DoDoneDid.Models;

public class User : IdentityUser
{
    public IEnumerable<TodoItem>? TodoItems { get; set; }
}