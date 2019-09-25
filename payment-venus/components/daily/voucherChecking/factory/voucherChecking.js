/**
 * Created by DELL on 2017/9/26.
 */
/**
 * 手续费进项发票核心逻辑
 */
define(['../module','config'], function (moduleApp,config) {
    'use strict';
    function voucherCheckingHandler($http,$$adapter,ApiPath) {
        var collectionSearchs=function(keywords,options,pagination){
            var _data={
                "certificateNoStart":keywords.certificateNoStart||"",
                "certificateNoEnd":keywords.certificateNoEnd||"",
                "certificateNoList":keywords.certificateNoList||"",
                "certificateStartDate":keywords.certificateStartDate||"",
                "certificateEndDate":keywords.certificateEndDate||"",
                "certificateType":keywords.certificateType||"",
                "centerCode":keywords.centerCode||"",
                "pageNo":pagination.pageNo||"",
                "pageSize":pagination.pageSize||""

            };
            config.httpPackage.data= $$adapter.exports('queryDailyPaymentCheck', _data);
            config.httpPackage.url= ApiPath.api.queryDailyPaymentCheck;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('queryDailyPaymentCheck', data);
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
                "moreFlag":false,
                "voucherFlag":false,
                "checkSheetFlag":false,
                "fheFlag":true,
                "commonType":"0",
                "accountMenuFlag":'1',
                "claimsType":'0',
                //查询条件
                "checkSheet":{
                    "certificateNoStart":'',
                    "certificateNoEnd":'',
                    "certificateNoList":"",
                    "certificateStartDate":'',
                    "certificateEndDate":'',
                    "certificateType":'',
                    "centerCode":'',
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
                "voucherNo":keywords.voucherNo||'',
                //"pageNo":pagination.pageNo||"",
                //"pageSize":pagination.pageSize||""
            };
            config.httpPackage.data= $$adapter.exports('queryCheckCondition', _data);
            config.httpPackage.url= ApiPath.api.queryCheckCondition;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('queryCheckCondition', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })

        };
        var queryVoucher=function(keywords,options,pagination){
            var _data= keywords;
            //暂时功能
            //var _data = [
            //{
            //    "voucherNo": "V201711031063000002",
            //    "realPayRefNo": "11010011"
            //},
            //{
            //    "voucherNo": "V201711031063000003",
            //    "realPayRefNo": "11010010"
            //}
            //]
            config.httpPackage.data= $$adapter.exports('queryDailyPaymentVoucherCheckD', _data);
            config.httpPackage.url= ApiPath.api.queryDailyPaymentVoucherCheckD;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('queryDailyPaymentVoucherCheckD', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })

        };
        var verifyVoucherNo=function(keywords,options,pagination){
            var _data={
                "approverCode": keywords.usercode||'',
                "voucherNos": keywords.preBillNoList2
            };
            //暂时功能
            //var _data= [V201711031063000002,V201711031063000003]
            config.httpPackage.data= $$adapter.exports('verifyVoucherNo', _data);
            config.httpPackage.url= ApiPath.api.verifyVoucherNo;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('verifyVoucherNo', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })

        };
        var voucherCombine=function(keywords,options,pagination){
            var _data={
                "posFactor": keywords.posFactor||'',
                "userFactor": keywords.userFactor||'',
                "checkReqDtos": keywords.PrpJCommBillDtolist3
                // "checkReqDtos":[
                // {
                //     "voucherNo": "V201711120110000076",
                //     "realPayRefNo": "11010010"
                // },
                // {
                //     "voucherNo": "V201711120110000078",
                //     "realPayRefNo": "11010011"
                // }
                // ]
            };
            config.httpPackage.data= $$adapter.exports('voucherCombine', _data);
            config.httpPackage.url= ApiPath.api.voucherCombine;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('voucherCombine', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })

        };
        var verifyMergeVoucherNo=function(keywords,options,pagination){
            var _data={
                "approverCode": keywords.usercode||'',
                "voucherNos": keywords.preBillNoList4
            };
            //暂时功能
            //var _data= [V201711031063000002,V201711031063000003]
            config.httpPackage.data= $$adapter.exports('verifyMergeVoucherNo', _data);
            config.httpPackage.url= ApiPath.api.verifyMergeVoucherNo;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('verifyMergeVoucherNo', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })

        };
        var cancelMergeVoucherNo=function(keywords,options,pagination){
            var _data= keywords.preBillNoList5;
            //暂时功能
            //var _data= [V201711031063000002,V201711031063000003]
            config.httpPackage.data= $$adapter.exports('cancelMergeVoucherNo', _data);
            config.httpPackage.url= ApiPath.api.cancelMergeVoucherNo;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('cancelMergeVoucherNo', data);
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
            queryVoucher: function (keywords, options, pagination) {
                return queryVoucher(keywords, options, pagination);
            },
            verifyVoucherNo: function (keywords, options, pagination) {
                return verifyVoucherNo(keywords, options, pagination);
            },
            voucherCombine: function (keywords,options,pagination) {
                return voucherCombine(keywords,options,pagination);
            },
            verifyMergeVoucherNo: function (keywords, options, pagination) {
                return verifyMergeVoucherNo(keywords, options, pagination);
            },
            cancelMergeVoucherNo: function (keywords, options, pagination) {
                return cancelMergeVoucherNo(keywords, options, pagination);
            },
        }
    }
    moduleApp.factory('$$voucherCheckingInvoice',['$http','$$adapter','ApiPath',voucherCheckingHandler]);
})