/**
 * 发票管理-红票开具申请————国寿poc
 */
define([
    'angular'
],function (angular
) {
    'use strict';
    /*路由定义实现方法*/
    var routerFn = function ($stateProvider,$couchPotatoProvider) {
        var userPath = 'components/settlementManage/commonSettle/redInvoiceIssued';
        $stateProvider

            //红票开具申请
            .state('redInvoiceIssued', {
                url: '/redInvoiceIssued',
                cache:false,
                multiEditor: {
                    multiple: false,
                    label: '红票开具申请'
                },
                resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies([
                        userPath+'/controller/redInvoiceIssued.ctrl',
                        userPath+'/factory/redInvoiceIssued'
                    ])
                },
                views: {
                    'main': {
                        templateUrl: userPath+'/tpl/redInvoiceIssued.tpl.html',
                        controller: 'redInvoiceIssuedCtrl'
                    }
                }
            })
    };

    /*模块定义*/
    var redInvoiceIssued = angular.module('business.settlementManage.commonSettle.redInvoiceIssued', []);
    redInvoiceIssued.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            redInvoiceIssued.controller = $controllerProvider.register;
            redInvoiceIssued.directive = $compileProvider.directive;
            redInvoiceIssued.filter = $filterProvider.register;
            redInvoiceIssued.factory = $provide.factory;
            redInvoiceIssued.service = $provide.service;
            redInvoiceIssued.constant = $provide.constant;
        }]);

    /*定义路由*/
    redInvoiceIssued.config(['$stateProvider','$couchPotatoProvider', routerFn]);
    return redInvoiceIssued;
});
