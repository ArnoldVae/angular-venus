/**
 * Created by Administrator on 2017/9/20 0020.
 */
/**
 * 联共保Api
 */
define(['../module','config'], function (moduleApp,config) {
    'use strict';
    function batchBlueInvoiceIssued($http,$$adapter, ApiPath) {
        /**
         *导入
         */
        var batchImport=function(keywords,options){
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.batchInvoiceImport,
                headers: {},
                data: keywords
            })
                .success(function (data) {
                    data = $$adapter.imports('batchInvoiceImport', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })
        };
        /**
         *打印申请
         */
        var batchSubmit=function(keywords,options){
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.batchInvoiceSubmit,
                headers: {},
                data: keywords
            })
                .success(function (data) {
                    data = $$adapter.imports('batchInvoiceSubmit', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })
        };

        /**
         * 改变开票对象，信息联动
         */
        var blueChangeInfo=function(_data,options){
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.blueChangeInfomation,
                headers: {},
                data: _data
            })
                .success(function (data) {
                    data = angular.copy($$adapter.imports('blueChangeInfomation', data));
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })
        };
        return{
            batchImport:function(keywords,options){
                return batchImport(keywords,options);
            },
            batchSubmit:function(keywords,options){
                return batchSubmit(keywords,options);
            },
            blueChangeInfo:function(keywords,options){
                return blueChangeInfo(keywords,options);
            }
        }
    }
    moduleApp.factory('$$batchBlueInvoiceIssued',['$http','$$adapter','ApiPath',batchBlueInvoiceIssued]);

});