/**
 * 查询统计-税务报表清单
 */
define(['angular'],function (angular) {
    'use strict';
    /*路由定义实现方法*/
    var routerFn = function ($stateProvider,$couchPotatoProvider) {
        var userPath = 'components/statistics/taxStatements';
        $stateProvider

            //税务报表查询
            .state('taxStatements', {
                url: '/taxStatements',
                resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies([
                        userPath+'/controller/statistics.taxStatements.ctrl',
                        userPath+'/factory/statistics.taxStatements'
                    ])
                },
                views: {
                    'main': {
                        templateUrl: userPath+'/tpl/taxStatements.html',
                        controller: 'TaxStatementsCtrl'
                    }
                }
            });

    };

    /*模块定义*/
    var taxStatements = angular.module('business.statistics.taxStatements', []);
    taxStatements.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            taxStatements.controller = $controllerProvider.register;
            taxStatements.directive = $compileProvider.directive;
            taxStatements.filter = $filterProvider.register;
            taxStatements.factory = $provide.factory;
            taxStatements.service = $provide.service;
            taxStatements.constant = $provide.constant;
        }]);

    /*定义路由*/
    taxStatements.config(['$stateProvider','$couchPotatoProvider', routerFn]);
    return taxStatements;
});
