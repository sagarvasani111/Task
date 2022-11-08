using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UserDetailsAPI.Models;

namespace UserDetailsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        UserDBContext entities = new UserDBContext();

        [HttpGet("GetAllUser")]
        public IEnumerable<UserDetail> Get()
        {           
           return entities.UserDetails.Where(e => e.Status == false).ToList();
        }

        [HttpPut("UpdateUser")]
        public IActionResult Update(UserDetail userdetails,int id)
        {
            var user = entities.UserDetails.FirstOrDefault(e => e.Id == id);
            if(user != null)
            {              
                entities.Entry(userdetails).State = Microsoft.EntityFrameworkCore.EntityState.Detached;
                userdetails.Id = id;
                user.FirstName = userdetails.FirstName;
                user.LastName = userdetails.LastName;
                user.Email = userdetails.Email;
                user.Phone = userdetails.Phone;
                user.StreetNumber = userdetails.StreetNumber;
                user.State = userdetails.State;
                user.City = userdetails.City;
                user.UserName = userdetails.UserName;
                user.Password = userdetails.Password;
                user.Status = false;
                entities.SaveChanges();
                return Ok(user);
            }
            return BadRequest();
        }

        [HttpPost("AddUser")]
        public IActionResult Add(UserDetail user)
        {
            var isExistUser = entities.UserDetails.Where(x => x.Email == user.Email || x.UserName == user.UserName).FirstOrDefault();
            if (isExistUser == null)
            {
                user.Status = false;
                entities.UserDetails.Add(user);
                entities.SaveChanges();
                return Ok();
            }
            else
            {
                return NotFound();
            }
           
        }

        [HttpDelete("DeleteById")]
        public IActionResult Delete(int id)
        {
          var user = entities.UserDetails.FirstOrDefault(e => e.Id == id);
          user.Status = true;
          entities.SaveChanges();
          return Ok(user);
        }

        [HttpGet("GetUserById")]
        public IActionResult Get(int id)
        {
            var user = entities.UserDetails.FirstOrDefault(e => e.Id == id);
            return Ok(user);
        }
    }
}
