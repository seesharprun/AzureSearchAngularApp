angular.module("CustomersApp.Services")
    .factory('SearchService', ['$resource', 'config', function ($resource, config) {

        var baseSearchServiceUrl = 'https://' + config.SearchServiceName + '.search.windows.net/indexes/' + config.SearchServiceIndexName + '/';
        var documentSearchUrl = baseSearchServiceUrl + 'docs/:id?&api-version=' + config.ApiVersion;
        var suggestionsSearchUrl = baseSearchServiceUrl + 'docs/suggest' + '?&api-version=' + config.ApiVersion;

        var documentSearchParameters = {
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

        var suggestionsSearchParameters = {
          search: '@search',
          suggesterName: '@suggesterName',
          $top: '@$top',
          $select: '@$select'
        };

        var headers = {
          'api-key': config.SearchQueryKey
        };

        var documentSearchResource =  $resource(documentSearchUrl, documentSearchParameters, {
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

        var suggestionsSearchResource =  $resource(suggestionsSearchUrl, suggestionsSearchParameters, {
          'query': {
              method: 'GET',
              isArray: false,
              headers: headers,
              params: {
                search: '*',
                suggesterName: 'namesuggester',
                $top: 4,
                $select: 'id,LastName,FirstName',
              }
          },
        });

        return {
          getAll: function (start, rows, filter) {
            return documentSearchResource.query({ $skip: start, $top: rows, $filter: filter, $orderby: 'LastName,FirstName' });
          },
          get: function (id) {
            return documentSearchResource.get({ id: id });
          },
          query: function (country, keyword) {
            return documentSearchResource.query({ search: keyword, scoringProfile: 'countryboost', scoringParameter: 'country:' + country });
          },
          suggest: function (keyword) {
            return suggestionsSearchResource.query({ search: keyword });
          }
        };

    }]);
