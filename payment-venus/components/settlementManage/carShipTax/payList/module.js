/**
 * Created by Administrator on 2017/5/8 0008.
 */


define([
   'angular'
],function (
    angular,
    config,
    payListHandler
) {
    'use strict';
    /*路由定义实现方法*/
    var routerFn = function ($stateProvider,$couchPotatoProvider) {
        var userPath = 'components/settlementManage/carShipTax/payList';
        $stateProvider

            .state('payList', {
                url: '/payList',
                cache:false,
                multiEditor: {
                    multiple: false,
                    label: '生成结缴单'
                },
                resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies([
                        userPath+'/controller/carShipTax.payList.ctrl',
                        userPath+'/factory/carShipTax.payList'
                    ])
                },
                views: {
                    'main': {
                        templateUrl: userPath+'/tpl/carShipTax.payList.tpl.html',
                        controller: 'CarShipTaxpayListCtrl'
                    }
                },
                data:{
                    css:'css/accountingEngine.css'
                }
            })

    };

    /*模块定义*/
    var payList = angular.module('business.settlementManage.carShipTax.payList', []);
    payList.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            payList.controller = $controllerProvider.register;
            payList.directive = $compileProvider.directive;
            payList.filter = $filterProvider.register;
            payList.factory = $provide.factory;
            payList.service = $provide.service;
            payList.constant = $provide.constant;
        }]);

    /*定义路由*/
    payList.config(['$stateProvider','$couchPotatoProvider', routerFn]);
    return payList;
});

