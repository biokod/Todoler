using Microsoft.EntityFrameworkCore;

namespace webapi.Models
{
	public class TodoTaskContext : DbContext
	{
        public TodoTaskContext(DbContextOptions<TodoTaskContext> options)
        {
            Database.EnsureCreated();
        }

        public DbSet<TodoTask> Tasks { get; set; }  
    }
}
