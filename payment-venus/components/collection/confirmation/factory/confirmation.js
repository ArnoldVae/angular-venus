/**
 *到账确认api
 */

define(['../module','config'], function (moduleApp,config) {
    'use strict';
    function confirmationHandler($http,$$adapter,ApiPath) {
        console.log('到账确认api');
        var confirmQuery=function(keywords,options,pagination){
            console.log('到款确认查询');
            var _data={
                "transactionNo":keywords.transactionNo||'',
                "transactionNoList":keywords.transactionNoList||'',
                "certiNoList":keywords.certiNoList||'',
                "certiNo":keywords.certino||'',
                "branchCode":keywords.branchCode||'',
                "webComCode":keywords.webComCode||'',
                "operatorName":keywords.operatorName||'',
                "endDate":keywords.endDate||'',
                "inputDate":keywords.inputDate||'',
                "pageNo":pagination.pageIndex-1,
                "pageSize":pagination.pageSize||''
            };
            _data = $$adapter.exports('confirmQuery', _data);
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.confirmQuery,
                headers: {},
                data: _data
            })
                .success(function (data) {
                    data = $$adapter.imports('confirmQuery', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })

        }
        var Account=function(){
            this.infoToView={
                "checkStatus":{
                    "checkedAccountAll":false
                },
                "pagination":{
                    totalItems:'',//总数
                    pageIndex:1,//当前页面
                    pageSize:'15',//显示条数
                    maxSize:'3',//最大页数
                    numPages:'',//共有多少页
                    previousText: config.pagination.previousText,
                    nextText: config.pagination.nextText,
                    firstText: config.pagination.firstText,
                    lastText: config.pagination.lastText
                },
                "confirmList":[],//存储多有数据
                "moreFlag":false,//更多显示标志
                "checkedConfirmList":[],//存取查询结果数组
                //收保费查询条件
                "confirmQuery":{
                    "businessNo":'',//业务号
                    "businessNos":'',//业务号清单
                    "paymentBillNo":'',//缴费通知单号
                    "paymentBillNos":'',//缴费通知单号清单
                    "operator":'',//业务员
                    "businessName":'',//业务部门
                    "businessType":'',//业务类型
                    "startDate":'',//签单起始日期
                    "endDate":''//签单终止日期
                }
            }
        };
        //提交信息
        var submitDetail=function(_data,options){
            console.log('提交信息');
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.submitDetail,
                headers: {},
                data: _data
            })
                .success(function (data) {
                    data = $$adapter.imports('submitDetail', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        //自动到款确认
        var paymentAndSpayCheck=function(_data,options){
            $http({
                method: "GET",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.paymentAndSpayCheck,
                headers: {},
                data: _data
            })
                .success(function (data) {
                    data = $$adapter.imports('paymentAndSpayCheck', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        }
        //提交接口
        var accountSubmit=function(_data, options){
            console.log('收保费到账确认');
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.accountSubmit,
                headers: {},
                data: _data
            })
                .success(function (data) {
                    data = $$adapter.imports('accountSubmit', data);
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
            var _data={
                "centerCode":_data.centerCode||'',
                "currency":_data.currenCY||''
            }
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.confirmBankData,
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
        //收付方式查银行账号
        var queryNoBillBankAcount=function(_data,options){
            var _data={
                "centerCode":_data.centerCode||'',
                "webUserCode":_data.webUserCode||'',
                "currency":_data.currency||''
            };
            config.httpPackage.data= $$adapter.exports('queryBankAcount', _data);
            config.httpPackage.url= ApiPath.api.confirmBank;
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
            //new
            confirmQuery:function(keywords,options,pagination){
              return confirmQuery(keywords,options,pagination);
            },
            Account:function(){
                return new Account()
            },
            accountSubmit:function(_data, options){
                return accountSubmit(_data, options);
            },
            confirmBank:function(_data, options){
                return confirmBank(_data, options)
            },
            submitDetail:function(_data, options){
                return submitDetail(_data, options);
            },
            paymentAndSpayCheck:function(_data, options){
                return paymentAndSpayCheck(_data, options);
            },
            queryNoBillBankAcount:function (_data,options) {
                return queryNoBillBankAcount(_data,options)
            }
        }
    }
    moduleApp.factory('$$confirmation',['$http','$$adapter','ApiPath',confirmationHandler]);

});
