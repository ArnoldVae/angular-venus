/**
 * Created on 2017/11/20.
 * 客户化查询
 */
define(['angular'],function (angular) {
    'use strict';
    /*路由定义实现方法*/
    var routerFn = function ($stateProvider,$couchPotatoProvider) {
        var userPath = 'components/PolicyReceipt/queryCustomerInfo';
        $stateProvider
            .state('CustomizedQuery', {
                url: '/CustomizedQuery',
                cache: false,
                multiEditor: {
                    multiple: false,
                    label: '客户收付信息查询'
                },
                resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies([
                        userPath+'/controller/queryCustomerInfo.ctrl',
                        userPath+'/factory/queryCustomerInfo'
                    ])
                },
                views: {
                    'main': {
                        templateUrl: userPath+'/tpl/queryCustomerInfo.tpl.html',
                        controller: 'queryCustomerInfoCtrl'
                    }
                }
            });



    };

    /*模块定义*/
    var queryCustomerInfo = angular.module('business.PolicyReceipt.queryCustomerInfo', []);
    queryCustomerInfo.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            queryCustomerInfo.controller = $controllerProvider.register;
            queryCustomerInfo.directive = $compileProvider.directive;
            queryCustomerInfo.filter = $filterProvider.register;
            queryCustomerInfo.factory = $provide.factory;
            queryCustomerInfo.service = $provide.service;
            queryCustomerInfo.constant = $provide.constant;
        }]);

    /*定义路由*/
    queryCustomerInfo.config(['$stateProvider','$couchPotatoProvider', routerFn]);
    return queryCustomerInfo;
});
