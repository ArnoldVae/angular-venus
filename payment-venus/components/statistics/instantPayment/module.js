/**
 * 查询统计-保费查询模块
 */
define(['angular'],function (angular) {
    'use strict';
    /*路由定义实现方法*/
    var routerFn = function ($stateProvider,$couchPotatoProvider) {
        var userPath = 'components/statistics/instantPayment';
        $stateProvider

            //银行流水导入
            .state('instantPayment', {
                url: '/instantPayment',
                resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies([
                        userPath+'/controller/statistics.instantPayment.ctrl',
                        userPath+'/factory/instantPayment'
                    ])
                },
                views: {
                    'main': {
                        templateUrl: userPath+'/tpl/statistics.instantPayment.tpl.html',
                        controller: 'InstantPaymentCtrl'
                    }
                }
            });

    };

    /*模块定义*/
    var instantPayment = angular.module('business.statistics.instantPayment', []);
    instantPayment.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            instantPayment.controller = $controllerProvider.register;
            instantPayment.directive = $compileProvider.directive;
            instantPayment.filter = $filterProvider.register;
            instantPayment.factory = $provide.factory;
            instantPayment.service = $provide.service;
            instantPayment.constant = $provide.constant;
        }]);

    /*定义路由*/
    instantPayment.config(['$stateProvider','$couchPotatoProvider', routerFn]);
    return instantPayment;
});











