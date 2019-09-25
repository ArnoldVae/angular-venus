/**
 *手续费进项发票
 */
define(['angular'],function (angular) {
    'use strict';
    /*路由定义实现方法*/
    var routerFn = function ($stateProvider,$couchPotatoProvider) {
        var userPath = 'components/inputInvoice/feeInputInvoice';
        $stateProvider

            //手续费进项发票
            .state('feeInputInvoice', {
                url: '/feeInputInvoice',
                cache:false,
                multiEditor:{
                    multiple:false,
                    label:'手续费进项发票'
                },
                resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies([
                        userPath+'/controller/feeInputInvoice.ctrl',
                        userPath+'/factory/feeInputInvoice'
                    ])
                },
                views: {
                    'main': {
                        templateUrl: userPath+'/tpl/inputInvoice.html',
                        controller: 'FeeInputInvoiceCtrl'
                    }
                }
            });

    };
    /*模块定义*/
    var feeInputInvoice = angular.module('business.inputInvoice.feeInputInvoice', []);
    feeInputInvoice.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            feeInputInvoice.controller = $controllerProvider.register;
            feeInputInvoice.directive = $compileProvider.directive;
            feeInputInvoice.filter = $filterProvider.register;
            feeInputInvoice.factory = $provide.factory;
            feeInputInvoice.service = $provide.service;
            feeInputInvoice.constant = $provide.constant;
        }]);
    /*定义路由*/
    feeInputInvoice.config(['$stateProvider','$couchPotatoProvider', routerFn]);
    return feeInputInvoice;

});
















