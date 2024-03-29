using System.ComponentModel.DataAnnotations;
using DoDoneDid.Models;

namespace DoDoneDid.Entities;

public class TodoItem
{
    public int Id { get; set; }
    [MaxLength(1000)]
    public required string Task { get; set; }
    public Status Status { get; set; }
    public DateTime? DueDate { get; set; }
    public bool Deleted { get; set; }
    public Priority Priority { get; set; }
    
    [MaxLength(100)]
    public required string UserId { get; set; }
    public User? User { get; set; }
}