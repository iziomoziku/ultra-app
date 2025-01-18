using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using api.Models;

namespace api.Data
{
    public class AppDbContext:IdentityDbContext
    {

        // Constructor that accepts DbContextOptions and passes it to the base constructor
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options){}

        // Parameterless constructor for EF Tools
        // public AppDbContext() { }
        // set up your db tables
        public DbSet<Schedule> Schedules { get; set; }

        public DbSet<Routine> Routines { get; set; }
        
        public DbSet<Exercise> Exercises { get; set; }

        public DbSet<Rep> Reps { get; set; }  // Add Rep
        public DbSet<ExerciseLog> ExerciseLogs { get; set; }  // Add ExerciseLog

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            // Make id and userId both composite primary key
            modelBuilder.Entity<Exercise>()
                .HasKey(e => new { e.Id, e.UserId });

            // Make id and userId both composite primary key
            modelBuilder.Entity<Routine>()
                .HasKey(r => new { r.Id, r.UserId });


            // Make id and userId both composite primary key
            modelBuilder.Entity<Schedule>()
                .HasKey(s => new { s.Id, s.UserId });


            modelBuilder.Entity<Schedule>()
                .HasOne(s => s.Routine)
                .WithOne()
                .HasForeignKey<Schedule>(s => new { s.RoutineId, s.RoutineUserId })
                .OnDelete(DeleteBehavior.NoAction); // Adjust delete behavior as needed


            // Many-to-Many Relationship between Routine and Exercise
            modelBuilder.Entity<Routine>()
                .HasMany(r => r.Exercises)
                .WithMany(e => e.Routines)
                .UsingEntity(j => j.ToTable("RoutineExercises"));

            // Routine ↔ User relationship (prevent cascading delete)
            modelBuilder.Entity<Routine>()
                .HasOne(r => r.User)
                .WithMany()
                .HasForeignKey(r => r.UserId)
                .OnDelete(DeleteBehavior.NoAction); // Prevent cascading delete

            // Exercise ↔ User relationship (prevent cascading delete)
            modelBuilder.Entity<Exercise>()
                .HasOne(e => e.User)
                .WithMany()
                .HasForeignKey(e => e.UserId)
                .OnDelete(DeleteBehavior.NoAction); // Prevent cascading delete

            base.OnModelCreating(modelBuilder);
        }


    }
}