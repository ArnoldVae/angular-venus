/**
 *日结审核
 */
define(['angular'],function (angular) {
    'use strict';
    /*路由定义实现方法*/
    var routerFn = function ($stateProvider,$couchPotatoProvider) {
        var userPath = 'components/daily/voucherChecking';
        $stateProvider

            .state('voucherChecking', {
                url: '/voucherChecking',
                cache:false,
                multiEditor:{
                    multiple:false,
                    label:'凭证复核'
                },
                resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies([
                        userPath+'/controller/voucherChecking.ctrl',
                        userPath+'/factory/voucherChecking'
                    ])
                },
                views: {
                    'main': {
                        templateUrl: userPath+'/tpl/voucherChecking.html',
                        controller: 'VoucherCheckingCtrl'
                    }
                }
            });

    };
    /*模块定义*/
    var voucherCheckingInvoice = angular.module('business.daily.voucherChecking', []);
    voucherCheckingInvoice.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            voucherCheckingInvoice.controller = $controllerProvider.register;
            voucherCheckingInvoice.directive = $compileProvider.directive;
            voucherCheckingInvoice.filter = $filterProvider.register;
            voucherCheckingInvoice.factory = $provide.factory;
            voucherCheckingInvoice.service = $provide.service;
            voucherCheckingInvoice.constant = $provide.constant;
        }]);
    /*定义路由*/
    voucherCheckingInvoice.config(['$stateProvider','$couchPotatoProvider', routerFn]);
    return voucherCheckingInvoice;
});
















