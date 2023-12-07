namespace DoDoneDid.Models.Dtos;

public class UpdateTodoItemDto
{
    public int Id { get; set; }
    public required string Task { get; set; }
    public Status Status { get; set; }
    public required string UserId { get; set; }
}