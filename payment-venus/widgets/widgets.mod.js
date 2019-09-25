/**
 * 指令模块
 */
/*引入依赖模块的定义文件*/
define([
    'angular',
    'widgets/mc.codes',
    'widgets/mc.selectList',
    'widgets/mc.util',
    'widgets/mc.validator',
    'widgets/mc.date',
    'widgets/mc.checkbox',
    'widgets/mc.buttonGroup',
    'widgets/mc.buttonGroup2',
    'widgets/mc.payment',
    'widgets/mc.multiEditor',
    'widgets/mc.formatSwitch',
    'widgets/mc.filters',
    'widgets/mc.allocation',
    'widgets/mc.multiple',
    'widgets/mc.checkBoxList',
    'widgets/mc.checkInputCut'

],function (angular)
{
    'use strict';
    console.log("load widgets module");

    /*增加模块依赖*/
    return angular.module('widgets', ['mc.codes','mc.selectList','mc.util','mc.validator','mc.date','mc.checkbox', 'mc.buttonGroup', 'mc.okButton','mc.payment','mc.multiEditor','mc.formatSwitch','mc.filters','mc.allocation','mc.multiple','mc.checkBoxList','mc.checkInputCut']);
        // .config(['$httpProvider',function($httpProvider){
        //     $httpProvider.interceptors.push('httpInterceptor');
        // }]);
});