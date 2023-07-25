using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using TestApi.models;

namespace TestApi
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options){


        }

        public DbSet<Comment>? Comments {get; set;}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Comment>().HasData(
                new Comment(){
                 Id = 1,
                 Title = "Test",
                 Description = "Test",
                 Author = "Erick Nahum",
                 CreatedAt = new DateTime()   
                },
                new Comment(){
                 Id = 2,
                 Title = "Test",
                 Description = "Test",
                 Author = "Erick Nahum",
                 CreatedAt = new DateTime()   
                }
            );
        }

        
    }
}