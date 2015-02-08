angular.module("CustomersApp.Services")
    .factory('SearchService', ['$resource', 'config', function ($resource, config) {

        var searchServiceUrl = config.SearchUri + ':id?&api-version=' + config.ApiVersion ;

        var parameters = {
          id: '@id',
          facet: '@facet',
          search: '@search',
          scoringProfile: '@scoringProfile',
          scoringParameter: '@scoringParameter',
          $skip: '@$skip',
          $top: '@$top',
          $orderby: '@$orderby',
          $filter: '@$filter'
        };

        var headers = {
          'api-key': config.SearchKey
        };

        var searchResource =  $resource(searchServiceUrl, parameters, {
            'query': {
                method: 'GET',
                isArray: false,
                headers: headers,
                params: {
                  search: '*',
                  facet: ['CountryRegion,count:5', 'StateProvince,count:5'],
                  scoringProfile: 'base',
                  scoringParameter: null,
                  $count: true,
                  $top: 10,
                  $skip: 0,
                  $orderby: null,
                  $filter: null
                }
            },
            'get': {
                method: 'GET',
                isArray: false,
                headers: headers,
                params: {
                  id: ''
                }
            }
        });

        return {
          getAll: function (start, rows, filter) {
            return searchResource.query({ $skip: start, $top: rows, $filter: filter, $orderby: 'LastName,FirstName' });
          },
          get: function (id) {
            return searchResource.get({ id: id });
          },
          query: function (country, keyword) {
            return searchResource.query({ search: keyword, scoringProfile: 'boost', scoringParameter: 'country:' + country });
          }
        };

    }]);
