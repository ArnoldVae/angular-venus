/**
 * 账户信息修改
 */
define(['../module','config','constants'], function (moduleApp,config) {
    'use strict';
    function accountInfoModificationHandler($http,$$adapter,ApiPath) {
        var saveAccountRevise=function(_data, options){
            console.log('账户信息修改-修改保存');
            config.httpPackage.data = $$adapter.exports('saveAccountRevise', _data);
            config.httpPackage.url =  ApiPath.api.saveAccountReviseData;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('saveAccountRevise', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var searchAccountInfo=function(keywords,options,pagination){
            console.log('账户信息修改-查询');
            var _data={
                "visaserialNo":keywords.visaserialNo||'',
                "policyno":keywords.policyno||'',
                "certiNo":keywords.certiNo||'',
                "bankaccount":keywords.bankaccount||'',
                "appliName":keywords.appliName||'',
                "insuredName":keywords.insuredName||'',
                "flag":keywords.flag||'',
                "globalUserCode":keywords.globalUserCode||'',
                "powerSystemCode":keywords.powerSystemCode||'',
                "taskCode":keywords.taskCode||'',
                "pageNo":pagination.pageNo||'',
                "pageSize":pagination.pageSize||''
            };
            config.httpPackage.data = $$adapter.exports('searchAccountInfo', _data);
            config.httpPackage.url =  ApiPath.api.searchAccountInfoDto;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('searchAccountInfo', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var lookVisaSerialNo=function(_data, options){
            console.log('支付单号详情查看');
            config.httpPackage.data = $$adapter.exports('lookVisaSerialNo', _data);
            config.httpPackage.url =  ApiPath.api.lookVisaSerialNoDto;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('lookVisaSerialNo', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var accountInfoModification = function () {
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
            this.accountInfoCondition = {
                "taskCode":"payment.unionpay.accountinfo"
            };
            this.accountInfoList = [];
            this.moreFlag = false;
        };
        return {
            saveAccountRevise:function(_data,options) {
                return saveAccountRevise(_data, options)
            },
            searchAccountInfo:function(keywords,options,pagination) {
                return searchAccountInfo(keywords,options,pagination)
            },
            lookVisaSerialNo:function(_data,options) {
                return lookVisaSerialNo(_data, options)
            },
            accountInfoModification:function () {
                return new accountInfoModification()
            }
        }
    }
    moduleApp.factory('$$accountInfoModification',['$http','$$adapter','ApiPath',accountInfoModificationHandler]);
});