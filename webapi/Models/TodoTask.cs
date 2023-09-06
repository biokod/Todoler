using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace webapi.Models
{
	public class TodoTask
	{

		[Required]
		public string Id { get; set; }

		[Column(TypeName = "nvarchar(100)")]
		[Required]
		public string Title { get; set; }

		[Required]
		[Column(TypeName = "bit")]
		public bool Completed { get; set; } = false;

	}
}
