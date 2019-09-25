/**
 * 保单收付信息查询
 */
define([
    'angular',
    'components/PolicyReceipt/InformationQuery/module',
    'components/PolicyReceipt/queryCustomerInfo/module'
],function (angular) {
    'use strict';
    /*清分异常处理*/
    return angular.module('business.PolicyReceipt', [
        'business.PolicyReceipt.InformationQuery',
        'business.PolicyReceipt.queryCustomerInfo'

    ])

});
