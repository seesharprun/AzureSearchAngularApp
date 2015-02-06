angular.module('CustomersApp.Routing')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
          .when('/Customers', {
              templateUrl: 'templates/CustomerList.html',
              controller: 'CustomerListController'
          })
          .when('/Customers/:customerid', {
              templateUrl: 'templates/CustomerDetails.html',
              controller: 'CustomerDetailsController'
          })
          .when('/Search/:keyword', {
              templateUrl: 'templates/CustomerSearch.html',
              controller: 'CustomerSearchController'
          })
          .otherwise({
              redirectTo: '/Customers'
          });
    }]);
