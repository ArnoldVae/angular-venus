/**
 * 批量收款-批量收款查询
 */
define(['angular'],function (angular) {
    'use strict';
    /*路由定义实现方法*/
    var routerFn = function ($stateProvider,$couchPotatoProvider) {
        var userPath = 'components/collection/batchCollectionSearch';
        $stateProvider

        //银行流水导入
            .state('batchCollectionSearch', {
                url: '/batchCollectionSearch',
                cache:false,
                multiEditor:{
                    multiple:false,
                    label:'批量收款查询'
                },
                resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies([
                        userPath+'/controller/batchCollectionSearch.ctrl',
                        userPath+'/factory/batchCollectionSearch'
                    ])
                },
                views: {
                    'main': {
                        templateUrl: userPath+'/tpl/batchCollectionSearch.tpl.html',
                        controller: 'BatchCollectionSearchCtrl'
                    }
                }
            });

    };

    /*模块定义*/
    var batchCollectionSearch = angular.module('business.collection.batchCollectionSearch', []);
    batchCollectionSearch.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            batchCollectionSearch.controller = $controllerProvider.register;
            batchCollectionSearch.directive = $compileProvider.directive;
            batchCollectionSearch.filter = $filterProvider.register;
            batchCollectionSearch.factory = $provide.factory;
            batchCollectionSearch.service = $provide.service;
            batchCollectionSearch.constant = $provide.constant;
        }]);

    /*定义路由*/
    batchCollectionSearch.config(['$stateProvider','$couchPotatoProvider', routerFn]);
    return batchCollectionSearch;
});










