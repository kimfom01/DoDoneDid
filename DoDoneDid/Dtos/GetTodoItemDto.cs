using DoDoneDid.Entities;

namespace DoDoneDid.Dtos;

public class GetTodoItemDto
{
    public int Id { get; set; }
    public required string Task { get; set; }
    public Status Status { get; set; }
    public required string UserId { get; set; }
    public DateTime? DueDate { get; set; }
    public Priority Priority { get; set; }
}