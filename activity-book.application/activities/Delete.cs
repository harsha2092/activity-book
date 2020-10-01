using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using activity_book.application.exceptions;
using activity_book.persistence;
using MediatR;

namespace activity_book.application.activities
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id {get; set;}
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _dataContext;
            public Handler(DataContext dataContext)
            {
                this._dataContext = dataContext;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _dataContext.Activities.FindAsync(request.Id);
                if(activity == null) {
                    throw new RestException(HttpStatusCode.NotFound,new {activity = "Not found"});
                }

                _dataContext.Remove(activity);

                var success = await _dataContext.SaveChangesAsync() > 0;
                if (success)
                {
                    return Unit.Value;
                }

                throw new Exception("Problem saving changes");
            }
        }
    }
}