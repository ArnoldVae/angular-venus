/**
 * 银行流水管理模块
 */
define([
    'angular',
    'components/bankManage/bankStatementImport/module',
    'components/bankManage/bankStatementSearch/module',
    'components/bankManage/bankInfoAdditional/module'
],function (angular) {
    'use strict';
    /*清分异常处理*/
    return angular.module('business.bankManage', [
        'business.bankManage.bankStatementImport',
        'business.bankManage.bankStatementSearch',
        'business.bankManage.bankInfoAdditional'
    ])

});
