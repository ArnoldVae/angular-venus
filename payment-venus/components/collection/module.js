/**
 * 付款模块
 */
define([
    'angular',
    'components/collection/voucher/module',
    'components/collection/nonFeesCollection/module',
    'components/collection/collectionTemporary/module',
    'components/collection/batchCollectionImport/module',
    'components/collection/batchCollectionSearch/module',
    'components/collection/claimManage/module',
    'components/collection/preClaim/module',
    'components/collection/claimConfirm/module',
    'components/collection/arbitrationManage/module',
    'components/collection/confirmation/module',
    'components/collection/recourse/module',
    'components/collection/claimChange/module'
],function (angular) {
    'use strict';
    /*清分异常处理*/
    return angular.module('business.collection', [
        'business.collection.voucher',
        'business.collection.nonFeesCollection',//非见费业务缴费
        'business.collection.claimManage',
        'business.collection.batchCollectionImport',
        'business.collection.batchCollectionSearch',
        //'business.collection.batchCollectionConfirm'
        'business.collection.collectionTemporary',
        'business.collection.preClaim',//预认领
        'business.collection.claimConfirm',//认领确认
        'business.collection.arbitrationManage',//仲裁管理
        'business.collection.confirmation',
        'business.collection.recourse',//追偿款处理
        'business.collection.claimChange'//认领变更
    ])

});
