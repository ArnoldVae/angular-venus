/**
 * 发票管理-进项管理-进项发票转出————国寿poc
 */
define([
    'angular'
],function (angular
) {
    'use strict';
    /*路由定义实现方法*/
    var routerFn = function ($stateProvider,$couchPotatoProvider) {
        var userPath = 'components/settlementManage/commonSettle/invoiceOut';
        $stateProvider

            //进项发票转出
            .state('invoiceOut', {
                url: '/invoiceOut',
                cache:false,
                multiEditor: {
                    multiple: false,
                    label: '进项发票转出'
                },
                resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies([
                        userPath+'/controller/invoiceOut.ctrl',
                        userPath+'/factory/invoiceOut'
                    ])
                },
                views: {
                    'main': {
                        templateUrl: userPath+'/tpl/invoiceOut.tpl.html',
                        controller: 'InvoiceOutCtrl'
                    }
                }
            })



    };

    /*模块定义*/
    var invoiceOut = angular.module('business.settlementManage.commonSettle.invoiceOut', []);
    invoiceOut.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            invoiceOut.controller = $controllerProvider.register;
            invoiceOut.directive = $compileProvider.directive;
            invoiceOut.filter = $filterProvider.register;
            invoiceOut.factory = $provide.factory;
            invoiceOut.service = $provide.service;
            invoiceOut.constant = $provide.constant;
        }]);

    /*定义路由*/
    invoiceOut.config(['$stateProvider','$couchPotatoProvider', routerFn]);
    return invoiceOut;
});
