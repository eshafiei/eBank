using eBank.DataAccess.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eBank.DataAccess.Objects
{
    public class AccountDto
    {
        [Key]
        public int AccountId { get; set; }
        
        public long AccountNumber { get; set; }

        public int AccountType { get; set; }

        public decimal? Balance { get; set; }

        public bool AccountStatus { get; set; }

        public int CustomerId { get; set; }

        [ForeignKey("CustomerId")]
        public CustomerDto Customer { get; set; }

        public AccountDto() { }

        public AccountDto(AccountModel model)
        {
            AccountNumber = model.AccountNumber;
            AccountType = model.AccountType;
            Balance = model.Balance;
            AccountStatus = model.AccountStatus;
            CustomerId = model.CustomerId;
        }
    }
}
