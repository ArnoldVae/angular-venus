/**
 * 收款管理-仲裁管理模块
 */
define(['angular'],function (angular) {
    'use strict';
    /*路由定义实现方法*/
    var routerFn = function ($stateProvider,$couchPotatoProvider) {
        var userPath = 'components/collection/arbitrationManage';
        $stateProvider

            //仲裁管理
            .state('arbitrationManage', {
                url: '/arbitrationManage',
                cache:false,
                multiEditor: {
                    multiple: false,
                    label: '仲裁管理'
                },
                resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies([
                        userPath+'/controller/arbitrationManage.ctrl',
                        userPath+'/factory/arbitrationManage'
                    ])
                },
                views: {
                    'main': {
                        templateUrl: userPath+'/tpl/arbitrationManage.main.tpl.html',
                        controller: 'ArbitrationManageCtrl'
                    }
                }
            });

    };

    /*模块定义*/
    var arbitrationManage = angular.module('business.collection.arbitrationManage', []);
    arbitrationManage.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            arbitrationManage.controller = $controllerProvider.register;
            arbitrationManage.directive = $compileProvider.directive;
            arbitrationManage.filter = $filterProvider.register;
            arbitrationManage.factory = $provide.factory;
            arbitrationManage.service = $provide.service;
            arbitrationManage.constant = $provide.constant;
        }]);

    /*定义路由*/
    arbitrationManage.config(['$stateProvider','$couchPotatoProvider', routerFn]);
    return arbitrationManage;
});










