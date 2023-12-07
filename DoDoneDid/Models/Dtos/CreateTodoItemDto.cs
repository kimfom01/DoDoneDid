namespace DoDoneDid.Models.Dtos;

public class CreateTodoItemDto
{
    public required string Task { get; set; }
    public Status Status { get; set; }
    public required string UserId { get; set; }
}