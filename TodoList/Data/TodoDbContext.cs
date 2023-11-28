using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TodoList.Models;

namespace TodoList.Data;

public class TodoDbContext : IdentityDbContext<User>
{
    public DbSet<TodoItem> TodoItems { get; set; }

    public TodoDbContext(DbContextOptions<TodoDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<User>()
            .HasData(
                new User
                {
                    Id = new Guid("a24b2911-31c0-43ed-8657-4878e3abe626").ToString(),
                    Email = "dkay4130@gmail.com"
                });

        modelBuilder.Entity<TodoItem>()
            .HasData(
                new TodoItem
                {
                    Id = 1,
                    Status = Status.Todo,
                    Task = "Fix Auth",
                    UserId = new Guid("a24b2911-31c0-43ed-8657-4878e3abe626").ToString()
                });
    }
}