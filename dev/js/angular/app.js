angular.module('CustomersApp', ['CustomersApp.Services', 'CustomersApp.Controllers', 'CustomersApp.Routing', 'ui.bootstrap']);
angular.module('CustomersApp.Services', ['ngResource', 'CustomersApp.Config']);
angular.module('CustomersApp.Routing', ['ngRoute']);
angular.module('CustomersApp.Controllers', []);
angular.module('CustomersApp.Config', []);
