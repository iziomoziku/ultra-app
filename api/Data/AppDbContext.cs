using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using api.Models;

namespace api.Data
{
    public class AppDbContext: IdentityDbContext<IdentityUser>
    {

        // Constructor that accepts DbContextOptions and passes it to the base constructor
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options){}

        // Parameterless constructor for EF Tools
        // public AppDbContext() { }
        // set up your db tables
        public DbSet<Schedule> Schedules { get; set; }
        public DbSet<Plan> Plans { get; set; }

        public DbSet<Routine> Routines { get; set; }

        public DbSet<Exercise> Exercises { get; set; }

        public DbSet<Event> Events { get; set; }

    }
}