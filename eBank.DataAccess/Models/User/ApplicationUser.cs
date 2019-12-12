using Microsoft.AspNetCore.Identity;

namespace eBank.DataAccess.Models.User
{
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }
    }
}
