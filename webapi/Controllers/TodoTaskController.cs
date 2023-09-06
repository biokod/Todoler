using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using webapi.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace webapi.Controllers
{
	[Route("api/todotask")]
	[Authorize]
	[ApiController]
	public class TodoTaskController : ControllerBase
	{
		TodoTaskContext db;

        public TodoTaskController(TodoTaskContext context)
        {
            db = context;
            if (!db.Tasks.Any())
            {
				db.Tasks.Add(new TodoTask { Id = Guid.NewGuid().ToString(), Title="Make exercises", Completed=false });
				db.Tasks.Add(new TodoTask { Id = Guid.NewGuid().ToString(), Title="Make breakfast", Completed=false });
				db.Tasks.Add(new TodoTask { Id = Guid.NewGuid().ToString(), Title="Learn something new", Completed=false });
				db.Tasks.Add(new TodoTask { Id = Guid.NewGuid().ToString(), Title="Play with children", Completed=false });
				db.Tasks.Add(new TodoTask { Id = Guid.NewGuid().ToString(), Title="Sleep well", Completed=false });
            }
        }

		// GET: api/todotask
		[HttpGet]
		public IEnumerable<TodoTask> GetAllTasks()
		{
			return db.Tasks.ToList();
		}

		// GET api/todotask/5
		[HttpGet("{id}")]
		public TodoTask GetTaskById(string id)
		{
			return db.Tasks.FirstOrDefault(x => x.Id == id);
		}

		// POST api/todotask
		[HttpPost]
		public IActionResult PostTask(TodoTask task)
		{
			if (ModelState.IsValid)
			{
				db.Tasks.Add(task);
				db.SaveChanges();
				return Ok(task);
			}
			return BadRequest(ModelState);
		}

		// PUT api/todotask/5
		[HttpPut("{id}")]
		public IActionResult UpdateTask(TodoTask task)
		{
			if (ModelState.IsValid)
			{
				db.Tasks.Update(task);
				db.SaveChanges();
				return Ok(task);
			}
			return BadRequest(ModelState);
		}

		// DELETE api/todotask/5
		[HttpDelete("{id}")]
		public IActionResult DeleteTask(string id)
		{
			TodoTask task = db.Tasks.FirstOrDefault(x => x.Id == id);
            if (task != null)
            {
				db.Tasks.Remove(task);
				db.SaveChanges();
            }
			return Ok(task);
        }
	}
}
