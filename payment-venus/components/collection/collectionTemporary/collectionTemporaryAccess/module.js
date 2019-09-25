/**
 * 收款管理--暂收款-暂收款存取模块
 */
define(['angular'],function (angular) {
    'use strict';
    /*路由定义实现方法*/
    var routerFn = function ($stateProvider,$couchPotatoProvider) {
        var userPath = 'components/collection/collectionTemporary/collectionTemporaryAccess';
        $stateProvider

            .state('collectionTemporaryAccess', {
                url: '/collectionTemporaryAccess',
                cache:false,
                multiEditor: {
                    multiple: false,
                    label: '手工转无单预收'
                },
                resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies([
                        userPath+'/controller/collectionTemporaryAccess.ctrl',
                        userPath+'/factory/collectionTemporaryAccess'
                    ])
                },
                views: {
                    'main': {
                        templateUrl: userPath+'/tpl/collectionTemporaryAccess.tpl.html',
                        controller: 'CollectionTemporaryAccessCtrl'
                    }
                }
            });

    };

    /*模块定义*/
    var collectionTemporaryAccess = angular.module('business.collection.collectionTemporary.collectionTemporaryAccess', []);
    collectionTemporaryAccess.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            collectionTemporaryAccess.controller = $controllerProvider.register;
            collectionTemporaryAccess.directive = $compileProvider.directive;
            collectionTemporaryAccess.filter = $filterProvider.register;
            collectionTemporaryAccess.factory = $provide.factory;
            collectionTemporaryAccess.service = $provide.service;
            collectionTemporaryAccess.constant = $provide.constant;
        }]);

    /*定义路由*/
    collectionTemporaryAccess.config(['$stateProvider','$couchPotatoProvider', routerFn]);
    return collectionTemporaryAccess;
});










