/**
 * 红冲处理
 */
define([
    'angular',
    'components/redFlush/redFlushBusinessInf/module',
],function (angular) {
    'use strict';
    /*清分异常处理*/
    return angular.module('business.redFlushing', [
        'business.redFlush.redFlushBusinessInf',
    ])

});