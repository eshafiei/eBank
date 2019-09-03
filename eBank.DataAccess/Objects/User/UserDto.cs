using System.ComponentModel.DataAnnotations;

namespace eBank.DataAccess.Objects
{
    public class UserDto
    {
        [Key]
        public int UserId { get; set; }

        public string Username { get; set; }

        public string Password { get; set; }

        public bool Status { get; set; }

        public string EmailAddress { get; set; }
    }
}
