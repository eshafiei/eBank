using eBank.DataAccess.Models.AccountManagement;
using System.ComponentModel.DataAnnotations;

namespace eBank.DataAccess.Objects.AccountManagement
{
    public class AccountDto
    {
        [Key]
        public int? Id { get; set; }
        
        public long AccountNumber { get; set; }

        public int AccountType { get; set; }

        public decimal? Balance { get; set; }

        public bool AccountStatus { get; set; }

        public long UserId { get; set; }

        public AccountDto() {}

        public AccountDto(AccountModel model) {
            AccountNumber = model.AccountNumber;
            AccountType = model.AccountType;
            Balance = model.Balance;
            AccountStatus = model.AccountStatus;
            UserId = model.UserId;
        }
    }
}
