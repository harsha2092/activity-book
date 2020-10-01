using System;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using activity_book.application.exceptions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace activity_book.api.middlewares
{
    public class ExceptionHandlingMiddleware
    {
        private RequestDelegate _next;

        private ILogger<ExceptionHandlingMiddleware> _logger;

        public ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task Invoke(HttpContext context) {
            try{
                await _next(context);
            }catch(Exception ex){
                await handleException(ex, context );
            }
        }

        private async Task handleException(Exception ex, HttpContext context)
        {
            object errors = null;
            switch(ex) {
                case RestException re:
                    _logger.LogError(ex, "Rest exception");
                    errors = re.errors;
                    context.Response.StatusCode = (int) re.errorCode;
                    break;
                case Exception e:
                    _logger.LogError(ex, "Server exception");
                    errors =  String.IsNullOrWhiteSpace(e.Message) ? "error" : e.Message;
                    context.Response.StatusCode = (int) HttpStatusCode.InternalServerError; 
                    break;                
            }

            context.Response.ContentType = "application/json";
            if(errors != null){
                var result = JsonSerializer.Serialize(new {
                    errors
                });
                await context.Response.WriteAsync(result);
            }

        }
    }
}