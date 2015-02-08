angular.module('CustomersApp.Controllers')
  .controller('CustomerSearchController', ['$scope', '$routeParams', 'SearchService', function ($scope, $routeParams, SearchService) {

      $scope.items = [];
      $scope.searchKeyword = $routeParams.keyword;
      $scope.country = $routeParams.country;

      $scope.response = SearchService.query($scope.country, $scope.searchKeyword);

  }]);
