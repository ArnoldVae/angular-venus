
/**
 * 联共保结算模块
 */
define([
    'angular'
],function (angular
) {
    'use strict';
    /*路由定义实现方法*/
    var routerFn = function ($stateProvider,$couchPotatoProvider) {
        var userPath = 'components/settlementManage/commonSettle/invoiceInformationQuery';
        $stateProvider

        //联供保结算
            .state('invoiceInformationQuery', {
                url: '/invoiceInformationQuery',
                cache:false,
                multiEditor: {
                    multiple: false,
                    label: '已开发票信息查询'
                },
                resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies([
                        userPath+'/controller/invoiceInformationQuery.ctrl',
                        userPath+'/factory/invoiceInformationQuery'
                    ])
                },
                views: {
                    'main': {
                        templateUrl: userPath+'/tpl/invoiceInformationQuery.tpl.html',
                        controller: 'invoiceInformationQueryCtrl'
                    }
                }
            })



    };

    /*模块定义*/
    var invoiceInformationQuery = angular.module('business.settlementManage.commonSettle.invoiceInformationQuery', []);
    invoiceInformationQuery.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            invoiceInformationQuery.controller = $controllerProvider.register;
            invoiceInformationQuery.directive = $compileProvider.directive;
            invoiceInformationQuery.filter = $filterProvider.register;
            invoiceInformationQuery.factory = $provide.factory;
            invoiceInformationQuery.service = $provide.service;
            invoiceInformationQuery.constant = $provide.constant;
        }]);

    /*定义路由*/
    invoiceInformationQuery.config(['$stateProvider','$couchPotatoProvider', routerFn]);
    return invoiceInformationQuery;
});
