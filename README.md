# eBank
Online banking application:\
The eBank application tries to show best practices when it comes to: folders structure, using modules,\
testing, communicating with a REST back-end, organizing navigation, addressing security concerns with token base authentication, etc.

# Stack
**Database:** Sql Server, Entity Framework Core with code first approach\
**Store:** NGRX Store/Effects (Used for storing auth info and dispatching auth actions)\
**Backend:** ASP.NET Core Web Application with .Net Core 2.2 utilizing Restful Web Api core\
**Authentication:** Identity Server 4 (Token based Authentication)\
**Client:** Angular 8, Typescript 3, CSS4\
**U.I Components:** Angular Material\
**NPM Packages:** ngx-logger, ngx-spinner, ngx-toastr\
**Testing:** Xunit
**Software Development Tools Used:** Visual Studio 2017, Sql Server 2017, VS Code

# Installation
Platform & tools
You need to install Node.js and then the development tools. Node.js comes with a package manager called npm for installing NodeJS applications and libraries.
Also Make sure you have .Net Core 2.2 SDK installed.

Get the Code
Either clone this repository or fork it on GitHub and clone your fork:\

Note: Please make sure to get the latest Milestone\

git clone https://github.com/eshafiei/eBank.git

App Server:\
Backend application server is a ASP.NET Core Web Application that relies upon some 3rd Party npm packages. 

Database Creation:\
Adjust the connection string information inside appsettings.json to point to your database instance.\
Database could be auto generated using Package Manager Console. Simply execute update-database command while eBank.DataAccess project is selected.

Client App:\
cd client\
npm install  (This will install the dependencies declared in the client/package.json file)\

# eBank application main features

**User SignUp and Login**\
**Account Summary**\
**Open New Bank Accounts**\
**Close Bank Accounts**\
**Deposit**\
**Withdraw**\
**Transfer Money**

# Enforced Business Logics

**-- User cannot Deposit more than $10000 in one transaction**\
**-- User cannot Withdraw more than 90% of their total balance.**\
**-- Withdraw Money cannot cause account balance to go below $100.**\
**-- Account closing is not possible if account has balance.**\
**-- In order to be able to close an account with balance, you will first need to transfer account balance to other accounts.**
