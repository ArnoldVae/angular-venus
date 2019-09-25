/**
 * 收款管理-认领确认模块
 */
define(['angular'],function (angular) {
    'use strict';
    /*路由定义实现方法*/
    var routerFn = function ($stateProvider,$couchPotatoProvider) {
        var userPath = 'components/collection/claimConfirm';
        $stateProvider

            //认领确认
            .state('claimConfirm', {
                url: '/claimConfirm',
                cache:false,
                multiEditor: {
                    multiple: false,
                    label: '认领确认'
                },
                resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies([
                        userPath+'/controller/claimConfirm.ctrl',
                        userPath+'/factory/claimConfirm'
                    ])
                },
                views: {
                    'main': {
                        templateUrl: userPath+'/tpl/claimConfirm.tpl.html',
                        controller: 'ClaimConfirmCtrl'
                    }
                }
            });

    };

    /*模块定义*/
    var claimConfirm = angular.module('business.collection.claimConfirm', []);
    claimConfirm.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            claimConfirm.controller = $controllerProvider.register;
            claimConfirm.directive = $compileProvider.directive;
            claimConfirm.filter = $filterProvider.register;
            claimConfirm.factory = $provide.factory;
            claimConfirm.service = $provide.service;
            claimConfirm.constant = $provide.constant;
        }]);

    /*定义路由*/
    claimConfirm.config(['$stateProvider','$couchPotatoProvider', routerFn]);
    return claimConfirm;
});










