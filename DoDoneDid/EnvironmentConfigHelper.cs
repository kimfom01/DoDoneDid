namespace DoDoneDid;

public static class EnvironmentConfigHelper
{
    public static string? GetConnectionString(IConfiguration config, IWebHostEnvironment env)
    {
        string? connectionString;

        if (env.IsDevelopment())
        {
            connectionString = config.GetConnectionString("CONNECTION_STRING");
        }
        else
        {
            connectionString = Environment.GetEnvironmentVariable("CONNECTION_STRING")
                               ?? throw new NullReferenceException("CONNECTION_STRING missing");
        }

        return connectionString;
    }
}