/**
 * Created by Administrator on 2017/9/20 0020.
 */
/**
 * 再保模块
 */
define([
    'components/settlementManage/paulSettlement/reinQuery/module',
    'components/settlementManage/paulSettlement/reinCreate/module'
],function () {
    'use strict';
    /*清分异常处理*/
    return angular.module('business.settlementManage.paulSettlement', [
        'business.settlementManage.paulSettlement.reinQuery',
        'business.settlementManage.paulSettlement.reinCreate'
    ])

});