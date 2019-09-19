using System.ComponentModel.DataAnnotations;

namespace eBank.DataAccess.Models.User
{
    public class LoginModel
    {
        public string UserName { get; set; }

        public string Password { get; set; }

        public string ReturnUrl { get; set; }
    }
}
