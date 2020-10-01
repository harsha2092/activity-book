using System;
using System.Net;

namespace activity_book.application.exceptions
{
    public class RestException : Exception
    {
        public HttpStatusCode errorCode { get; }
        public object errors { get; }
        public RestException(HttpStatusCode errorCode, object errors)
        {
            this.errorCode = errorCode;
            this.errors = errors;
        }
    }
}