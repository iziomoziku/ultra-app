using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.EntityFrameworkCore;
using api.Data;
using api.Models;

// Initializes the application builder and configuration services.
var builder = WebApplication.CreateBuilder(args);

// Load configuration from appsettings.json and environment variables
// builder.Configuration.AddEnvironmentVariables();

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
// Adds support for endpoint discovery for OpenAPI/Swagger.
builder.Services.AddEndpointsApiExplorer();
// Adds Swagger for generating API documentation.
builder.Services.AddSwaggerGen();

// Register DbContext
// Reads the database connection string from the `appsettings.json` file under `ConnectionStrings.UltraApiDbConnection`.
var connectionString = builder.Configuration.GetConnectionString("UltraApiDbConnection");

// Registers the database context (AppDbContext) with dependency injection and configures it to use SQL Server.
builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlServer(connectionString));

// Adds Identity support for user and role management.
builder.Services.AddIdentity<IdentityUser, IdentityRole>()  
    .AddEntityFrameworkStores<AppDbContext>()  // Configures Identity to use Entity Framework with the AppDbContext.
    .AddDefaultTokenProviders();  // Adds default token providers for password resets and account confirmation.

// Specifies JWT as the default authentication scheme.
// Specifies JWT as the default challenge scheme.
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    // Configures JWT token validation parameters.
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
});

builder.Services.AddControllers();

// Add CORS configuration
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});


builder.WebHost.ConfigureKestrel(serverOptions =>
{
    serverOptions.ListenAnyIP(8080); // Change to another port like 5000
});
var app = builder.Build();

app.UseRouting();
app.UseCors("AllowAll");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "UltraAppAPI V1");
    c.RoutePrefix = string.Empty; // Swagger UI at root
});


app.UseEndpoints(endpoints =>
{
    _ = endpoints.MapControllers();
    _ = endpoints.MapGet("/", async context =>
    {
        context.Response.Redirect("/swagger");
    });
});

// app.UseHttpsRedirection();
app.Run();

