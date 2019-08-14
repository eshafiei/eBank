
namespace eBank.DataAccess.Models.AccountManagement
{
    public class Account
    {
        public int Id { get; set; }
        public int AccountType { get; set; }
        public decimal Balance { get; set; }
        public bool AccountStatus { get; set; }
    }
}
