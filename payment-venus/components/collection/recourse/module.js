/**
 * 追偿款处理
 */
define(['angular'],function (angular) {
    'use strict';
    /*路由定义实现方法*/
    var routerFn = function ($stateProvider,$couchPotatoProvider) {
        var userPath = 'components/collection/recourse';
        $stateProvider

        //日结
            .state('recourse', {
                url: '/recourse',
                cache:false,
                multiEditor: {
                    multiple: false,
                    label: '追偿款处理'
                },
                resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies([
                        userPath+'/controller/recourse.ctrl',
                        userPath+'/factory/recourse.serv'
                    ])
                },
                views: {
                    'main': {
                        templateUrl: userPath+'/tpl/recourse.tpl.html',
                        controller: 'recourseCtrl'
                    }
                }
            });

    };

    /*模块定义*/
    var recourse = angular.module('business.collection.recourse', []);
    recourse.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            recourse.controller = $controllerProvider.register;
            recourse.directive = $compileProvider.directive;
            recourse.filter = $filterProvider.register;
            recourse.factory = $provide.factory;
            recourse.service = $provide.service;
            recourse.constant = $provide.constant;
        }]);

    /*定义路由*/
    recourse.config(['$stateProvider','$couchPotatoProvider', routerFn]);
    return recourse;
});





