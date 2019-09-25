/**
 * 收付员日结
 */
define(['angular'],function (angular) {
    'use strict';
    /*路由定义实现方法*/
    var routerFn = function ($stateProvider,$couchPotatoProvider) {
        var userPath = 'components/tellerDaily';
        $stateProvider

        //日结
            .state('tellerDaily', {
                url: '/tellerDaily',
                cache:false,
                multiEditor: {
                    multiple: false,
                    label: '收付员日结'
                },
                resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies([
                        userPath+'/controller/tellerDaily.ctrl',
                        userPath+'/factory/tellerDaily.serv'
                    ])
                },
                views: {
                    'main': {
                        templateUrl: userPath+'/tpl/tellerDaily.tpl.html',
                        controller: 'tellerDailyCtrl'
                    }
                },
                data:{
                    css:'css/daily.css'
                }
            });

    };

    /*模块定义*/
    var tellerDaily = angular.module('business.tellerDaily', []);
    tellerDaily.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            tellerDaily.controller = $controllerProvider.register;
            tellerDaily.directive = $compileProvider.directive;
            tellerDaily.filter = $filterProvider.register;
            tellerDaily.factory = $provide.factory;
            tellerDaily.service = $provide.service;
            tellerDaily.constant = $provide.constant;
        }]);

    /*定义路由*/
    tellerDaily.config(['$stateProvider','$couchPotatoProvider', routerFn]);
    return tellerDaily;
});