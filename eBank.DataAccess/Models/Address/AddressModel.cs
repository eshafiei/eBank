using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using eBank.DataAccess.Models.Base;

namespace eBank.DataAccess.Models.Address
{
    public class AddressModel : BaseModel
    {
        [Key]
        public int AddressId { get; set; }

        public string Address1 { get; set; }

        public string Address2 { get; set; }

        public string City { get; set; }

        public string State { get; set; }

        public int Zip { get; set; }

        public string Country { get; set; }

        public int CustomerId { get; set; }

        [ForeignKey("CustomerId")]
        public CustomerModel Customer { get; set; }
    }
}
