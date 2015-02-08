angular.module("CustomersApp.Config")
    .constant('config', {
        SearchKey: "[Your Key]",
        SearchUri: "https://[account].search.windows.net/indexes/[index]/docs/",
        ApiVersion: "2014-10-20-Preview"
    });
