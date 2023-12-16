using DoDoneDid.Entities;

namespace DoDoneDid.Dtos;

public class UpdateTodoItemDto
{
    public int Id { get; set; }
    public required string Task { get; set; }
    public Status Status { get; set; }
    public DateTime? DueDate { get; set; }
    public required string UserId { get; set; }
}