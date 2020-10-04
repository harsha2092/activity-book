using FluentValidation;

namespace activity_book.application.custom_validatiors
{
    public static class ValidatorExtensions
    {
        public static IRuleBuilder<T,string> Password<T>(this IRuleBuilder<T, string> ruleBuilder)
        {
            var options = ruleBuilder
                .NotEmpty()
                .MinimumLength(6).WithMessage("Password should be atleast minimum six characterts in length")
                .Matches("[A-Z]").WithMessage("Password should contain atleast one uppercase letter")
                .Matches("[a-z]").WithMessage("Password should contain atleast one lowercase letter")
                .Matches("[0-9]").WithMessage("Password should contain atleast one number")
                .Matches("[^A-Za-z0-9]").WithMessage("Password should contain atleast non alphanumeric character");

            return options;
        }
    }
}