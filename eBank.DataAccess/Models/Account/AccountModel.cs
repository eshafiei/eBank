
namespace eBank.DataAccess.Models
{
    public class AccountModel
    {
        public long AccountNumber { get; set; }

        public int AccountType { get; set; }

        public decimal? Balance { get; set; }

        public bool AccountStatus { get; set; }

        public int CustomerId { get; set; }
    }
}
