using System;
using System.ComponentModel.DataAnnotations;
using eBank.DataAccess.Models.Base;

namespace eBank.DataAccess.Models.Account
{
    public class WithdrawModel : BaseModel
    {
        [Key]
        public int WithdrawId { get; set; }

        public int AccountId { get; set; }

        public double Amount { get; set; }

        public DateTime WithdrawDate { get; set; }

        public string Note { get; set; }
    }
}
