using System.Net;
using System.Threading;
using System.Threading.Tasks;
using activity_book.application.exceptions;
using activity_book.application.interfaces;
using activity_book.domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace activity_book.application.user
{
    public class Login
    {
         public class Query : IRequest<User> { 

             public string Email { get; set; }
             
             public string Password { get; set; }

         }

        
        public class QueryValidator : FluentValidation.AbstractValidator<Query>
        {
            public QueryValidator() {
                RuleFor(x => x.Email).NotEmpty();
                RuleFor(x => x.Password).NotEmpty();
            }
        }
        
        public class Handler : IRequestHandler<Query, User>
        {

            private UserManager<AppUser> _userManager { get; }
            
            private SignInManager<AppUser> _signInManager { get; }

            private IJwtGenerator _jwtGenerator{ get; set; }

            public Handler(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, IJwtGenerator jwtGenerator)
            {
                _userManager = userManager;
                _signInManager = signInManager;
                _jwtGenerator = jwtGenerator;
            }

            public async Task<User> Handle(Query request, CancellationToken cancellationToken)
            {
                // handler logic
                var user = await _userManager.FindByEmailAsync(request.Email);   
                
                if(user == null){
                    throw new RestException(HttpStatusCode.Unauthorized, new {});
                }

                var result = await _signInManager.CheckPasswordSignInAsync(user, request.Password, false);

                if(result.Succeeded){
                    return new User{
                        DisplayName = user.DisplayName,
                        UserName = user.UserName,
                        Token = _jwtGenerator.CreateToken(user),
                        Image = null
                    };
                }

                throw new RestException(HttpStatusCode.Unauthorized, new {});

            }
        }
    }
}