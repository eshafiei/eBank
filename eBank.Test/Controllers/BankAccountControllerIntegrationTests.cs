using eBank.DataAccess.Models.Account;
using eBank.DataAccess.Models.Base;
using eBank.DataAccess.Models.Transaction;
using eBank.Web;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Threading.Tasks;
using Xunit;

namespace eBank.Test.Controllers
{
    public class BankAccountControllerIntegrationTests : IClassFixture<CustomWebApplicationFactory<Startup>>
    {
        private readonly HttpClient _client;
        private readonly JsonMediaTypeFormatter _jsonMediaTypeFormatter;

        public BankAccountControllerIntegrationTests(CustomWebApplicationFactory<Startup> factory)
        {
            _client = factory.CreateClient();
            _jsonMediaTypeFormatter = new JsonMediaTypeFormatter();
        }

        [Fact]
        public async Task CanGetUserBankAccounts()
        {
            // The endpoint or route of the controller action.
            var httpResponse = await _client.GetAsync("/api/BankAccount/6a25acf9-b7e0-4c61-b532-21fde9c7409f");

            // Must be successful.
            httpResponse.EnsureSuccessStatusCode();

            // Deserialize and examine results.
            var stringResponse = await httpResponse.Content.ReadAsStringAsync();
            var accounts = JsonConvert.DeserializeObject<IEnumerable<AccountModel>>(stringResponse);

            //Assert
            Assert.Contains(accounts, a => a.AccountNumber == 1234567890);
        }

        [Fact]
        public async Task Get_User_Active_BankAccounts()
        {
            // The endpoint or route of the controller action.
            var httpResponse = await _client.GetAsync("/api/BankAccount/6a25acf9-b7e0-4c61-b532-21fde9c7409f");

            // Must be successful.
            httpResponse.EnsureSuccessStatusCode();

            // Deserialize and examine results.
            var stringResponse = await httpResponse.Content.ReadAsStringAsync();
            var accounts = JsonConvert.DeserializeObject<IEnumerable<AccountModel>>(stringResponse);

            //Assert
            Assert.DoesNotContain(accounts, a => a.AccountStatus == false);
        }

        [Fact]
        public async Task Can_Deposit_Money()
        {
            // The endpoint or route of the controller action.
            var transactionRequest = new TransactionModel
            {
                TransactionType = DataAccess.Enums.TransactionType.Deposit,
                AccountId = 2,
                Amount = 2000,
                TransactionDate = DateTime.Now.Date,
                Note = "Test deposit money"
            };
            var httpResponse = await _client.PostAsync("/api/transactions",
                transactionRequest,
                _jsonMediaTypeFormatter);

            // Must be successful.
            httpResponse.EnsureSuccessStatusCode();

            // Deserialize and examine results.
            var stringResponse = await httpResponse.Content.ReadAsStringAsync();
            var responseObject = JsonConvert.DeserializeObject<TransactionResult>(stringResponse);

            //Assert
            Assert.Equal("Deposit completed successfully.", responseObject.Result);
        }

        [Fact]
        public async Task CanNot_Deposit_MoreThan_10000()
        {
            // The endpoint or route of the controller action.
            var transactionRequest = new TransactionModel
            {
                TransactionType = DataAccess.Enums.TransactionType.Deposit,
                AccountId = 2,
                Amount = 12000,
                TransactionDate = DateTime.Now.Date,
                Note = "Test deposit more than 10000 dollars."
            };
            var httpResponse = await _client.PostAsync("/api/transactions",
                transactionRequest,
                _jsonMediaTypeFormatter);

            // Deserialize and examine results.
            var stringResponse = await httpResponse.Content.ReadAsStringAsync();
            var statusCode = httpResponse.StatusCode;

            //Assert
            Assert.Equal(HttpStatusCode.Forbidden, statusCode);
            Assert.Contains("Amount reached maximum deposit amount allowed.", stringResponse);
        }

        [Fact]
        public async Task Can_Withdraw_Money()
        {
            // The endpoint or route of the controller action.
            var transactionRequest = new TransactionModel
            {
                TransactionType = DataAccess.Enums.TransactionType.Withdraw,
                AccountId = 1,
                Amount = 4000,
                TransactionDate = DateTime.Now.Date,
                Note = "Test withdraw money."
            };
            var httpResponse = await _client.PostAsync("/api/transactions",
                transactionRequest,
                _jsonMediaTypeFormatter);

            // Must be successful.
            httpResponse.EnsureSuccessStatusCode();

            // Deserialize and examine results.
            var stringResponse = await httpResponse.Content.ReadAsStringAsync();
            var responseObject = JsonConvert.DeserializeObject<TransactionResult>(stringResponse);

            //Assert
            Assert.Equal("Withdraw completed successfully.", responseObject.Result);
        }

        [Fact]
        public async Task Withdraw_MinimumBalance_OneHundred()
        {
            // The endpoint or route of the controller action.
            var transactionRequest = new TransactionModel
            {
                TransactionType = DataAccess.Enums.TransactionType.Withdraw,
                AccountId = 1,
                Amount = 9950,
                TransactionDate = DateTime.Now.Date,
                Note = "Test withdraw fail if remaining balance will be less than 100 dollars"
            };
            var httpResponse = await _client.PostAsync("/api/transactions",
                transactionRequest,
                _jsonMediaTypeFormatter);

            // Deserialize and examine results.
            var stringResponse = await httpResponse.Content.ReadAsStringAsync();
            var statusCode = httpResponse.StatusCode;

            //Assert
            Assert.Equal(HttpStatusCode.Forbidden, statusCode);
            Assert.Contains("Withdraw failed. Account balance cannot go below", stringResponse);
        }

        [Fact]
        public async Task Withdraw_MoreThan90Percent_Balance()
        {
            // The endpoint or route of the controller action.
            var transactionRequest = new TransactionModel
            {
                TransactionType = DataAccess.Enums.TransactionType.Withdraw,
                AccountId = 1,
                Amount = 9200,
                TransactionDate = DateTime.Now.Date,
                Note = "Test withdraw more than 90% of total balance."
            };
            var httpResponse = await _client.PostAsync("/api/transactions",
                transactionRequest,
                _jsonMediaTypeFormatter);

            // Deserialize and examine results.
            var stringResponse = await httpResponse.Content.ReadAsStringAsync();
            var statusCode = httpResponse.StatusCode;

            //Assert
            Assert.Equal(HttpStatusCode.Forbidden, statusCode);
            Assert.Equal("Withdraw failed. Maximum withdraw allowance reached.", stringResponse);
        }
    }
}
