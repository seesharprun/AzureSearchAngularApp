angular.module('CustomersApp.Controllers')
    .controller('CustomerListController', ['$scope', 'SearchService', function ($scope, SearchService) {

      $scope.rowCount = 7;
      $scope.visiblePageCount = 5;
      $scope.currentPage = 1;
      $scope.totalRows = null;
      $scope.rowCountOptions = [5, 7, 10, 15, 20, 50];

      $scope.items = [];

      $scope.filter = {
        'items': [],
        'options': []
      };

      $scope.pageCount = function () {
        return Math.ceil($scope.totalRows / $scope.rowCount);
      };

      $scope.$watch('currentPage + rowCount', function () {
        var start = (($scope.currentPage - 1) * $scope.rowCount);
        updateGrid(start, $scope.rowCount);
      });

      $scope.addFilter = function (category, facet) {
        $scope.filter.items.push({
          'key': category,
          'value': facet.value
        });
        updateGrid(0, $scope.rowCount);
      };

      $scope.removeFilter = function (filter) {
        var index = $scope.filter.items.indexOf(filter);
        if (index > -1) {
          $scope.filter.items.splice(index, 1);
        }
        updateGrid(0, $scope.rowCount);
      };

      $scope.isFiltered = function (category) {
        return $scope.getFilter(category);
      };

      $scope.getFilter = function (category) {
        for (var i = 0; i < $scope.filter.items.length; i = i + 1) {
          if ($scope.filter.items[i].key == category) {
            return $scope.filter.items[i].value;
          }
        }
        return null;
      };

      function updateGrid(start, rows) {
        var filter = getODataFilter();
        $scope.filter.options = [];        
        SearchService.getAll(start, rows, filter).$promise.then(function (response) {
          // This would be better if facets were an array
          $scope.filter.options.push({ name: "CountryRegion", value: response['@search.facets'].CountryRegion });
          $scope.filter.options.push({ name: "StateProvince", value: response['@search.facets'].StateProvince });
          $scope.items = response.value;
          $scope.totalRows = response['@odata.count'];
        });
      }

      function getODataFilter() {
        var filter = null;
        if ($scope.filter.items.length > 0) {
          var filterArray = [];
          for (var i = 0; i < $scope.filter.items.length; i = i + 1) {
            filterArray.push('(' + $scope.filter.items[i].key + ' eq \'' + $scope.filter.items[i].value + '\')');
          }
          filter = filterArray.join(' and ');
        }
        return filter;
      }

    }]);
