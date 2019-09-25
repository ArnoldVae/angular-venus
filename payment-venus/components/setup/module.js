/**
 * 设置模块
 */
define([
    'angular',
    'components/setup/systemBasic/module',
],function (angular) {
    'use strict';
    return angular.module('business.setup', [
        'business.setup.systemBasic',
    ])

});
