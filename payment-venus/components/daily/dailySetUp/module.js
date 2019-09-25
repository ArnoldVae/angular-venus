/**
 *日结设置
 */
define(['angular'],function (angular) {
    'use strict';
    /*路由定义实现方法*/
    var routerFn = function ($stateProvider,$couchPotatoProvider) {
        var userPath = 'components/daily/dailySetUp';
        $stateProvider

            .state('dailySetUp', {
                url: '/dailySetUp',
                cache:false,
                multiEditor:{
                    multiple:false,
                    label:'日结设置'
                },
                resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies([
                        userPath+'/controller/dailySetUp.ctrl',
                        userPath+'/factory/dailySetUp'
                    ])
                },
                views: {
                    'main': {
                        templateUrl: userPath+'/tpl/dailySetUp.html',
                        controller: 'DailySetUpCtrl'
                    }
                }
            });

    };
    /*模块定义*/
    var dailySetUpInvoice = angular.module('business.daily.dailySetUp', []);
    dailySetUpInvoice.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            dailySetUpInvoice.controller = $controllerProvider.register;
            dailySetUpInvoice.directive = $compileProvider.directive;
            dailySetUpInvoice.filter = $filterProvider.register;
            dailySetUpInvoice.factory = $provide.factory;
            dailySetUpInvoice.service = $provide.service;
            dailySetUpInvoice.constant = $provide.constant;
        }]);
    /*定义路由*/
    dailySetUpInvoice.config(['$stateProvider','$couchPotatoProvider', routerFn]);
    return dailySetUpInvoice;

});
















