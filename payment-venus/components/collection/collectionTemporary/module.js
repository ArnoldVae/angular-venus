/**
 * 暂收款模块
 */
define([
    'components/collection/collectionTemporary/collectionTemporaryAccess/module',
],function () {
    'use strict';
    /*清分异常处理*/
    return angular.module('business.collection.collectionTemporary', [
        'business.collection.collectionTemporary.collectionTemporaryAccess',
    ])

});
