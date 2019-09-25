/**
 * 发票管理-进项管理-取消进项登记/转出————国寿poc
 */
define([
    'angular'
],function (angular
) {
    'use strict';
    /*路由定义实现方法*/
    var routerFn = function ($stateProvider,$couchPotatoProvider) {
        var userPath = 'components/settlementManage/commonSettle/cancelRO';
        $stateProvider

             //取消进项登记/转出
            .state('cancelRO', {
                url: '/cancelRO',
                cache:false,
                multiEditor: {
                    multiple: false,
                    label: '进项发票信息取消登记/转出查询'
                },
                resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies([
                        userPath+'/controller/cancelRO.ctrl',
                        userPath+'/factory/cancelRO'
                    ])
                },
                views: {
                    'main': {
                        templateUrl: userPath+'/tpl/cancelRO.tpl.html',
                        controller: 'CancelROCtrl'
                    }
                }
            })
    };

    /*模块定义*/
    var cancelRO = angular.module('business.settlementManage.commonSettle.cancelRO', []);
    cancelRO.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            cancelRO.controller = $controllerProvider.register;
            cancelRO.directive = $compileProvider.directive;
            cancelRO.filter = $filterProvider.register;
            cancelRO.factory = $provide.factory;
            cancelRO.service = $provide.service;
            cancelRO.constant = $provide.constant;
        }]);

    /*定义路由*/
    cancelRO.config(['$stateProvider','$couchPotatoProvider', routerFn]);
    return cancelRO;
});
