using AutoMapper;
using DoDoneDid.Models;
using DoDoneDid.Models.Dtos;

namespace DoDoneDid.Mappers;

public class AutoMapping : Profile
{
    public AutoMapping()
    {
        CreateMap<TodoItem, UpdateCompletedTodoItemDto>()
            .ReverseMap();
        CreateMap<TodoItem, UpdateTodoItemDto>()
            .ReverseMap();
        CreateMap<TodoItem, CreateTodoItemDto>()
            .ReverseMap();
        CreateMap<TodoItem, GetTodoItemDto>()
            .ReverseMap();
    }
}