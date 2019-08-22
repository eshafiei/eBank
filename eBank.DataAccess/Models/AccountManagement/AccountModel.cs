
namespace eBank.DataAccess.Models.AccountManagement
{
    public class AccountModel
    {
        public long AccountNumber { get; set; }

        public int AccountType { get; set; }

        public decimal? Balance { get; set; }

        public bool AccountStatus { get; set; }

        public long UserId { get; set; }
    }
}
