using eBank.DataAccess.Models.Base;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eBank.DataAccess.Models
{
    public class CustomerModel : BaseModel
    {
        [Key]
        public int CustomerId { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public DateTime DateOfBirth { get; set; }

        public int LegalStatus { get; set; }

        public int MaritalStatus { get; set; }

        public int UserId { get; set; }

        [ForeignKey("UserId")]
        public UserModel User { get; set; }
    }
}
