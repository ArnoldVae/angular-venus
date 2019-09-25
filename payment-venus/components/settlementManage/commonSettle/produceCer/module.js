/**
 * 发票管理-进项管理-生成进项税抵扣凭证————国寿poc
 */
define([
    'angular'
],function (angular
) {
    'use strict';
    /*路由定义实现方法*/
    var routerFn = function ($stateProvider,$couchPotatoProvider) {
        var userPath = 'components/settlementManage/commonSettle/produceCer';

        $stateProvider

            //生成进项税抵扣凭证
            .state('produceCer', {
                url: '/produceCer',
                cache:false,
                multiEditor: {
                    multiple: false,
                    label: '生成进项税抵扣凭证'
                },
                resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies([
                        userPath+'/controller/produceCer.ctrl',
                        userPath+'/factory/produceCer'
                    ])
                },
                views: {
                    'main': {
                        templateUrl: userPath+'/tpl/produceCer.tpl.html',
                        controller: 'ProduceCerCtrl'
                    }
                }
            })
    };

    /*模块定义*/
    var produceCer = angular.module('business.settlementManage.commonSettle.produceCer', []);
    produceCer.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            produceCer.controller = $controllerProvider.register;
            produceCer.directive = $compileProvider.directive;
            produceCer.filter = $filterProvider.register;
            produceCer.factory = $provide.factory;
            produceCer.service = $provide.service;
            produceCer.constant = $provide.constant;
        }]);

    /*定义路由*/
    produceCer.config(['$stateProvider','$couchPotatoProvider', routerFn]);
    return produceCer;
});
