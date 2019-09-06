using eBank.DataAccess.Models.Base;
using System.ComponentModel.DataAnnotations;

namespace eBank.DataAccess.Models
{
    public class UserModel : BaseModel
    {
        [Key]
        public int UserId { get; set; }

        public string Username { get; set; }

        public string Password { get; set; }

        public bool Status { get; set; }

        public string EmailAddress { get; set; }
    }
}
