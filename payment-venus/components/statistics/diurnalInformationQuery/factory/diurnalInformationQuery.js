/**
 * Created by DELL on 2017/9/26.
 */
/**
 * 手续费进项发票核心逻辑
 */
define(['../module','config'], function (moduleApp,config) {
    'use strict';
    function dailyQueryHandler($http,$$adapter,ApiPath) {
        var collectionSearchs=function(keywords,options,pagination){
            var _data={
                "pageNo":pagination.pageNo||'',
                "pageSize":pagination.pageSize||'',
                "type":keywords.type||'',
                "payRefCode":keywords.payRefCode||'',
                "currency2":keywords.currency2||'',
                "payRefDate":keywords.payRefDate||'',
                "webUserCode":keywords.webUserCode||'',
                "webComCode":keywords.webComCode||'',
                "webCenterCode":keywords.webCenterCode||'',
                "webTaskCode":keywords.webTaskCode||'',

            };
            config.httpPackage.data= $$adapter.exports('queryGroupByCondition', _data);
            config.httpPackage.url= ApiPath.api.queryGroupByCondition;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('queryGroupByCondition', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })

        };
        var Account=function(){
            this.infoToView={
                "checkStatus":{
                    "checkedAccountAll":false,
                    "checkedClaimAll":false,
                    "checkedCommonAll":false,
                    "checkedChecksAll":false
                },
                "pagination" : {
                    totalItems: '',//总数
                    pageIndex: '1',//当前页面
                    pageSize: '15',//显示条数
                    maxSize: '3',//最大页数
                    numPages: '',//共有多少页
                    previousText: config.pagination.previousText,
                    nextText: config.pagination.nextText,
                    firstText: config.pagination.firstText,
                    lastText: config.pagination.lastText
                },
                "moreFlag":false,//展示更多按钮
                "voucherFlag":false,//展示更多按钮
                "commonType":"0",
                "accountMenuFlag":'1',
                "claimsType":'0',
                //查询条件
                "checkSheet":{
                    "type":'',
                    "payRefCode":'',
                    "payRefDate":"",
                    "currency2":''
                },
                //弹框表格绑定
                "accountRecList":[
                    {
                        "currenCy2":'CNY',
                        "payWay":'01',
                        "accountNo":'',
                        "payrefFee":'',
                        "itemCode":"",
                        "centerCode":'11999000'
                    }
                ],
                //弹框表格绑定初始化
                "accountRecInitList":[
                    {
                        "currenCy2":'CNY',
                        "payWay":'01',
                        "accountNo":'',
                        "itemCode":"",
                        "payrefFee":'',
                        "centerCode":'11999000'
                    }
                ]
            }
        };
        var queryAccMainvoucher=function(keywords,data,options,pagination){
            var _data={
                "pageNo":pagination.pageNo||'',
                "pageSize":pagination.pageSize||'',
                "payRefDate":new Date(data.payRefDate).dateConversion()||'',
                "payRefCode":data.payRefCode||'',
                "currency2":data.currency2||'',
                "webUserCode":keywords.webUserCode||'',
                "webComCode":keywords.webComCode||'',
                "webCenterCode":keywords.webCenterCode||'',
                "webTaskCode":keywords.webTaskCode||'',
            };
            config.httpPackage.data= $$adapter.exports('queryAccMainvoucher', _data);
            config.httpPackage.url= ApiPath.api.queryAccMainvoucher;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('queryAccMainvoucher', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })

        };
        var payLossInfo=function(_data,options){
            var _data=_data;
            config.httpPackage.data= $$adapter.exports('queryDailyPaymentCheckCondition', _data);
            config.httpPackage.url= ApiPath.api.queryDailyPaymentCheckCondition;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('queryDailyPaymentCheckCondition', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })
        };
        //业务信息
        var searchBus=function (_data,options) {
            var _data={
                "no":_data.certificateNo||'',
                "businessType":_data.certificateType||''
            };
            console.log(_data);
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.queryCertinoInfo2,
                headers: {},
                data: _data
            })
                .success(function (data) {
                    data = $$adapter.imports('queryCertinoInfo2', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })
        };
        return {
            collectionSearchs: function (keywords, options, pagination) {
                return collectionSearchs(keywords, options, pagination);
            },
            Account:function(){
                return new Account()
            },
            queryAccMainvoucher: function (keywords,data,options,pagination) {
                return queryAccMainvoucher(keywords,data,options,pagination);
            },
            payLossInfo: function (keywords,options,pagination) {
                return payLossInfo(keywords,options,pagination);
            },
            searchBus:function (_data,options) {
                return searchBus(_data,options)
            }
        }
    }
    moduleApp.factory('$$dailyQueryInvoice',['$http','$$adapter','ApiPath',dailyQueryHandler]);
})