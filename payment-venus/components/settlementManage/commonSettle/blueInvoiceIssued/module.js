
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
        var userPath = 'components/settlementManage/commonSettle/blueInvoiceIssued';
        $stateProvider

        //联供保结算
            .state('blueInvoiceIssued', {
                url: '/blueInvoiceIssued',
                cache:false,
                multiEditor: {
                    multiple: false,
                    label: '蓝票开具申请'
                },
                resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies([
                        userPath+'/controller/blueInvoiceIssued.ctrl',
                        userPath+'/factory/blueInvoiceIssued'
                    ])
                },
                views: {
                    'main': {
                        templateUrl: userPath+'/tpl/blueInvoiceIssued.tpl.html',
                        controller: 'blueInvoiceIssuedCtrl'
                    }
                }
            })



    };

    /*模块定义*/
    var blueInvoiceIssued = angular.module('business.settlementManage.commonSettle.blueInvoiceIssued', []);
    blueInvoiceIssued.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            blueInvoiceIssued.controller = $controllerProvider.register;
            blueInvoiceIssued.directive = $compileProvider.directive;
            blueInvoiceIssued.filter = $filterProvider.register;
            blueInvoiceIssued.factory = $provide.factory;
            blueInvoiceIssued.service = $provide.service;
            blueInvoiceIssued.constant = $provide.constant;
        }]);

    /*定义路由*/
    blueInvoiceIssued.config(['$stateProvider','$couchPotatoProvider', routerFn]);
    return blueInvoiceIssued;
});
