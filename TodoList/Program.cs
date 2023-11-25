using Microsoft.EntityFrameworkCore;
using TodoList.Data;
using TodoList.Repositories;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<TodoDbContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("TodoDb"));
});
builder.Services.AddScoped<IRepository, TodoRepository>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseDefaultFiles();
app.UseStaticFiles();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

var context = app.Services.CreateScope()
    .ServiceProvider.GetRequiredService<TodoDbContext>();
await context.Database.EnsureCreatedAsync();

app.Run();