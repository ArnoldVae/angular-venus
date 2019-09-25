/**
 * 查询统计-实时查询模块
 */
define(['angular'],function (angular) {
    'use strict';
    /*路由定义实现方法*/
    var routerFn = function ($stateProvider,$couchPotatoProvider) {
        var userPath = 'components/statistics/statisticInstant';
        $stateProvider

            //银行流水导入
            .state('statisticInstant', {
                url: '/statisticInstant',
                cache:false,
                multiEditor: {
                    multiple: false,
                    label: '凭证查询'
                },
                resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies([
                        userPath+'/controller/statistics.statisticInstant.ctrl',
                        userPath+'/factory/statisticInstant'
                    ])
                },
                views: {
                    'main': {
                        templateUrl: userPath+'/tpl/statistics.statisticInstant.tpl.html',
                        controller: 'StatisticInstantCtrl'
                    }
                }
            });

    };

    /*模块定义*/
    var statisticInstant = angular.module('business.statistics.statisticInstant', []);
    statisticInstant.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            statisticInstant.controller = $controllerProvider.register;
            statisticInstant.directive = $compileProvider.directive;
            statisticInstant.filter = $filterProvider.register;
            statisticInstant.factory = $provide.factory;
            statisticInstant.service = $provide.service;
            statisticInstant.constant = $provide.constant;
        }]);

    /*定义路由*/
    statisticInstant.config(['$stateProvider','$couchPotatoProvider', routerFn]);
    return statisticInstant;
});











