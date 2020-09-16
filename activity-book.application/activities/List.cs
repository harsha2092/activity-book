using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using activity_book.domain;
using activity_book.persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace activity_book.application.activities
{
    public class List
    {
        public class Query : IRequest<List<Activity>> { }

        public class Handler : IRequestHandler<Query, List<Activity>>
        {
            private readonly DataContext _dataContext;
            public Handler(DataContext dataContext)
            {
                this._dataContext = dataContext;
            }

            public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activities = await _dataContext.Activities.ToListAsync(); 
                return activities;
            }
        }
    }
}