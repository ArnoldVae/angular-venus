/**
 * 结算管理-再保结算
 */
define(['angular'],function (angular) {
    'use strict';
    /*路由定义实现方法*/
    var routerFn = function ($stateProvider,$couchPotatoProvider) {
        var userPath = 'components/settlementManage/paulSettlement/reinQuery';
        $stateProvider

            //再保结算
            .state('reinQuery', {
                url: '/reinQuery',
                cache:false,
                multiEditor: {
                    multiple: false,
                    label: '结算单查询结算'
                },
                resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies([
                        userPath+'/controller/reinQuery.ctrl',
                        userPath+'/factory/reinQuery'
                    ])
                },
                views: {
                    'main': {
                        templateUrl: userPath+'/tpl/reinQuery.html',
                        controller: 'ReinQueryCtrl'
                    }
                }
            });

    };

    /*模块定义*/
    var reinQuery = angular.module('business.settlementManage.paulSettlement.reinQuery', []);
    reinQuery.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            reinQuery.controller = $controllerProvider.register;
            reinQuery.directive = $compileProvider.directive;
            reinQuery.filter = $filterProvider.register;
            reinQuery.factory = $provide.factory;
            reinQuery.service = $provide.service;
            reinQuery.constant = $provide.constant;
        }]);

    /*定义路由*/
    reinQuery.config(['$stateProvider','$couchPotatoProvider', routerFn]);
    return reinQuery;
});
