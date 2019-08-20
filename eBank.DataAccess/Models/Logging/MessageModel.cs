namespace eBank.DataAccess.Models.Logging
{
    public class MessageModel
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
