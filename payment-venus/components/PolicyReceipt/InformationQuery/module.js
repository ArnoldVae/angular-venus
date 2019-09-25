/**
 * Created on 2017/11/19.
 * 保单收付信息查询
 */
define(['angular'],function (angular) {
    'use strict';
    /*路由定义实现方法*/
    var routerFn = function ($stateProvider,$couchPotatoProvider) {
        var userPath = 'components/PolicyReceipt/InformationQuery';
        $stateProvider
            .state('InformationQuery', {
                url: '/InformationQuery',
                cache: false,
                multiEditor: {
                    multiple: false,
                    label: '保单收付信息查询'
                },
                resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies([
                        userPath+'/controller/InformationQuery.ctrl',
                        userPath+'/factory/InformationQuery'
                    ])
                },
                views: {
                    'main': {
                        templateUrl: userPath+'/tpl/InformationQuery.tpl.html',
                        controller: 'InformationQueryCtrl'
                    }
                }
            });



    };

    /*模块定义*/
    var InformationQuery = angular.module('business.PolicyReceipt.InformationQuery', []);
    InformationQuery.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            InformationQuery.controller = $controllerProvider.register;
            InformationQuery.directive = $compileProvider.directive;
            InformationQuery.filter = $filterProvider.register;
            InformationQuery.factory = $provide.factory;
            InformationQuery.service = $provide.service;
            InformationQuery.constant = $provide.constant;
        }]);

    /*定义路由*/
    InformationQuery.config(['$stateProvider','$couchPotatoProvider', routerFn]);
    return InformationQuery;
});
