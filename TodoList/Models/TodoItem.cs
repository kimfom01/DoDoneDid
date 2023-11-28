namespace TodoList.Models;

public class TodoItem
{
    public int Id { get; set; }
    public required string Task { get; set; }
    public Status Status { get; set; }
    public string UserId { get; set; }
    public User? User { get; set; }
}