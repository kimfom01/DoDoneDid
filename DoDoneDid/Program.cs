using DoDoneDid;
using DoDoneDid.Data;
using DoDoneDid.Models;
using DoDoneDid.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddAuthorization();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<TodoDbContext>(options =>
{
    options.UseNpgsql(EnvironmentConfigHelper.GetConnectionString(builder.Configuration, builder.Environment));
});
builder.Services.AddIdentityApiEndpoints<User>()
    .AddEntityFrameworkStores<TodoDbContext>();
builder.Services.AddScoped<IRepository, TodoRepository>();

var app = builder.Build();

AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

var context = app.Services.CreateScope()
    .ServiceProvider.GetRequiredService<TodoDbContext>();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    await context.Database.EnsureDeletedAsync();
}

await context.Database.EnsureCreatedAsync();

app.UseDefaultFiles();
app.UseStaticFiles();

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.MapGroup("/api/Auth")
    .MapIdentityApi<User>()
    .WithTags("Auth");

app.Run();