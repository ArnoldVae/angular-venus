/**
 * Created by martin on 2017/4/13.
 * 收款-凭证确认模块
 */
define([
    'angular',
    'config',
    './factory/collection.voucher'
],function (
    angular,
    config,
    voucherHandler
) {
    'use strict';
    /*清分异常处理*/
    return angular.module('business.collection.voucher', [])

        .factory('$$voucher',voucherHandler)

});


