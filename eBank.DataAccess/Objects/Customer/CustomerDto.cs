using eBank.DataAccess.Models;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eBank.DataAccess.Objects
{
    public class CustomerDto
    {
        [Key]
        public int CustomerId { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public DateTime DateOfBirth { get; set; }

        public int LegalStatus { get; set; }

        public int UserId { get; set; }

        [ForeignKey("UserId")]
        public UserDto User { get; set; }

        public CustomerDto() { }

        public CustomerDto(CustomerModel model)
        {
            FirstName = model.FirstName;
            LastName = model.LastName;
            DateOfBirth = model.DateOfBirth;
            LegalStatus = (int) model.LegalStatus;
            UserId = model.UserId;
        }
    }
}
