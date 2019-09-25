/**
 * 发票管理-进项管理-进项发票信息登记————国寿poc
 */
define([
    'angular'
],function (angular
) {
    'use strict';
    /*路由定义实现方法*/
    var routerFn = function ($stateProvider,$couchPotatoProvider) {
        var userPath = 'components/settlementManage/commonSettle/invoiceRegister';

        $stateProvider

            //进项发票信息登记
            .state('invoiceRegister', {
                url: '/invoiceRegister',
                cache:false,
                multiEditor: {
                    multiple: false,
                    label: '进项发票信息查询'
                },
                resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies([
                        userPath+'/controller/invoiceRegister.ctrl',
                        userPath+'/factory/invoiceRegister'
                    ])
                },
                views: {
                    'main': {
                        templateUrl: userPath+'/tpl/invoiceRegister.tpl.html',
                        controller: 'InvoiceRegisterCtrl'
                    }
                }
            })
    };

    /*模块定义*/
    var invoiceRegister = angular.module('business.settlementManage.commonSettle.invoiceRegister', []);
    invoiceRegister.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            invoiceRegister.controller = $controllerProvider.register;
            invoiceRegister.directive = $compileProvider.directive;
            invoiceRegister.filter = $filterProvider.register;
            invoiceRegister.factory = $provide.factory;
            invoiceRegister.service = $provide.service;
            invoiceRegister.constant = $provide.constant;
        }]);

    /*定义路由*/
    invoiceRegister.config(['$stateProvider','$couchPotatoProvider', routerFn]);
    return invoiceRegister;
});
