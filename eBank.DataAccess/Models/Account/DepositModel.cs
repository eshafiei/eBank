using eBank.DataAccess.Models.Base;
using System;
using System.ComponentModel.DataAnnotations;

namespace eBank.DataAccess.Models.Account
{
    public class DepositModel : BaseModel
    {
        [Key]
        public int DepositId { get; set; }

        public int AccountId { get; set; }

        public double Amount { get; set; }

        public DateTime DepositDate { get; set; }

        public string Note { get; set; }
    }
}
