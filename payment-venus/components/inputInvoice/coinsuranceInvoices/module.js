/**
 * 共保进项发票
 */
define(['angular'],function (angular) {
    'use strict';
    /*路由定义实现方法*/
    var routerFn = function ($stateProvider,$couchPotatoProvider) {
        var userPath = 'components/inputInvoice/coinsuranceInvoices';
        $stateProvider

            //手续费进项发票
            .state('coinsuranceInvoices', {
                url: '/coinsuranceInvoices',
                cache:false,
                multiEditor:{
                    multiple:false,
                    label:'共保进项发票'
                },
                resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies([
                        userPath+'/controller/coinsuranceInvoices.ctrl',
                        userPath+'/factory/coinsuranceInvoices'
                    ])
                },
                views: {
                    'main': {
                        templateUrl: userPath+'/tpl/coinsuranceInvoices.html',
                        controller: 'CoinsuranceInvoicesCtrl'
                    }
                }
            });

    };
    /*模块定义*/
    var coinsuranceInvoicesInvoice = angular.module('business.inputInvoice.coinsuranceInvoices', []);
    coinsuranceInvoicesInvoice.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            coinsuranceInvoicesInvoice.controller = $controllerProvider.register;
            coinsuranceInvoicesInvoice.directive = $compileProvider.directive;
            coinsuranceInvoicesInvoice.filter = $filterProvider.register;
            coinsuranceInvoicesInvoice.factory = $provide.factory;
            coinsuranceInvoicesInvoice.service = $provide.service;
            coinsuranceInvoicesInvoice.constant = $provide.constant;
        }]);
    /*定义路由*/
    coinsuranceInvoicesInvoice.config(['$stateProvider','$couchPotatoProvider', routerFn]);
    return coinsuranceInvoicesInvoice;

});



