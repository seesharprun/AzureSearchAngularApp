angular.module('CustomersApp.Controllers')
    .controller('MainController', ['$scope', function ($scope) {

      $scope.countries = ['Canada', 'United States', 'United Kingdom'];
      $scope.currentCountry = 'United States';

    }]);
