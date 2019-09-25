/**
 * 收款管理-认领确认模块
 */
define(['angular'],function (angular) {
    'use strict';
    /*路由定义实现方法*/
    var routerFn = function ($stateProvider,$couchPotatoProvider) {
        var userPath = 'components/collection/claimChange';
        $stateProvider

            //认领确认
            .state('claimChange', {
                url: '/claimChange',
                cache:false,
                multiEditor: {
                    multiple: false,
                    label: '认领变更'
                },
                resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies([
                        userPath+'/controller/claimChange.ctrl',
                        userPath+'/factory/claimChange'
                    ])
                },
                views: {
                    'main': {
                        templateUrl: userPath+'/tpl/claimChange.tpl.html',
                        controller: 'ClaimChangeCtrl'
                    }
                }
            });

    };

    /*模块定义*/
    var claimChange = angular.module('business.collection.claimChange', []);
    claimChange.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            claimChange.controller = $controllerProvider.register;
            claimChange.directive = $compileProvider.directive;
            claimChange.filter = $filterProvider.register;
            claimChange.factory = $provide.factory;
            claimChange.service = $provide.service;
            claimChange.constant = $provide.constant;
        }]);

    /*定义路由*/
    claimChange.config(['$stateProvider','$couchPotatoProvider', routerFn]);
    return claimChange;
});










