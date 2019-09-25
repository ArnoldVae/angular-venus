/**
 * 查询统计-日结信息查询
 */
define(['angular'],function (angular) {
    'use strict';
    /*路由定义实现方法*/
    var routerFn = function ($stateProvider,$couchPotatoProvider) {
        var userPath = 'components/statistics/diurnalInformationQuery';
        $stateProvider

            //税务报表查询
            .state('diurnalInformationQuery', {
                url: '/diurnalInformationQuery',
                cache:false,
                multiEditor:{
                    multiple:false,
                    label:'日结信息查询'
                },
                resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies([
                        userPath+'/controller/diurnalInformationQuery.ctrl',
                        userPath+'/factory/diurnalInformationQuery'
                    ])
                },
                views: {
                    'main': {
                        templateUrl: userPath+'/tpl/diurnalInformationQuery.tpl.html',
                        controller: 'DiurnalInformationQueryCtrl'
                    }
                }
            });

    };

    /*模块定义*/
    var diurnalInformationQuery = angular.module('business.statistics.diurnalInformationQuery', []);
    diurnalInformationQuery.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            diurnalInformationQuery.controller = $controllerProvider.register;
            diurnalInformationQuery.directive = $compileProvider.directive;
            diurnalInformationQuery.filter = $filterProvider.register;
            diurnalInformationQuery.factory = $provide.factory;
            diurnalInformationQuery.service = $provide.service;
            diurnalInformationQuery.constant = $provide.constant;
        }]);

    /*定义路由*/
    diurnalInformationQuery.config(['$stateProvider','$couchPotatoProvider', routerFn]);
    return diurnalInformationQuery;
});