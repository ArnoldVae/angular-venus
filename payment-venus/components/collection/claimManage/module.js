/**
 * Created by martin on 2017/4/13.
 * 付款管理-付款登记模块
 */
define(['angular'],function (angular) {
    'use strict';
    /*路由定义实现方法*/
    var routerFn = function ($stateProvider,$couchPotatoProvider) {
        var userPath = 'components/collection/claimManage';
        $stateProvider

        //付款登记
            .state('claimManage', {
                url: '/claimManage',
                resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies([
                        userPath+'/controller/claimManage.ctrl',
                        userPath+'/factory/claimManage'
                    ])
                },
                views: {
                    'main': {
                        templateUrl: userPath+'/tpl/claimManage.tpl.html',
                        controller: 'claimManageCtrl'
                    }
                }
            });

    };

    /*模块定义*/
    var claimManage = angular.module('business.collection.claimManage', []);
    claimManage.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            claimManage.controller = $controllerProvider.register;
            claimManage.directive = $compileProvider.directive;
            claimManage.filter = $filterProvider.register;
            claimManage.factory = $provide.factory;
            claimManage.service = $provide.service;
            claimManage.constant = $provide.constant;
        }]);

    /*定义路由*/
    claimManage.config(['$stateProvider','$couchPotatoProvider', routerFn]);
    return claimManage;
});










