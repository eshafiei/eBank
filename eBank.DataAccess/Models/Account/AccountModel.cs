using eBank.DataAccess.Models.Base;
using eBank.DataAccess.Models.User;
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

        public double Balance { get; set; }

        public bool AccountStatus { get; set; }

        public string Id { get; set; }

        [ForeignKey("Id")]
        public ApplicationUser User { get; set; }

        [NotMapped]
        public string MaskedAccountNumber { get; set; }
    }
}
