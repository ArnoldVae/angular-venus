/**
 * 收款管理-预认领模块
 */
define(['angular'],function (angular) {
    'use strict';
    /*路由定义实现方法*/
    var routerFn = function ($stateProvider,$couchPotatoProvider) {
        var userPath = 'components/collection/preClaim';
        $stateProvider

            //联供保结算
            .state('preClaim', {
                url: '/preClaim',
                cache:false,
                multiEditor: {
                    multiple: false,
                    label: '预认领'
                },
                resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies([
                        userPath+'/controller/preClaim.ctrl',
                        userPath+'/factory/preClaim'
                    ])
                },
                views: {
                    'main': {
                        templateUrl: userPath+'/tpl/preClaim.tpl.html',
                        controller: 'PreClaimCtrl'
                    }
                }
            });

    };

    /*模块定义*/
    var preClaim = angular.module('business.collection.preClaim', []);
    preClaim.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            preClaim.controller = $controllerProvider.register;
            preClaim.directive = $compileProvider.directive;
            preClaim.filter = $filterProvider.register;
            preClaim.factory = $provide.factory;
            preClaim.service = $provide.service;
            preClaim.constant = $provide.constant;
        }]);

    /*定义路由*/
    preClaim.config(['$stateProvider','$couchPotatoProvider', routerFn]);
    return preClaim;
});










