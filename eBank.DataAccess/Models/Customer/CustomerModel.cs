using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using eBank.DataAccess.Enums.Account;

namespace eBank.DataAccess.Models
{
    public class CustomerModel
    {
        [Key]
        public int CustomerId { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public DateTime DateOfBirth { get; set; }

        public LegalStatus LegalStatus { get; set; }

        public int UserId { get; set; }

        [ForeignKey("UserId")]
        public UserModel User { get; set; }
    }
}
