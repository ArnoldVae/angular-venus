/**
 * 查询统计-费用报表清单
 */
define(['angular'],function (angular) {
    'use strict';
    /*路由定义实现方法*/
    var routerFn = function ($stateProvider,$couchPotatoProvider) {
        var userPath = 'components/statistics/costStatements';
        $stateProvider

            //税务报表查询
            .state('costStatements', {
                url: '/costStatements',
                resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies([
                        userPath+'/controller/statistics.costStatements.ctrl',
                        userPath+'/factory/statistics.costStatements'
                    ])
                },
                views: {
                    'main': {
                        templateUrl: userPath+'/tpl/costStatements.html',
                        controller: 'CostStatementsCtrl'
                    }
                }
            });

    };

    /*模块定义*/
    var costStatements = angular.module('business.statistics.costStatements', []);
    costStatements.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            costStatements.controller = $controllerProvider.register;
            costStatements.directive = $compileProvider.directive;
            costStatements.filter = $filterProvider.register;
            costStatements.factory = $provide.factory;
            costStatements.service = $provide.service;
            costStatements.constant = $provide.constant;
        }]);

    /*定义路由*/
    costStatements.config(['$stateProvider','$couchPotatoProvider', routerFn]);
    return costStatements;
});