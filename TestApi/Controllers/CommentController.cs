using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;
using TestApi.models;

namespace TestApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {

        private readonly ApplicationDbContext _context;
        public CommentController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var listComments = await _context.Comments.ToListAsync();
            if (listComments == null || listComments.Count == 0)
            {
                return NoContent();
            }
            return Ok(listComments);
        }

        [HttpPost("Store")]
        public async Task<HttpStatusCode> Store([FromBody] Comment comment)
        {
            if (comment == null)
            {
                return HttpStatusCode.BadRequest;
            }
            _context.Add(comment);
            await _context.SaveChangesAsync();
            return HttpStatusCode.Created;
        }

        [HttpGet("Show")]
        public async Task<IActionResult> Show(int id)
        {
            var comment = await _context.Comments.FindAsync(id);
            if (comment == null)
            {
                return NotFound();
            }
            return Ok(comment);
        }

        [HttpPut("Update")]
        public async Task<ActionResult> Update(int id, [FromBody] Comment comment){
            if(comment == null || comment.Id != id){
                return BadRequest();
            }

            var entity = await _context.Comments.FindAsync(id);
            if(entity == null){
                return NotFound();
            }

            entity.Title = comment.Title;
            entity.Description = comment.Description;
            entity.Author = comment.Author;
            entity.CreatedAt = comment.CreatedAt;

            await _context.SaveChangesAsync();

            return Ok();
            
        }

        [HttpDelete("Destroy")]
            public async Task<IActionResult> Destroy(int id)
            {
                var comment = await _context.Comments.FindAsync(id);

            if (comment == null)
            {
                return NotFound();
            }
            _context.Comments.Remove(comment);
            await _context.SaveChangesAsync();
            return Ok();
            }
    }
}