/**
 * 审批权限配置
 */
define(['../module','config','constants'], function (moduleApp,config) {
    'use strict';
    function approvalConfigurationHandler($http,$$adapter,ApiPath) {
        var searchApprovalConfig=function(keywords, options, pagination){
            console.log('审批权限配置-机构查询');
            var _data={
                "businessType":keywords.businessType||'',
                "centerCode":keywords.centerCode||'',
                "auditType":keywords.auditType||'',
                "pageNo":pagination.pageNo||'',
                "pageSize":pagination.pageSize||''
            };
            config.httpPackage.data = $$adapter.exports('searchApprovalConfig', _data);
            config.httpPackage.url =  ApiPath.api.searchApprovalConfigDto;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('searchApprovalConfig', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var saveApprovalAuto=function(_data, options){
            console.log('审批权限配置-自动审批新增');
            config.httpPackage.data = $$adapter.exports('saveApprovalAuto', _data);
            config.httpPackage.url =  ApiPath.api.saveApprovalAutoData;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('saveApprovalAuto', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var reviseApprovalAuto=function(_data, options){
            console.log('审批权限配置-自动审批修改');
            config.httpPackage.data = $$adapter.exports('reviseApprovalAuto', _data);
            config.httpPackage.url =  ApiPath.api.reviseApprovalAutoData;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('reviseApprovalAuto', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var saveManualApproval=function(_data, options){
            console.log('审批权限配置-手动审批新增');
            config.httpPackage.data = $$adapter.exports('saveManualApproval', _data);
            config.httpPackage.url =  ApiPath.api.saveManualApprovalData;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('saveManualApproval', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var reviseApprovalManual=function(_data, options){
            console.log('审批权限配置-手动审批修改');
            config.httpPackage.data = $$adapter.exports('reviseApprovalManual', _data);
            config.httpPackage.url =  ApiPath.api.reviseApprovalManualData;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('reviseApprovalManual', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var deleteApproval=function(_data, options){
            console.log('审批权限配置-删除');
            config.httpPackage.data = $$adapter.exports('deleteApproval', _data);
            config.httpPackage.url =  ApiPath.api.deleteApprovalData;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('deleteApproval', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var approvalConfig = function () {
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
            this.paginationA = {
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
            //下拉切换条件
            this.orgCondition = {
                "approvalFlag":"01"
            };
            //自动审批
            this.autoApprovalDto= {};
            this.autoApprovalList = [];
            //手动审批
            this.manualApprovalDto= {};
        };
        return {
            searchApprovalConfig: function (keywords, options, pagination) {
                return searchApprovalConfig(keywords, options, pagination)
            },
            saveApprovalAuto:function(_data,options) {
                return saveApprovalAuto(_data, options)
            },
            reviseApprovalAuto:function(_data,options) {
                return reviseApprovalAuto(_data, options)
            },
            saveManualApproval:function(_data,options) {
                return saveManualApproval(_data, options)
            },
            reviseApprovalManual:function(_data,options) {
                return reviseApprovalManual(_data, options)
            },
            deleteApproval:function(_data,options) {
            return deleteApproval(_data, options)
            },
            approvalConfig:function () {
                return new approvalConfig()
            }
        }
    }
    moduleApp.factory('$$approvalConfiguration',['$http','$$adapter','ApiPath',approvalConfigurationHandler]);
});