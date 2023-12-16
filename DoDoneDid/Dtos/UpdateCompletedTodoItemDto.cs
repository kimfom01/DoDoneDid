using DoDoneDid.Entities;

namespace DoDoneDid.Dtos;

public class UpdateCompletedTodoItemDto
{
    public int Id { get; set; }
    public Status Status { get; set; }
    public required string UserId { get; set; }
}