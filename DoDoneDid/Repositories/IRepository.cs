using DoDoneDid.Entities;

namespace DoDoneDid.Repositories;

public interface IRepository
{
    Task AddItem(TodoItem todoItem);
    Task RemoveItem(int id);
    Task<IEnumerable<TodoItem>> GetItemsForUser(string userId);
    Task<TodoItem?> GetItemById(int id);
    public Task<bool> TodoItemExists(int id);
    Task SaveChanges();
    Task UpdateItem(TodoItem todoItem);
    Task<IEnumerable<TodoItem>> GetCompletedItemsForUser(string userId);
}