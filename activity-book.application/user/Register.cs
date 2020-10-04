using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using activity_book.application.custom_validatiors;
using activity_book.application.exceptions;
using activity_book.application.interfaces;
using activity_book.domain;
using activity_book.persistence;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace activity_book.application.user
{
    public class Register
    {
        public class Command : IRequest<User>
        {
            public string DisplayName { get; set; }
            public string UserName { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>{
            public CommandValidator(){
                RuleFor(x => x.DisplayName).NotEmpty();
                RuleFor(x => x.UserName).NotEmpty();
                RuleFor(x => x.Email).NotEmpty().EmailAddress();
                RuleFor(x => x.Password).Password();
            }
        }

        public class Handler : IRequestHandler<Command, User>
        {
            private readonly UserManager<AppUser> _userManager;
            private readonly IJwtGenerator _jwtGenerator;
            private readonly DataContext _dataContext;

            public Handler(UserManager<AppUser> userManager, IJwtGenerator jwtGenerator, DataContext dataContext)
            {
                _userManager = userManager;
                _jwtGenerator = jwtGenerator;
                _dataContext = dataContext;
            }

            public async Task<User> Handle(Command request, CancellationToken cancellationToken)
            {
                if (await _dataContext.Users.AnyAsync(x => x.Email == request.Email)){
                    throw new RestException(HttpStatusCode.BadRequest, new {Email = "Email already exists"});
                }

                if (await _dataContext.Users.AnyAsync(x => x.UserName == request.UserName)){
                    throw new RestException(HttpStatusCode.BadRequest, new {UserName = "User Name already exists"});
                }

                var appUser = new AppUser{
                    DisplayName = request.DisplayName,
                    Email = request.Email,
                    UserName = request.UserName,
                };

                var result = await _userManager.CreateAsync(appUser, request.Password);
                
                if(result.Succeeded) {
                    return new User {
                        DisplayName = appUser.DisplayName,
                        Token = _jwtGenerator.CreateToken(appUser),
                        UserName = appUser.UserName,
                        Image = null
                    };
                }

                throw new Exception("Problem Creating User");
            }
        }
    }
}