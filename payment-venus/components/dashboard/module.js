/**
 * Created by martin on 2017/4/13.
 * 工作台
 */
define(['angular'],function (angular) {
    'use strict';
    /*路由定义实现方法*/
    var routerFn = function ($stateProvider,$couchPotatoProvider) {
        var userPath = 'components/dashboard';
        $stateProvider

        //银行流水导入
            .state('dashboard', {
                url: '/dashboard',
                cache:false,
                multiEditor: {
                    multiple: false,
                    label: '工作台'
                },
                resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies([
                        userPath+'/controller/dashboard.ctrl',
                        userPath+'/factory/dashboard'
                    ])
                },
                views: {
                    'main': {
                        templateUrl: userPath+'/tpl/dashboard.tpl.html',
                        controller: 'DashboardCtrl'
                    }
                }
            });

    };

    /*模块定义*/
    var dashboard = angular.module('business.dashboard', []);
    dashboard.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            dashboard.controller = $controllerProvider.register;
            dashboard.directive = $compileProvider.directive;
            dashboard.filter = $filterProvider.register;
            dashboard.factory = $provide.factory;
            dashboard.service = $provide.service;
            dashboard.constant = $provide.constant;
        }]);

    /*定义路由*/
    dashboard.config(['$stateProvider','$couchPotatoProvider', routerFn]);
    return dashboard;
});
