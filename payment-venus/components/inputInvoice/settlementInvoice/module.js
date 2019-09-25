/**
 *理赔进项发票
 */
define(['angular'],function (angular) {
    'use strict';
    /*路由定义实现方法*/
    var routerFn = function ($stateProvider,$couchPotatoProvider) {
        var userPath = 'components/inputInvoice/settlementInvoice';
        $stateProvider

            //手续费进项发票
            .state('settlementInvoice', {
                url: '/settlementInvoice',
                cache:false,
                multiEditor:{
                    multiple:false,
                    label:'理赔进项发票'
                },
                resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies([
                        userPath+'/controller/settlementInvoice.ctrl',
                        userPath+'/factory/settlementInvoice'
                    ])
                },
                views: {
                    'main': {
                        templateUrl: userPath+'/tpl/settlementInvoice.html',
                        controller: 'SettlementInvoiceCtrl'
                    }
                }
            });

    };
    /*模块定义*/
    var settlementInvoice = angular.module('business.inputInvoice.settlementInvoice', []);
    settlementInvoice.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            settlementInvoice.controller = $controllerProvider.register;
            settlementInvoice.directive = $compileProvider.directive;
            settlementInvoice.filter = $filterProvider.register;
            settlementInvoice.factory = $provide.factory;
            settlementInvoice.service = $provide.service;
            settlementInvoice.constant = $provide.constant;
        }]);
    /*定义路由*/
    settlementInvoice.config(['$stateProvider','$couchPotatoProvider', routerFn]);
    return settlementInvoice;

});
















