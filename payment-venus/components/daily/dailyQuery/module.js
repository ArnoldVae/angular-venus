/**
 *日结查询
 */
define(['angular'],function (angular) {
    'use strict';
    /*路由定义实现方法*/
    var routerFn = function ($stateProvider,$couchPotatoProvider) {
        var userPath = 'components/daily/dailyQuery';
        $stateProvider

            .state('dailyQuery', {
                url: '/dailyQuery',
                cache:false,
                multiEditor:{
                    multiple:false,
                    label:'日结单查询'
                },
                resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies([
                        userPath+'/controller/dailyQuery.ctrl',
                        userPath+'/factory/dailyQuery'
                    ])
                },
                views: {
                    'main': {
                        templateUrl: userPath+'/tpl/dailyQuery.html',
                        controller: 'DailyQueryCtrl'
                    }
                }
            });

    };
    /*模块定义*/
    var dailyQueryInvoice = angular.module('business.daily.dailyQuery', []);
    dailyQueryInvoice.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            dailyQueryInvoice.controller = $controllerProvider.register;
            dailyQueryInvoice.directive = $compileProvider.directive;
            dailyQueryInvoice.filter = $filterProvider.register;
            dailyQueryInvoice.factory = $provide.factory;
            dailyQueryInvoice.service = $provide.service;
            dailyQueryInvoice.constant = $provide.constant;
        }]);
    /*定义路由*/
    dailyQueryInvoice.config(['$stateProvider','$couchPotatoProvider', routerFn]);
    return dailyQueryInvoice;

});
















