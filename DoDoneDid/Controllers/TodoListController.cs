using AutoMapper;
using DoDoneDid.Models;
using DoDoneDid.Models.Dtos;
using DoDoneDid.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace DoDoneDid.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TodoListController : ControllerBase
{
    private readonly IRepository _repository;
    private readonly IMapper _mapper;

    public TodoListController(IRepository repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<GetTodoItemDto>>> GetTodoItems([FromQuery] string userId)
    {
        var todoItems = await _repository.GetItemsForUser(userId);

        if (!todoItems.Any())
        {
            return NotFound();
        }

        var getTodoItemDtoList = _mapper.Map<IEnumerable<GetTodoItemDto>>(todoItems);

        return Ok(getTodoItemDtoList);
    }

    [HttpGet("completed")]
    public async Task<ActionResult<IEnumerable<GetTodoItemDto>>> GetCompletedTodoItems([FromQuery] string userId)
    {
        var todoItems = await _repository.GetCompletedItemsForUser(userId);

        if (!todoItems.Any())
        {
            return NotFound();
        }

        var getTodoItemDtoList = _mapper.Map<IEnumerable<GetTodoItemDto>>(todoItems);

        return Ok(getTodoItemDtoList);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<GetTodoItemDto>> GetTodoItem([FromRoute] int id)
    {
        var todoItem = await _repository.GetItemById(id);

        if (todoItem is null)
        {
            return NotFound();
        }

        var getTodoItemDto = _mapper.Map<GetTodoItemDto>(todoItem);

        return Ok(getTodoItemDto);
    }

    [HttpPost]
    public async Task<ActionResult<CreateTodoItemDto>> PostTodoItem([FromBody] CreateTodoItemDto createTodoItemDto)
    {
        if (string.IsNullOrWhiteSpace(createTodoItemDto.Task))
        {
            return BadRequest();
        }

        var todoItem = _mapper.Map<TodoItem>(createTodoItemDto);

        await _repository.AddItem(todoItem);
        await _repository.SaveChanges();

        return CreatedAtAction(nameof(GetTodoItem), new { id = todoItem.Id }, createTodoItemDto);
    }

    [HttpPut]
    public async Task<ActionResult> PutTodoItem([FromBody] UpdateTodoItemDto updateTodoItemDto)
    {
        if (string.IsNullOrWhiteSpace(updateTodoItemDto.Task))
        {
            return BadRequest();
        }

        var todoItem = await _repository.GetItemById(updateTodoItemDto.Id);

        if (todoItem is null)
        {
            return NotFound();
        }

        _mapper.Map(updateTodoItemDto, todoItem);

        await _repository.UpdateItem(todoItem);
        await _repository.SaveChanges();

        return NoContent();
    }

    [HttpPut("completed")]
    public async Task<IActionResult> PutCompletedTodo([FromBody] UpdateCompletedTodoItemDto updateCompletedTodoItemDto)
    {
        var todoItem = await _repository.GetItemById(updateCompletedTodoItemDto.Id);

        if (todoItem is null)
        {
            return NotFound();
        }

        _mapper.Map(updateCompletedTodoItemDto, todoItem);

        await _repository.UpdateItem(todoItem);
        await _repository.SaveChanges();

        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult> DeleteTodoItem([FromRoute] int id)
    {
        var todoItemExists = await _repository.TodoItemExists(id);
        if (!todoItemExists)
        {
            return NotFound();
        }

        await _repository.RemoveItem(id);
        await _repository.SaveChanges();

        return NoContent();
    }
}