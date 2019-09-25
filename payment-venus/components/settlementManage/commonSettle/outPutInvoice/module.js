
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
        var userPath = 'components/settlementManage/commonSettle/outPutInvoice';
        $stateProvider

        //联供保结算
            .state('outPutInvoice', {
                url: '/outPutInvoice',
                cache:false,
                multiEditor: {
                    multiple: false,
                    label: '销项开票回写'
                },
                resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies([
                        userPath+'/controller/outPutInvoice.ctrl',
                        userPath+'/factory/outPutInvoice'
                    ])
                },
                views: {
                    'main': {
                        templateUrl: userPath+'/tpl/outPutInvoice.tpl.html',
                        controller: 'outPutInvoiceCtrl'
                    }
                }
            })



    };

    /*模块定义*/
    var outPutInvoice = angular.module('business.settlementManage.commonSettle.outPutInvoice', []);
    outPutInvoice.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            outPutInvoice.controller = $controllerProvider.register;
            outPutInvoice.directive = $compileProvider.directive;
            outPutInvoice.filter = $filterProvider.register;
            outPutInvoice.factory = $provide.factory;
            outPutInvoice.service = $provide.service;
            outPutInvoice.constant = $provide.constant;
        }]);

    /*定义路由*/
    outPutInvoice.config(['$stateProvider','$couchPotatoProvider', routerFn]);
    return outPutInvoice;
});
