using DoDoneDid.Data;
using DoDoneDid.Entities;
using Microsoft.EntityFrameworkCore;

namespace DoDoneDid.Repositories;

public class TodoRepository : IRepository
{
    private readonly TodoDbContext _todoDbContext;

    public TodoRepository(TodoDbContext todoDbContext)
    {
        _todoDbContext = todoDbContext;
    }

    public async Task AddItem(TodoItem todoItem)
    {
        await _todoDbContext.AddAsync(todoItem);
    }

    public async Task RemoveItem(int id)
    {
        var todoItem = await _todoDbContext.TodoItems.FirstOrDefaultAsync(t => t.Id == id);

        if (todoItem is not null)
        {
            _todoDbContext.Remove(todoItem);
        }
    }

    public async Task<IEnumerable<TodoItem>> GetItemsForUser(string userId)
    {
        var items = await _todoDbContext.TodoItems
            .Where(td => td.UserId == userId && td.Status != Status.Complete)
            .AsNoTracking().ToListAsync();

        return items;
    }

    public async Task<TodoItem?> GetItemById(int id)
    {
        var todoItem = await _todoDbContext.TodoItems.FirstOrDefaultAsync(t => t.Id == id);

        return todoItem;
    }

    public async Task SaveChanges()
    {
        await _todoDbContext.SaveChangesAsync();
    }

    public Task UpdateItem(TodoItem todoItem)
    {
        _todoDbContext.Update(todoItem);

        return Task.CompletedTask;
    }

    public async Task<IEnumerable<TodoItem>> GetCompletedItemsForUser(string userId)
    {
        var items = await _todoDbContext.TodoItems
            .Where(td => td.UserId == userId
                         && td.Status == Status.Complete)
            .AsNoTracking().ToListAsync();

        return items;
    }

    public async Task<bool> TodoItemExists(int id)
    {
        return await _todoDbContext
            .TodoItems.AnyAsync(t => t.Id == id);
    }
}