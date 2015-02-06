angular.module('CustomersApp.Controllers')
  .controller('CustomerDetailsController', ['$scope', '$routeParams', 'SearchService', function ($scope, $routeParams, SearchService) {

      $scope.item = SearchService.get($routeParams.customerid);

  }]);
