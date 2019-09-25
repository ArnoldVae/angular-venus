/**
 * Created by Administrator on 2017/5/8 0008.
 */
/**
 * 车船税Api
 */
define(['../module','config'], function (moduleApp,config) {
    'use strict';
    function settlementHandler($http,$$adapter,ApiPath) {
        var Settlement=function(){
            this.infoToView={
                "pagination":{
                    totalItems:'',//总数
                    pageIndex:'1',//当前页面
                    pageSize:'15',//显示条数
                    maxSize:'3',//最大页数
                    numPages:'',//共有多少页
                    previousText: config.pagination.previousText,
                    nextText: config.pagination.nextText,
                    firstText: config.pagination.firstText,
                    lastText: config.pagination.lastText
                },
                "mareFlag":false,//展示更多按钮
                "checkAll":false,//全选标志
                "queryConditions":{ //会计期间查询条件
                    "settlementNo":'',
                    "payrefnoStart":"",
                    "payrefnoEnd":"",
                    "payrefnoLists":"",
                    "currency":"",
                    "centercode":"",
                    "packagecode":"",
                    "earlierMonth":"",
                    "laterMonth":"",
                    "centerflag":"",
                    "flag":"1",
                    "payrefflag":"",
                },
                "queryList":[],//业务单查询结果存储
                "_queryList":[]//存储勾选业务单数据
            }
        }
        /**
         *税务结缴查询
         */

        var settleSearch=function(keywords,options,pagination){
            console.log('税务结缴查询');
            var _data={
                "payrefnoStart":keywords.payrefnoStart||'',
                "payrefnoEnd":keywords.payrefnoEnd||'',
                "payrefnoLists":keywords.payrefnoLists||'',
                "currency":keywords.currency||'',
                "centercode":keywords.centerCode||'',
                "packagecode":keywords.packagecode||'',
                "earlierMonth":keywords.earlierMonth||'',
                "laterMonth":keywords.laterMonth||'',
                "centerflag":keywords.centerflag||'',
                "globalUserCode":keywords.globalUserCode||'',
                "powerSystemCode":keywords.powerSystemCode||'',
                "uploadstatus":keywords.uploadstatus||'',
                "flag":keywords.flag||'',
                "taskCode":"payment.unionpay.appliypayment",
                "pageNo":pagination.pageIndex-1,
                "pageSize":pagination.pageSize||''
            };
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.settlementQuery,
                headers: {},
                data: _data
            })
                .success(function (data) {
                    data = $$adapter.imports('settleSearch', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })
        }
        var settleDetail=function(_data,options){
            console.log('税务结缴详情');
            var _data={
                "payrefno":_data.payrefNo||''
            };
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.settleDetail,
                headers: {},
                data: _data
            })
                .success(function (data) {
                    data = $$adapter.imports('settleDetail', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })
        };
        var settleSubmitDetail=function(_data,options){
            console.log('税务结缴提交信息展示');
            var _data={
                "packagecode": _data.packagecode||'',
                "itemstatus":  _data.itemstatus||'',
                "centerflag":  _data.centerflag||'',
                "payrefnotype":_data.payrefnotype||'',
                "settletimes": _data.settletimes||'',
                "yearMonth": _data.yearMonth||'',
                "flag": _data.flag||'',
                "currency": _data.currency||'',
                "payrefno": _data.payrefno||'',
                "billfee": _data.billfee||'',
                "centercode": _data.centercode||'',
                "attaches": _data.attaches||'',
                "inputdate": _data.inputdate||'',
                "packagedate": _data.packagedate,
                "uploadstatus": _data.uploadstatus||'',
                "packageunit": _data.packageunit||'',
                "payrefflag": _data.payrefflag||'',
                "accountcode":_data.accountcode||'',
                "settlementmode":_data.settlementmode||'',
                "bankName": _data.bankName||''
            };
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.settleSubmitDetail,
                headers: {},
                data: _data
            })
                .success(function (data) {
                    data = $$adapter.imports('settleSubmitDetail', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })
        };
        //收付方式查银行账号
        var queryNoBillBankAcount=function(_data,options){
            var _data={
                "centerCode":_data.centerCode||'',
                "webUserCode":_data.webUserCode||'',
                "currency":_data.currency||''
            };
            config.httpPackage.data= $$adapter.exports('queryBankAcount', _data);
            config.httpPackage.url= ApiPath.api.queryNoBillBankAcount;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('queryBankAcount', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })
        };

        return {
            Settlement:function(){
                return new Settlement()
            },
            settleSearch:function(keywords,options,pagination){
                return settleSearch(keywords,options,pagination);
            },
            settleDetail:function(_data,options){
                return settleDetail(_data,options);
            },
            settleSubmitDetail:function(_data,options){
                return settleSubmitDetail(_data,options);
            },
            queryNoBillBankAcount:function (_data,options) {
                return queryNoBillBankAcount(_data,options)
            }
        }

    }
    moduleApp.factory('$$settlement',['$http','$$adapter','ApiPath',settlementHandler]);

});
