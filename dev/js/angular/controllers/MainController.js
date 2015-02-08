angular.module('CustomersApp.Controllers')
    .controller('MainController', ['$scope', 'SearchService', function ($scope, SearchService) {

      $scope.searchTerm = "";
      $scope.countries = ['Canada', 'United States', 'United Kingdom'];
      $scope.currentCountry = 'United States';

      $scope.clearSearch = function() {
          $scope.searchTerm = "";
      };

      $scope.getSuggestions = function(input) {
        return SearchService.suggest(input).$promise.then(function (response) {
          return response.value.map(function(item){
            return {
              'id': item.id,
              'FirstName': item.FirstName,
              'LastName': item.LastName,
              'name': item.FirstName + ' ' + item.LastName,
              'match': item
            };
          });
        });
      };

    }]);
