using System;
using System.Threading;
using System.Threading.Tasks;
using activity_book.domain;
using activity_book.persistence;
using MediatR;

namespace activity_book.application.activities
{
    public class Details
    {
        public class Query : IRequest<Activity>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Activity>
        {
            private readonly DataContext _dataContext;
            public Handler(DataContext dataContext)
            {
                this._dataContext = dataContext;
            }

            public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
            {

                var activity = await _dataContext.Activities.FindAsync(request.Id);
                return activity;
            }
        }
    }
}