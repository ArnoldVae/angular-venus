/**
 * 批量收款-批量收款导入
 */
define(['angular'],function (angular) {
    'use strict';
    /*路由定义实现方法*/
    var routerFn = function ($stateProvider,$couchPotatoProvider) {
        var userPath = 'components/collection/batchCollectionImport';
        $stateProvider

        //银行流水导入
            .state('batchCollectionImport', {
                url: '/batchCollectionImport',
                cache:false,
                multiEditor:{
                    multiple:false,
                    label:'批量收款导入'
                },
                resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies([
                        userPath+'/controller/batchCollectionImport.ctrl',
                        userPath+'/factory/batchCollectionImport'
                    ])
                },
                views: {
                    'main': {
                        templateUrl: userPath+'/tpl/batchCollectionImport.tpl.html',
                        controller: 'BatchCollectionImportCtrl'
                    }
                }
            });

    };

    /*模块定义*/
    var batchCollectionImport = angular.module('business.collection.batchCollectionImport', []);
    batchCollectionImport.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            batchCollectionImport.controller = $controllerProvider.register;
            batchCollectionImport.directive = $compileProvider.directive;
            batchCollectionImport.filter = $filterProvider.register;
            batchCollectionImport.factory = $provide.factory;
            batchCollectionImport.service = $provide.service;
            batchCollectionImport.constant = $provide.constant;
        }]);

    /*定义路由*/
    batchCollectionImport.config(['$stateProvider','$couchPotatoProvider', routerFn]);
    return batchCollectionImport;
});










