/**
 * 结算单支付确认模块
 */
define(['../module','config'], function (moduleApp,config) {
    'use strict';
    function paymentConfirmHandler($http,$$adapter,ApiPath) {
        console.log('结算单支付确认模块api...');
        var paymentConfirmList=function(keywords, options, pagination){
            console.log('结算单支付确认查询');
            var _data={
                "visaSerialNoStart": keywords.visaSerialNoStart||'',
                "visaSerialNoEnd": keywords.visaSerialNoEnd||'',
                "visaSerialNoList": keywords.visaSerialNoList||'',
                "comCode": keywords.comCode,
                "handler1Code": keywords.handler1Code||'',
                "agentCode": keywords.agentCode||'',
                "businessNature": keywords.businessNature||'',
                "contractNo": keywords.contractNo||'',
                "commisionType": keywords.commisionType||'',
                "pageNo":pagination.pageNo||'',
                "pageSize":pagination.pageSize||'',
                "webUserCode":keywords.webUserCode||'',//当前登录人代码
                "webComCode":keywords.webComCode||'',//当前登录机构代码
                "webCenterCode":keywords.webCenterCode||'',//当前核算单位代码
                "webTaskCode":'payment.paymanager.commission.paymentconfir'//当前操作菜单代码
            };
            config.httpPackage.data = $$adapter.exports('paymentConfirmList', _data);
            config.httpPackage.url =  ApiPath.api.paymentConfirmListDto;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('paymentConfirmList', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var confirmPay=function(_data, options){
            console.log('结算单支付确认-确认通过');
            config.httpPackage.data = $$adapter.exports('confirmPay', _data);
            config.httpPackage.url =  ApiPath.api.confirmPayDto;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('confirmPay', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var failPay=function(_data, options){
            console.log('结算单支付确认-打回');
            config.httpPackage.data = $$adapter.exports('failPay', _data);
            config.httpPackage.url =  ApiPath.api.failPayDto;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('failPay', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var searchContractNoList=function(_data, options){
            console.log('结算单批次号详情查询');
            config.httpPackage.data = $$adapter.exports('searchContractNoList', _data);
            config.httpPackage.url =  ApiPath.api.queryContractNoList;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('searchContractNoList', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var paymentConfirm = function () {
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
            this.paymentConfirmationCondition ={
                "failReason":""
            };
            this.paymentConfirmationList = [];
            this.status = {
                "moreFlag":false,
                "allChecked":false,
                "sumFee":"",
                "taxFee":"",
                "packFee":""
            }
        };
        return {
            paymentConfirmList:function(keywords,options,pagination) {
                return paymentConfirmList(keywords, options,pagination)
            },
            confirmPay:function(_data,options,keywords) {
                return confirmPay(_data, options,keywords)
            },
            failPay:function(_data,options,keywords) {
                return failPay(_data, options,keywords)
            },
            searchContractNoList:function(_data,options) {
                return searchContractNoList(_data, options)
            },
            paymentConfirm:function () {
                return new paymentConfirm();
            }
        }
    }
    moduleApp.factory('$$paymentConfirm',['$http','$$adapter','ApiPath',paymentConfirmHandler]);
});