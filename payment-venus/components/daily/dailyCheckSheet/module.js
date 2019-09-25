/**
 *日结审核
 */
define(['angular'],function (angular) {
    'use strict';
    /*路由定义实现方法*/
    var routerFn = function ($stateProvider,$couchPotatoProvider) {
        var userPath = 'components/daily/dailyCheckSheet';
        $stateProvider

            .state('dailyCheckSheet', {
                url: '/dailyCheckSheet',
                cache:false,
                multiEditor:{
                    multiple:false,
                    label:'日结单审核'
                },
                resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies([
                        userPath+'/controller/dailyCheckSheet.ctrl',
                        userPath+'/factory/dailyCheckSheet'
                    ])
                },
                views: {
                    'main': {
                        templateUrl: userPath+'/tpl/dailyCheckSheet.html',
                        controller: 'DailyCheckSheetCtrl'
                    }
                }
            });

    };
    /*模块定义*/
    var dailyCheckSheetInvoice = angular.module('business.daily.dailyCheckSheet', []);
    dailyCheckSheetInvoice.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            dailyCheckSheetInvoice.controller = $controllerProvider.register;
            dailyCheckSheetInvoice.directive = $compileProvider.directive;
            dailyCheckSheetInvoice.filter = $filterProvider.register;
            dailyCheckSheetInvoice.factory = $provide.factory;
            dailyCheckSheetInvoice.service = $provide.service;
            dailyCheckSheetInvoice.constant = $provide.constant;
        }]);
    /*定义路由*/
    dailyCheckSheetInvoice.config(['$stateProvider','$couchPotatoProvider', routerFn]);
    return dailyCheckSheetInvoice;
});
















