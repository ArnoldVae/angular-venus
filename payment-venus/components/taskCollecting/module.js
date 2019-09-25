/**
 * 代收代付任务管理
 */
define([
    'angular',
    'components/taskCollecting/collectingApplication/module',
    'components/taskCollecting/collectingRevocation/module'
],function (angular) {
    'use strict';
    /*清分异常处理*/
    return angular.module('business.taskCollecting', [
        'business.taskCollecting.collectingApplication',
        'business.taskCollecting.collectingRevocation'
    ])

});
