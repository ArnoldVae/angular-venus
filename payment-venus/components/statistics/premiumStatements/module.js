/**
 * 查询统计-保费报表清单
 */
define(['angular'],function (angular) {
    'use strict';
    /*路由定义实现方法*/
    var routerFn = function ($stateProvider,$couchPotatoProvider) {
        var userPath = 'components/statistics/premiumStatements';
        $stateProvider

            //税务报表查询
            .state('premiumStatements', {
                url: '/premiumStatements',
                resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies([
                        userPath+'/controller/statistics.premiumStatements.ctrl',
                        userPath+'/factory/statistics.premiumStatements'
                    ])
                },
                views: {
                    'main': {
                        templateUrl: userPath+'/tpl/premiumStatements.html',
                        controller: 'PremiumStatementsCtrl'
                    }
                }
            });

    };

    /*模块定义*/
    var premiumStatements = angular.module('business.statistics.premiumStatements', []);
    premiumStatements.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            premiumStatements.controller = $controllerProvider.register;
            premiumStatements.directive = $compileProvider.directive;
            premiumStatements.filter = $filterProvider.register;
            premiumStatements.factory = $provide.factory;
            premiumStatements.service = $provide.service;
            premiumStatements.constant = $provide.constant;
        }]);

    /*定义路由*/
    premiumStatements.config(['$stateProvider','$couchPotatoProvider', routerFn]);
    return premiumStatements;
});
