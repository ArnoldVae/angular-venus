
/**
 * 发票管理-进项管理-进项发票抵扣状态回写————国寿poc
 */
define([
    'angular'
],function (angular
) {
    'use strict';
    /*路由定义实现方法*/
    var routerFn = function ($stateProvider,$couchPotatoProvider) {
        var userPath = 'components/settlementManage/commonSettle/invoiceStatus';

        $stateProvider

            //进项发票抵扣状态回写
            .state('invoiceStatus', {
                url: '/invoiceStatus',
                cache:false,
                multiEditor: {
                    multiple: false,
                    label: '进项发票抵扣状态回写'
                },
                resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies([
                        userPath+'/controller/invoiceStatus.ctrl',
                        userPath+'/factory/invoiceStatus'
                    ])
                },
                views: {
                    'main': {
                        templateUrl: userPath+'/tpl/invoiceStatus.tpl.html',
                        controller: 'InvoiceStatusCtrl'
                    }
                }
            })
    };

    /*模块定义*/
    var invoiceStatus = angular.module('business.settlementManage.commonSettle.invoiceStatus', []);
    invoiceStatus.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            invoiceStatus.controller = $controllerProvider.register;
            invoiceStatus.directive = $compileProvider.directive;
            invoiceStatus.filter = $filterProvider.register;
            invoiceStatus.factory = $provide.factory;
            invoiceStatus.service = $provide.service;
            invoiceStatus.constant = $provide.constant;
        }]);

    /*定义路由*/
    invoiceStatus.config(['$stateProvider','$couchPotatoProvider', routerFn]);
    return invoiceStatus;
});
