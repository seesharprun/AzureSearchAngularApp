angular.module('CustomersApp.Routing')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
          .when('/Customers', {
              templateUrl: 'CustomerList.html',
              controller: 'CustomerListController'
          })
          .when('/Customers/:customerid', {
              templateUrl: 'CustomerDetails.html',
              controller: 'CustomerDetailsController'
          })
          .when('/Search/:country/:keyword', {
              templateUrl: 'CustomerSearch.html',
              controller: 'CustomerSearchController'
          })
          .otherwise({
              redirectTo: '/Customers'
          });
    }]);
