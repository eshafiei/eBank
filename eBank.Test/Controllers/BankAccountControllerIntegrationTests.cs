using eBank.DataAccess.Models.Account;
using eBank.Web;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace eBank.Test.Controllers
{
    public class BankAccountControllerIntegrationTests : IClassFixture<CustomWebApplicationFactory<Startup>>
    {
        private readonly HttpClient _client;

        public BankAccountControllerIntegrationTests(CustomWebApplicationFactory<Startup> factory)
        {
            _client = factory.CreateClient();
        }

        [Fact]
        public async Task CanGetCustomerBankAccounts()
        {
            // The endpoint or route of the controller action.
            var httpResponse = await _client.GetAsync("/api/BankAccount/ec9426bc-fb05-4a38-b63b-f265cbdfb816");

            // Must be successful.
            httpResponse.EnsureSuccessStatusCode();

            // Deserialize and examine results.
            var stringResponse = await httpResponse.Content.ReadAsStringAsync();
            var accounts = JsonConvert.DeserializeObject<IEnumerable<AccountModel>>(stringResponse);

            //Assert
            Assert.Contains(accounts, a => a.AccountNumber == 1234567890);
        }

    }
}
