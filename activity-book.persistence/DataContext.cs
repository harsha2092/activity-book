using activity_book.domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace activity_book.persistence
{
    // TODO: we are using IdentityDbContext instead of DbContext so our app creates the tables needed for the identity during migrations
    // Need to understand this and sepatate out to different service if needed
    public class DataContext: IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options): base(options) {

        }

        public DbSet<Value> Values {get; set;}
        
        public DbSet<Activity> Activities{get; set;}

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Value>()
                .HasData(
                    new Value{Id = 1, Name = "101"},
                    new Value{Id = 2, Name = "102"},
                    new Value{Id = 3, Name = "103"},
                    new Value{Id = 4, Name = "104"}
                );
        }
    }
}
