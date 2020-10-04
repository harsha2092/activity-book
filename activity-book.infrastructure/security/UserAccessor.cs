using System.Linq;
using System.Security.Claims;
using activity_book.application.interfaces;
using Microsoft.AspNetCore.Http;

namespace activity_book.infrastructure.security
{
    public class UserAccessor : IUserAccessor
    {
        public IHttpContextAccessor _httpContextAccessor { get; set; }

        public UserAccessor(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public string GetCurrentUserName()
        {
            return _httpContextAccessor.HttpContext.User?.Claims?.FirstOrDefault(x => 
                x.Type == ClaimTypes.NameIdentifier)?.Value;
        }
    }
}