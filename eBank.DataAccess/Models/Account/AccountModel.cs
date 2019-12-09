using eBank.DataAccess.Models.Base;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eBank.DataAccess.Models.Account
{
    public class AccountModel : BaseModel
    {
        [Key]
        public int AccountId { get; set; }

        public long AccountNumber { get; set; }

        public int AccountType { get; set; }

        public decimal? Balance { get; set; }

        public bool AccountStatus { get; set; }

        public int CustomerId { get; set; }

        [ForeignKey("CustomerId")]
        public CustomerModel Customer { get; set; }
    }
}
