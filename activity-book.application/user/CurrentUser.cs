using System.Threading;
using System.Threading.Tasks;
using activity_book.application.interfaces;
using activity_book.domain;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace activity_book.application.user
{
    public class CurrentUser
    {
         public class Query : IRequest<User> { }
        
        public class Handler : IRequestHandler<Query, User>
        {
            private readonly UserManager<AppUser> _userManager;
            private readonly IUserAccessor _userAccessor;
            private readonly IJwtGenerator _jwtGenerator;
            public Handler(UserManager<AppUser> userManager, IUserAccessor userAccessor, IJwtGenerator jwtGenerator)
            {
                _userManager = userManager;
                _userAccessor = userAccessor;
                _jwtGenerator = jwtGenerator;
            }

            public async Task<User> Handle(Query request, CancellationToken cancellationToken)
            {
                // handler logic
                var currentUserName = _userAccessor.GetCurrentUserName();
                var user = await _userManager.FindByNameAsync(currentUserName);
                
                return new User {
                    DisplayName = user.DisplayName,
                    UserName = user.UserName,
                    Token = _jwtGenerator.CreateToken(user),
                    Image = null
                };
            }
        }
    }
}