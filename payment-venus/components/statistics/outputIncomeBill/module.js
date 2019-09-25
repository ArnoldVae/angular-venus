/**
 * 查询统计-往来账清单管理
 */

define(['angular'],function (angular) {
    'use strict';
    /*路由定义实现方法*/
    var routerFn = function ($stateProvider,$couchPotatoProvider) {
        var userPath = 'components/statistics/outputIncomeBill';
        $stateProvider

            //税务报表查询
            .state('outputIncomeBill', {
                url: '/outputIncomeBill',
                resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies([
                        userPath+'/controller/statistics.outputIncomeBill.ctrl',
                        userPath+'/factory/statistics.outputIncomeBill'
                    ])
                },
                views: {
                    'main': {
                        templateUrl: userPath+'/tpl/outputIncomeBill.html',
                        controller: 'OutputIncomeBillCtrl'
                    }
                }
            });

    };

    /*模块定义*/
    var outputIncomeBill = angular.module('business.statistics.outputIncomeBill', []);
    outputIncomeBill.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            outputIncomeBill.controller = $controllerProvider.register;
            outputIncomeBill.directive = $compileProvider.directive;
            outputIncomeBill.filter = $filterProvider.register;
            outputIncomeBill.factory = $provide.factory;
            outputIncomeBill.service = $provide.service;
            outputIncomeBill.constant = $provide.constant;
        }]);

    /*定义路由*/
    outputIncomeBill.config(['$stateProvider','$couchPotatoProvider', routerFn]);
    return outputIncomeBill;
});
