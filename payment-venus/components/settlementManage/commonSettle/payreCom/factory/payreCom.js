/**
 * Created by Administrator on 2017/9/20 0020.
 */
/**
 * 联共保Api
 */
define(['../module','config'], function (moduleApp,config) {
    'use strict';
    function payreComHandler($http,$$adapter, ApiPath) {
        var Payre=function(){
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
                    "payrefnoStart":"",
                    "payrefnoEnd":"",
                    "payrefflag":"",
                    "packagecode":"",
                    "currency":"",
                    "payrefnoLists":"",
                    "itemstatus":"",
                    "centercode":"",
                    "laterMonth":"",
                    "earlierMonth":""
                },
                "queryList":[],//业务单查询结果存储
                "_queryList":[],//存储勾选业务单数据
            }
        }
        /**
         * 共保-结算单查询
         */
        var payreSearch=function(keywords,options,pagination){
            console.log('联共保业务结算单查询');
            var _data={
                "payrefnoStart":keywords.payrefnoStart||'',
                "payrefnoEnd":keywords.payrefnoEnd||'',
                "payrefflag":keywords.payrefflag||'',
                "packagecode":keywords.packagecode||'',
                "currency":keywords.currency||'',
                "payrefnoLists":keywords.payrefnoLists||'',
                "itemstatus":keywords.itemstatus||'',
                "centercode":keywords.centerCode||'',
                "laterMonth":keywords.laterMonth||'',
                "earlierMonth":keywords.earlierMonth||'',
                "pageNo":pagination.pageIndex-1,
                "pageSize":pagination.pageSize||''
            };
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.payreSearch,
                headers: {},
                data: _data
            })
                .success(function (data) {
                    data = $$adapter.imports('payreSearch', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })
        };
        /**
         * 共保-结算单详情
         */
         var payDetail=function(_data,options){
            console.log('结算单详情');
            var _data={
                "payrefno":_data.payrefno||''
            };
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url:ApiPath.api.payComDetail,
                headers: {},
                data: _data
            })
                .success(function (data) {
                    data = $$adapter.imports('taxDetail', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })

        };
        /**
         * 共保-结算单修改
         */
        var payreModify=function(_data,options){
            console.log('结算单修改');
            var _data={
                "payrefno":_data.payrefno||'',
                "attribute1":_data.attribute1||'',
                "attribute2":_data.attribute2||'',
                "accountcode":_data.accountcode||'',
                "accountname":_data.accountname||'',
                "bankname":_data.bankname||'',
                "bankOfProvince":_data.bankOfProvince||'',
                "bankOfCity":_data.bankOfCity||'',
                "attribute3":_data.attribute3||'',
                "accounttype":_data.accounttype||'',
            };
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url:ApiPath.api.payreModify,
                headers: {},
                data: _data
            })
                .success(function (data) {
                    data = $$adapter.imports('payreModify', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })

        };
        /**
         * 结算单支付payrefSubmitData
         */
        var payrefSubmit=function(_data,options){
            console.log('结算单支付');
            var _data={
                "planPayRefNo":_data.planPayRefNo||'',
                "sendPlatform":_data.sendPlatform||'',
                "payRefDate":_data.payRefDate||'',
                "attribute1":_data.attribute1||'',
                "attribute2":_data.attribute2||'',
                "centerCode":_data.centerCode||'',
                "centerCodeName":_data.centerCodeName||'',
                "operateType":_data.operateType||'',
                "payType":_data.payType||'',
                "accountNo": _data.accountNo||'',
                "currency1": _data.currency1||'',
                "planFee": _data.planFee||'',
                "webUserCode": _data.webUserCode||'',
                "webUserName": _data.webUserName||''

            };
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.payrefSubmit,
                headers: {},
                data: _data
            })
                .success(function (data) {
                    data = $$adapter.imports('payrefSubmit', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })
        };
        /**
         * 结算单支付
         */
        var payrefSubmitData=function(_data,options){
            console.log('结算单支付前确认');
            var _data={
                "payrefno":_data.payrefno||'',
                "currency":_data.currency||''
            };
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.payrefSubmitData,
                headers: {},
                data: _data
            })
                .success(function (data) {
                    data = $$adapter.imports('payrefSubmitData', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })
        };
        //收付方式
        var payWaySelect=function(_data,options){
            console.log('收付方式');
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.payWayQuery,
                headers: {},
                data: _data
            })
                .success(function (data) {
                    data = $$adapter.imports('payWayQuery', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        //银行信息
        var confirmBank=function(_data, options){
            console.log('收保费银行信息');
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.confirmBank,
                headers: {},
                data: _data
            })
                .success(function (data) {
                    data = $$adapter.imports('confirmBank', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        }



        return {
            Payre:function(){
                return new Payre()
            },
            payreSearch:function(keywords,options,pagination){
                return payreSearch(keywords,options,pagination);
            },
            payDetail:function(_data,options){
                return payDetail(_data,options);
            },
            payModify:function(_data,options){
                return payreModify(_data,options);
            },
            payrefSubmit:function(_data,options){
                return payrefSubmit(_data,options)
            },
            payrefSubmitData:function(_data,options){
                return payrefSubmitData(_data,options)
            },
            confirmBank:function(_data,options){
                return confirmBank(_data,options)
            },
            payWaySelect:function(_data,options){
                return payWaySelect(_data,options)
            },

        }

    }
    moduleApp.factory('$$payreCom',['$http','$$adapter','ApiPath',payreComHandler]);

});
