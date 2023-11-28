using Microsoft.AspNetCore.Identity;

namespace TodoList.Models;

public class User : IdentityUser
{
    public IEnumerable<TodoItem>? TodoItems { get; set; }
}