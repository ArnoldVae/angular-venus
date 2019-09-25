/**
 * Created by DELL on 2017/9/26.
 */
/**
 * 手续费进项发票核心逻辑
 */
define(['../module','config'], function (moduleApp,config) {
    'use strict';
    function dailyCheckSheetHandler($http,$$adapter,ApiPath) {
        var collectionSearchs=function(keywords,options,pagination){
            var _data={
                "pageNo":pagination.pageNo||'',
                "pageSize":pagination.pageSize||'',
                "handlerCode":keywords.webUserCode||'',
                "comCode":keywords.webComCode||keywords.comCodee||'',
                "balanceDate":keywords.balanceDate||'',
                "currency":keywords.currency||'',
                "operateTime":keywords.operateDate||'',
                "status":keywords.status||'',
                "dailyAccount":keywords.dailyAccount||'',

            };
            config.httpPackage.data= $$adapter.exports('queryDailyPaymentMain', _data);
            config.httpPackage.url= ApiPath.api.queryDailyPaymentMain;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('queryDailyPaymentMain', data);
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
                "checkStatus":{
                    "checkedAccountAll":false,
                    "checkedClaimAll":false,
                    "checkedCommonAll":false,
                    "checkedChecksAll":false
                },
                "commonType":"0",
                "accountMenuFlag":'1',
                "claimsType":'0',
                //查询条件
                "checkSheet":{
                    "webUserCode":'',
                    "webComCode":'',
                    "balanceDate":"",
                    "currency":'',
                    "operateDate":'',
                    "status":'',
                    "dailyAccount":''
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
        var payLossInfo=function(keywords,options,pagination){
            var _data={
                "pageNo":pagination.pageNo||'',
                "pageSize":pagination.pageSize||'',
                "balanceDate":keywords.balanceDate||'',
                "handlerCode":keywords.handlerCode||'',
                "dailyAccount":keywords.dailyAccount||'',
                "currency":keywords.currency||''
            };
            config.httpPackage.data= $$adapter.exports('queryDailyPaymentSum', _data);
            config.httpPackage.url= ApiPath.api.queryDailyPaymentSum;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('queryDailyPaymentSum', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })

        };
        var payLossInfo2=function(keywords,options,pagination){
            var _data={
                "pageNo":pagination.pageNo||'',
                "pageSize":pagination.pageSize||'',
                "balanceDate":keywords.balanceDate||'',
                "handlerCode":keywords.handlerCode||'',
                "dailyAccount":keywords.dailyAccount||'',
                "currency":keywords.currency||''
            };
            config.httpPackage.data= $$adapter.exports('queryDailyAddtional', _data);
            config.httpPackage.url= ApiPath.api.queryDailyAddtional;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('queryDailyAddtional', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })

        };
        var preClaimModify=function(data,keywords,options,pagination){
            var _data={
                "approverCode":data.usercode,
                "dailyAccount":keywords
            }
            config.httpPackage.data= $$adapter.exports('preClaimModify', _data);
            config.httpPackage.url= ApiPath.api.preClaimModify;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('preClaimModify', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })

        };
        var payLossInfo3=function(keywords,options,pagination){
            var _data={
                "pageNo":pagination.pageNo||'',
                "pageSize":pagination.pageSize||'',
                "voucherNo":keywords.voucherNo||'',
            };
            config.httpPackage.data= $$adapter.exports('queryVoucherDetail', _data);
            config.httpPackage.url= ApiPath.api.queryVoucherDetail;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('queryVoucherDetail', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })

        };
        var queryVoucher=function(keywords,options,pagination){
            var _data={
                "pageNo":pagination.pageNo||'',
                "pageSize":pagination.pageSize||'',
                "dailyAccount":keywords.dailyAccount||'',
                //"dailyAccount":'DP2017110500174',

            };
            config.httpPackage.data= $$adapter.exports('QueryVoucherDto', _data);
            config.httpPackage.url= ApiPath.api.QueryVoucherDto;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('QueryVoucherDto', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })

        };
        var queryDailyPaymentDetail=function(keywords,options,pagination){
            var _data={
                "pageNo":pagination.pageNo||'',
                "pageSize":pagination.pageSize||'',
                "dailyAccount":keywords||'',
            };
            config.httpPackage.data= $$adapter.exports('queryDailyPaymentDetail', _data);
            config.httpPackage.url= ApiPath.api.queryDailyPaymentDetail;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('queryDailyPaymentDetail', data);
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
            payLossInfo: function (keywords,options,pagination) {
                return payLossInfo(keywords,options,pagination);
            },
            payLossInfo2: function (keywords,options,pagination) {
                return payLossInfo2(keywords,options,pagination);
            },
            preClaimModify: function (data,keywords,options,pagination) {
                return preClaimModify(data,keywords,options,pagination);
            },
            payLossInfo3: function (keywords,options,pagination) {
                return payLossInfo3(keywords,options,pagination);
            },
            queryVoucher: function (keywords, options, pagination) {
                return queryVoucher(keywords, options, pagination);
            },
            queryDailyPaymentDetail: function (keywords,options,pagination) {
                return queryDailyPaymentDetail(keywords,options,pagination);
            },
        }
    }
    moduleApp.factory('$$dailyCheckSheetInvoice',['$http','$$adapter','ApiPath',dailyCheckSheetHandler]);
})