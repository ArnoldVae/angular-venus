/**
 * 框架模块总入口
 */
define([
    'angular',
    'frame/authorize/authorize',
    'frame/header/header'
],function (angular) {
    'use strict';
    console.log("load framework module");

    /*增加模块依赖*/
    return angular.module('framework',
        ['venus.user',
        'venus.centerCode'
        ]
    );
});