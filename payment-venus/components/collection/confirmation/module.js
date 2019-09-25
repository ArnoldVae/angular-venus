/**
 * Created by martin on 2017/4/13.
 * 收款-到账模块
 */
define(['angular'],function (angular) {
    'use strict';
    /*路由定义实现方法*/
    var routerFn = function ($stateProvider,$couchPotatoProvider) {
        var userPath = 'components/collection/confirmation';
        $stateProvider

            .state('confirmation', {
                url: '/confirmation',
                cache:false,
                multiEditor: {
                    multiple: false,
                    label: '到款确认'
                },
                resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies([
                        userPath+'/controller/confirmation.ctrl',
                        userPath+'/factory/confirmation'
                    ])
                },
                data:{
                    css:"css/collection.css"
                },
                views: {
                    'main': {
                        templateUrl: userPath+'/tpl/confirmation.tpl.html',
                        controller: 'ConfirmationCtrl'
                    }
                }
            });



    };

    /*模块定义*/
    var confirmation = angular.module('business.collection.confirmation', []);
    confirmation.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            confirmation.controller = $controllerProvider.register;
            confirmation.directive = $compileProvider.directive;
            confirmation.filter = $filterProvider.register;
            confirmation.factory = $provide.factory;
            confirmation.service = $provide.service;
            confirmation.constant = $provide.constant;
        }]);

    /*定义路由*/
    confirmation.config(['$stateProvider','$couchPotatoProvider', routerFn]);
    return confirmation;
});














