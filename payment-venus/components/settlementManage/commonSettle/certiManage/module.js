
/**
 * 联共保结算模块
 */
define([
    'angular'
],function (angular
) {
    'use strict';
    /*路由定义实现方法*/
    var routerFn = function ($stateProvider,$couchPotatoProvider) {
        var userPath = 'components/settlementManage/commonSettle/certiManage';
        $stateProvider

        //联供保结算
            .state('certiManage', {
                url: '/certiManage',
                cache:false,
                multiEditor: {
                    multiple: false,
                    label: '联共保-业务单查询'
                },
                resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies([
                        userPath+'/controller/certiManage.ctrl',
                        userPath+'/factory/certiManage'
                    ])
                },
                views: {
                    'main': {
                        templateUrl: userPath+'/tpl/certiManage.tpl.html',
                        controller: 'CertiManageCtrl'
                    }
                }
            })



    };

    /*模块定义*/
    var certiManage = angular.module('business.settlementManage.commonSettle.certiManage', []);
    certiManage.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            certiManage.controller = $controllerProvider.register;
            certiManage.directive = $compileProvider.directive;
            certiManage.filter = $filterProvider.register;
            certiManage.factory = $provide.factory;
            certiManage.service = $provide.service;
            certiManage.constant = $provide.constant;
        }]);

    /*定义路由*/
    certiManage.config(['$stateProvider','$couchPotatoProvider', routerFn]);
    return certiManage;
});
