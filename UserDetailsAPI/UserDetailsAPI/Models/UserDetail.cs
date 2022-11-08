using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace UserDetailsAPI.Models
{
    public partial class UserDetail
    {
        public int Id { get; set; }
        [Required]
        [StringLength(50)]
        public string FirstName { get; set; }
        [Required]
        [StringLength(50)]
        public string LastName { get; set; }
        [Required]
        [StringLength(50)]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [StringLength(10)]
        [MinLength(10)]
        public string Phone { get; set; }
        [Required]
        [StringLength(150)]
        public string StreetNumber { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        [Required]
        [StringLength(50)]
        public string UserName { get; set; }
        [Required]
        [StringLength(50)]
        public string Password { get; set; }
        public bool Status { get; set; }
    }
}
