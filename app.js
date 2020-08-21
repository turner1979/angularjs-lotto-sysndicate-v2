var app = angular.module('lotto', ['ui.router']);

app.config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise('/');
    
    $stateProvider
        .state('update-members', {
            url: '/',
            templateUrl: 'app/templates/update-members.html',
            controller:  'UpdateMembersCtrl'
        })
        .state('view-members', {
            url: '/view-members',
            templateUrl: 'app/templates/view-members.html',
            controller:  'ViewMembersCtrl'
        })
        .state('edit-member', {
            url: "/edit-member/:memberId",
            templateUrl: 'app/templates/update-members.html',
            controller: 'UpdateMembersCtrl'
        });

}]);
