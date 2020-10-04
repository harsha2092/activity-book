using activity_book.domain;

namespace activity_book.application.interfaces
{
    public interface IJwtGenerator
    {
         public string CreateToken(AppUser user);
    }
}