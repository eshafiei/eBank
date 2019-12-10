using eBank.DataAccess.Models.Base;
using System;
using System.ComponentModel.DataAnnotations;

namespace eBank.DataAccess.Models.Transfer
{
    public class TransferModel : BaseModel
    {
        [Key]
        public int TransferId { get; set; }

        public int OriginAccount { get; set; }

        public int DestinationAccount { get; set; }

        public int Frequency { get; set; }

        public DateTime TransferDate { get; set; }

        public double Amount { get; set; }

        public string Note { get; set; }
    }
}
