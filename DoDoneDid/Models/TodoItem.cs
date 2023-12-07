using System.ComponentModel.DataAnnotations;

namespace DoDoneDid.Models;

public class TodoItem
{
    public int Id { get; set; }
    [MaxLength(1000)]
    public required string Task { get; set; }
    public Status Status { get; set; }
    
    [MaxLength(100)]
    public required string UserId { get; set; }
    public User? User { get; set; }
}