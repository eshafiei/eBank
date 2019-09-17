using eBank.DataAccess.Models.Base;
using System;
using System.ComponentModel.DataAnnotations;

namespace eBank.DataAccess.Models
{
    public class LogModel : BaseModel
    {
        [Key]
        public int LogId { get; set; }

        public string Message { get; set; }

        public string Error { get; set; }

        public int Status { get; set; }

        public string StatusText { get; set; }

        public string Url { get; set; }

        public DateTime LogDate { get; set; }

        public long LineNumber { get; set; }

        public string FileName { get; set; }

        public string UserId { get; set; }
    }
}
