/**
 * Created by Administrator on 2017/5/8 0008.
 */
/**
 * Created by martin on 2017/4/13.
 * 税务结缴主页模块
 */
define([
    'angular'
],function (angular,
            config,
            settlementHandler
) {
    'use strict';
    /*路由定义实现方法*/
    var routerFn = function ($stateProvider,$couchPotatoProvider) {
        var userPath = 'components/settlementManage/carShipTax/settlement';
        $stateProvider

            //车船税管理
            .state('settlement', {
                url: '/settlement',
                cache:false,
                multiEditor: {
                    multiple: false,
                    label: '税务结缴管理'
                },
                resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies([
                        userPath+'/controller/carShipTax.settlement.ctrl',
                        userPath+'/factory/carShipTax.settlement'
                    ])
                },
                views: {
                    'main': {
                        templateUrl: userPath+'/tpl/carShipTax.settlement.tpl.html',
                        controller: 'CarShipTaxsettlementCtrl'
                    }
                }
            });

    };

    /*模块定义*/
    var settlement = angular.module('business.settlementManage.carShipTax.settlement', []);
    settlement.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            settlement.controller = $controllerProvider.register;
            settlement.directive = $compileProvider.directive;
            settlement.filter = $filterProvider.register;
            settlement.factory = $provide.factory;
            settlement.service = $provide.service;
            settlement.constant = $provide.constant;
        }]);

    /*定义路由*/
    settlement.config(['$stateProvider','$couchPotatoProvider', routerFn]);
    return settlement;
});

