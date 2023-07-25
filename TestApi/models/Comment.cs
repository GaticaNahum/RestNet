using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestApi.models
{
    public class Comment
    {
        public int Id {get; set;}
        public string? Title {get; set;}
        public string? Description {get; set;}
        public string? Author {get; set;}
        public DateTime CreatedAt {get; set;}
    }
}