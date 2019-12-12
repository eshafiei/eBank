using System;
using System.ComponentModel.DataAnnotations;
using eBank.DataAccess.Enums;
using eBank.DataAccess.Models.Base;

namespace eBank.DataAccess.Models.Transaction
{
    public class TransactionModel : BaseModel
    {
        [Key]
        public int TransactiontId { get; set; }
        
        public TransactionType TransactionType { get; set; }

        public int AccountId { get; set; }

        public double Amount { get; set; }

        public DateTime TransactionDate { get; set; }

        public string Note { get; set; }
    }
}
