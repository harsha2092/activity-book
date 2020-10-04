using Microsoft.AspNetCore.Identity;

namespace activity_book.domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
    }
}