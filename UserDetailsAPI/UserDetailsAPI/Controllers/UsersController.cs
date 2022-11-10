using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
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
        public IEnumerable<UserDetail> Get(int pageNo, int pageSize, string sortOrder)
        {
            SqlParameter spage = new SqlParameter("@PageNo", pageNo);
            SqlParameter spageSize = new SqlParameter("@PageSize", pageSize);
            SqlParameter ssortOrder = new SqlParameter("@SortOrder", sortOrder);
            var data = entities.UserDetails.FromSqlRaw<UserDetail>("EXECUTE GetAllUsers {0}, {1}, {2}", spage, spageSize, ssortOrder).ToList();
            return data;
        }

        [HttpGet("GetAllUserCount")]
        public int GetCount()
        {
         
            using (SqlConnection con = new SqlConnection())
            {
                con.ConnectionString = "Data Source=DESKTOP-FMVDTUQ; initial catalog=UserDB; Trusted_Connection=True";
                using (SqlCommand cmd = new SqlCommand("getAllUserCount"))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Connection = con;
                    con.Open();

                    var count = Convert.ToInt32(cmd.ExecuteScalar());
                    return count;
                }
            }

            
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

        [HttpGet("GetUserBySearch")]
        public IEnumerable<UserDetail> SearchByName(string name)
        {
            var data = entities.UserDetails.Where(e => e.FirstName.Contains(name) || e.LastName.Contains(name) || e.Email.Contains(name));
            return data;
        }

        [HttpGet("GetUserBySearchCount")]
        public int SearchCount(string name)
        {
            var data = entities.UserDetails.Where(e => e.FirstName.Contains(name) || e.LastName.Contains(name) || e.Email.Contains(name)).Count();
            return data;
        }
    }
}
