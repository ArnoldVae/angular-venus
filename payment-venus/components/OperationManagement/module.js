/**
 * 运维管理模块（子菜单下数据源信息配置属于————国寿poc）
 */
define([
    'angular',
    'components/OperationManagement/InsuranceReceivables/module',
    'components/OperationManagement/dataConfig/module',
    'components/OperationManagement/sendFinancialMenu/module'
],function (angular) {
    'use strict';
    /*清分异常处理*/
    return angular.module('business.OperationManagement', [
        'business.OperationManagement.InsuranceReceivables',
        'business.OperationManagement.dataConfig',
        'business.OperationManagement.sendFinancialMenu'

    ])

});
