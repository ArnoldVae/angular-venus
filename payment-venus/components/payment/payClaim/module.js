/**
 * Created by martin on 2017/4/13.
 * 付款-付赔款模块
 */
define(['angular'],function (angular) {
    'use strict';
    /*路由定义实现方法*/
    var routerFn = function ($stateProvider,$couchPotatoProvider) {
        var userPath = 'components/payment/payClaim';
        $stateProvider

            .state('payClaim', {
                url: '/payClaim',
                cache: false,
                multiEditor: {
                    multiple: false,
                    label: '付赔款'
                },
                resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies([
                        userPath+'/controller/payClaim.ctrl',
                        userPath+'/factory/payClaim'
                    ])
                },
                // data: {
                //     css: 'css/commonList.css'
                // },
                views: {
                    'main': {
                        templateUrl: userPath+'/tpl/payClaim.tpl.html',
                        controller: 'PayClaimCtrl'
                    }
                }
            });



    };

    /*模块定义*/
    var payClaim = angular.module('business.payment.payClaim', []);
    payClaim.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            payClaim.controller = $controllerProvider.register;
            payClaim.directive = $compileProvider.directive;
            payClaim.filter = $filterProvider.register;
            payClaim.factory = $provide.factory;
            payClaim.service = $provide.service;
            payClaim.constant = $provide.constant;
        }]);

    /*定义路由*/
    payClaim.config(['$stateProvider','$couchPotatoProvider', routerFn]);
    return payClaim;
});














