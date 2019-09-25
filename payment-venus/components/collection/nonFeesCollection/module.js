/**
 * Created by martin on 2017/4/13.
 * 付款管理-付款登记模块
 */
define(['angular'],function (angular) {
    'use strict';
    /*路由定义实现方法*/
    var routerFn = function ($stateProvider,$couchPotatoProvider) {
        var userPath = 'components/collection/nonFeesCollection';
        $stateProvider

        //付款登记
            .state('nonFeesCollection', {
                url: '/nonFeesCollection',
                cache:false,
                multiEditor: {
                    multiple: false,
                    label: '签单业务缴费'
                },
                resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies([
                        userPath+'/controller/nonFeesCollection.ctrl',
                        userPath+'/factory/nonFeesCollection'
                    ])
                },
                data:{
                    css: 'css/collection.css'
                },
                views: {
                    'main': {
                        templateUrl: userPath+'/tpl/nonFeesCollection.tpl.html',
                        controller: 'NonFeesCollectionCtrl'
                    }
                }
            });

    };

    /*模块定义*/
    var nonFeesCollection = angular.module('business.collection.nonFeesCollection', []);
    nonFeesCollection.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            nonFeesCollection.controller = $controllerProvider.register;
            nonFeesCollection.directive = $compileProvider.directive;
            nonFeesCollection.filter = $filterProvider.register;
            nonFeesCollection.factory = $provide.factory;
            nonFeesCollection.service = $provide.service;
            nonFeesCollection.constant = $provide.constant;
        }]);

    /*定义路由*/
    nonFeesCollection.config(['$stateProvider','$couchPotatoProvider', routerFn]);
    return nonFeesCollection;
});










