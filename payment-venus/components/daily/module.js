/**
 * 日结管理
 */
define([
    'angular',
    'components/daily/dailyCheckSheet/module',
    'components/daily/dailyQuery/module',
    'components/daily/dailySetUp/module',
    'components/daily/voucherChecking/module'
],function (angular) {
    'use strict';
    /*清分异常处理*/
    return angular.module('business.daily', [
        'business.daily.dailyCheckSheet',
        'business.daily.dailyQuery',
        'business.daily.dailySetUp',
        'business.daily.voucherChecking'
    ])

});