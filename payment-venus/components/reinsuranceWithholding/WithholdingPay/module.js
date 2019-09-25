/**
 * Created on 2017/10/25.
 * 再保代扣代缴-代扣代缴实付模块
 */
define(['angular'],function (angular) {
    'use strict';
    /*路由定义实现方法*/
    var routerFn = function ($stateProvider,$couchPotatoProvider) {
        var userPath = 'components/reinsuranceWithholding/WithholdingPay';
        $stateProvider
            .state('WithholdingPay', {
                url: '/WithholdingPay',
                cache: false,
                multiEditor: {
                    multiple: false,
                    label: '代扣代缴实付'
                },
                resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies([
                        userPath+'/controller/WithholdingPay.ctrl',
                        userPath+'/factory/WithholdingPay'
                    ])
                },
                views: {
                    'main': {
                        templateUrl: userPath+'/tpl/WithholdingPay.tpl.html',
                        controller: 'WithholdingPayCtrl'
                    }
                }
            });
    };

    /*模块定义*/
    var WithholdingPay = angular.module('business.reinsuranceWithholding.WithholdingPay', []);
    WithholdingPay.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            WithholdingPay.controller = $controllerProvider.register;
            WithholdingPay.directive = $compileProvider.directive;
            WithholdingPay.filter = $filterProvider.register;
            WithholdingPay.factory = $provide.factory;
            WithholdingPay.service = $provide.service;
            WithholdingPay.constant = $provide.constant;
        }]);

    /*定义路由*/
    WithholdingPay.config(['$stateProvider','$couchPotatoProvider', routerFn]);
    return WithholdingPay;
});

