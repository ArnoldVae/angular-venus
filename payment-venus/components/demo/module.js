/**
 * Created by martin on 2017/4/13.
 * 会计引擎模块
 */
define([
    'angular',
    './controller/demo.ctrl',
    './print/printTest.ctrl'

],function (
    angular,
    DemoCtrl,
    PrintCtrl
) {
    'use strict';
    /*清分异常处理*/
    return angular.module('business.demo', [])
        .controller('DemoCtrl',DemoCtrl)
        .controller('PrintCtrl',PrintCtrl)
});