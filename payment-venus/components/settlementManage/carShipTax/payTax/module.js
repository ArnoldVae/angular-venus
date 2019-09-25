/**
 * Created by Administrator on 2017/5/8 0008.
 */
/**
 * Created by martin on 2017/4/13.
 * 会计引擎主页模块
 */
define([ 'angular'],function (angular, config, payTaxHandler) {
    'use strict';
    /*路由定义实现方法*/
    var routerFn = function ($stateProvider,$couchPotatoProvider) {
        var userPath = 'components/settlementManage/carShipTax/payTax';
        $stateProvider

            //联供保结算
            .state('payTax', {
                url: '/payTax',
                cache:false,
                multiEditor: {
                    multiple: false,
                    label: '结缴单管理'
                },
                resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies([
                        userPath+'/controller/carShipTax.payTax.ctrl',
                        userPath+'/factory/carShipTax.payTax'
                    ])
                },
                views: {
                    'main': {
                        templateUrl: userPath+'/tpl/carShipTax.payTax.tpl.html',
                        controller: 'CarShipTaxpayTaxCtrl'
                    }
                }
            });

    };

    /*模块定义*/
    var payTax = angular.module('business.settlementManage.carShipTax.payTax', []);
    payTax.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            payTax.controller = $controllerProvider.register;
            payTax.directive = $compileProvider.directive;
            payTax.filter = $filterProvider.register;
            payTax.factory = $provide.factory;
            payTax.service = $provide.service;
            payTax.constant = $provide.constant;
        }]);

    /*定义路由*/
    payTax.config(['$stateProvider','$couchPotatoProvider', routerFn]);
    return payTax;
});
