using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http.Abstractions;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace webapi.Auth
{
	// You may need to install the Microsoft.AspNetCore.Http.Abstractions package into your project
	public class Response
	{
		private readonly RequestDelegate _next;

		public Response(RequestDelegate next)
		{
			_next = next;
		}

		public Task Invoke(HttpContext httpContext)
		{

			return _next(httpContext);
		}
	}

	// Extension method used to add the middleware to the HTTP request pipeline.
	public static class ResponseExtensions
	{
		public static IApplicationBuilder UseResponse(this IApplicationBuilder builder)
		{
			return builder.UseMiddleware<Response>();
		}
	}
}
