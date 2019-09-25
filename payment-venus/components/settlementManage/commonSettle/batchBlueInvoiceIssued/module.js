
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
        var userPath = 'components/settlementManage/commonSettle/batchBlueInvoiceIssued';
        $stateProvider

        //联供保结算
            .state('batchBlueInvoiceIssued', {
                url: '/batchBlueInvoiceIssued',
                cache:false,
                multiEditor: {
                    multiple: false,
                    label: '批量蓝票开具申请'
                },
                resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies([
                        userPath+'/controller/batchBlueInvoiceIssued.ctrl',
                        userPath+'/factory/batchBlueInvoiceIssued'
                    ])
                },
                views: {
                    'main': {
                        templateUrl: userPath+'/tpl/batchBlueInvoiceIssued.tpl.html',
                        controller: 'batchBlueInvoiceIssuedCtrl'
                    }
                }
            })



    };

    /*模块定义*/
    var batchBlueInvoiceIssued = angular.module('business.settlementManage.commonSettle.batchBlueInvoiceIssued', []);
    batchBlueInvoiceIssued.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            batchBlueInvoiceIssued.controller = $controllerProvider.register;
            batchBlueInvoiceIssued.directive = $compileProvider.directive;
            batchBlueInvoiceIssued.filter = $filterProvider.register;
            batchBlueInvoiceIssued.factory = $provide.factory;
            batchBlueInvoiceIssued.service = $provide.service;
            batchBlueInvoiceIssued.constant = $provide.constant;
        }]);

    /*定义路由*/
    batchBlueInvoiceIssued.config(['$stateProvider','$couchPotatoProvider', routerFn]);
    return batchBlueInvoiceIssued;
});
