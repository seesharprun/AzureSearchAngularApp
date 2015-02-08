angular.module('CustomersApp.Controllers')
  .controller('CustomerSearchController', ['$scope', '$http', '$routeParams', 'SearchService', function ($scope, $http, $routeParams, SearchService) {

      $scope.items = [];
      $scope.searchKeyword = $routeParams.keyword;
      $scope.country = $routeParams.country;

      //$http.defaults.useXDomain = true;
      $scope.response = SearchService.query($scope.country, $scope.searchKeyword);

  }]);
