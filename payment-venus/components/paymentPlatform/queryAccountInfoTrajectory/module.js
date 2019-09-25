/**
 * 账户信息修改轨迹查询
 */
define(['angular'],function (angular) {
    'use strict';
    /*路由定义实现方法*/
    var routerFn = function ($stateProvider,$couchPotatoProvider) {
        var userPath = 'components/paymentPlatform/queryAccountInfoTrajectory';
        $stateProvider

            .state('queryAccountInfoTrajectory', {
                url: '/queryAccountInfoTrajectory',
                cache:false,
                multiEditor: {
                    multiple: false,
                    label: '账户信息修改轨迹查询'
                },
                resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies([
                        userPath+'/controller/queryAccountInfoTrajectory.ctrl',
                        userPath+'/factory/queryAccountInfoTrajectory'
                    ])
                },
                views: {
                    'main': {
                        templateUrl: userPath+'/tpl/queryAccountInfoTrajectory.tpl.html',
                        controller: 'queryAccountInfoTrajectoryCtrl'
                    }
                }
            });

    };

    /*模块定义*/
    var queryAccountInfoTrajectory = angular.module('business.paymentPlatform.queryAccountInfoTrajectory', []);
    queryAccountInfoTrajectory.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            queryAccountInfoTrajectory.controller = $controllerProvider.register;
            queryAccountInfoTrajectory.directive = $compileProvider.directive;
            queryAccountInfoTrajectory.filter = $filterProvider.register;
            queryAccountInfoTrajectory.factory = $provide.factory;
            queryAccountInfoTrajectory.service = $provide.service;
            queryAccountInfoTrajectory.constant = $provide.constant;
        }]);

    /*定义路由*/
    queryAccountInfoTrajectory.config(['$stateProvider','$couchPotatoProvider', routerFn]);
    return queryAccountInfoTrajectory;
});


