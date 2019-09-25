/**
 * 账户校验配置
 */
define(['../module','config','constants'], function (moduleApp,config) {
    'use strict';
    function accountCheckingConfigHandler($http,$$adapter,ApiPath) {
        var queryAccountCheck=function(_data, options){
            console.log('账户校验配置-查询');
            config.httpPackage.data = $$adapter.exports('queryAccountCheck', _data);
            config.httpPackage.url =  ApiPath.api.queryAccountCheckData;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('queryAccountCheck', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var saveAccountCheck=function(_data, options){
            console.log('账户校验配置-保存');
            config.httpPackage.data = $$adapter.exports('saveAccountCheck', _data);
            config.httpPackage.url =  ApiPath.api.saveAccountCheckData;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('saveAccountCheck', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var queryAccountCheckInfo=function(_data, options){
            console.log('账户校验配置-详细信息');
            config.httpPackage.data = $$adapter.exports('queryAccountCheckInfo', _data);
            config.httpPackage.url =  ApiPath.api.queryAccountCheckInfoDto;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('queryAccountCheckInfo', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var changeAccountRule=function (_data,options) {
            var keyWords={"codeType":_data};
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.getCodeListLike,
                headers: {},
                data: keyWords
            })
                .success(function (data) {
                    data = angular.copy($$adapter.imports('getAccountChecking', data));
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })
        };
        var deleteCheck=function(_data, options){
            console.log('账户校验配置-删除');
            config.httpPackage.data = $$adapter.exports('deleteCheck', _data);
            config.httpPackage.url =  ApiPath.api.deleteCheckDto;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('deleteCheck', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var accountCheckingConfig = function () {
            //分页信息
            this.pagination = {
                totalItems: '',//总数
                pageIndex: '1',//当前页面
                pageSize: '15',//显示条数
                maxSize: '5',//最大页数
                numPages: '',//共有多少页
                previousText: '上一页',
                nextText: '下一页',
                firstText: '首页',
                lastText: '末页'
            };
            this.accountCheckDto = {
                "fieldCode":""
            };
            this.accountCheckList = [];
        };
        return {
            queryAccountCheck:function(_data,options) {
                return queryAccountCheck(_data, options)
            },
            saveAccountCheck:function(_data,options) {
                return saveAccountCheck(_data, options)
            },
            queryAccountCheckInfo:function(_data,options) {
                return queryAccountCheckInfo(_data, options)
            },
            changeAccountRule:function(_data,options) {
                return changeAccountRule(_data, options)
            },
            deleteCheck:function(_data,options) {
                return deleteCheck(_data, options)
            },
            accountCheckingConfig:function () {
                return new accountCheckingConfig()
            }
        }
    }
    moduleApp.factory('$$accountCheckingConfig',['$http','$$adapter','ApiPath',accountCheckingConfigHandler]);
});