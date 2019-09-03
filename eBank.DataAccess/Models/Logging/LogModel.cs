using System;

namespace eBank.DataAccess.Models
{
    public class LogModel
    {
        public string FileName { get; set; }

        public int Level { get; set; }

        public int LineNumber { get; set; }

        public string Message { get; set; }

        public DateTime TimeStamp { get; set; }

        public object Additional { get; set; }
    }
}
