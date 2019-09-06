using eBank.DataAccess.Models.Base;

namespace eBank.DataAccess.Models
{
    public class MessageModel : BaseModel
    {
        public int Status { get; set; }

        public string StatusText { get; set; }

        public string Url { get; set; }

        public bool Ok { get; set; }

        public string Name { get; set; }

        public string Message { get; set; }

        public string Error { get; set; }
    }
}
