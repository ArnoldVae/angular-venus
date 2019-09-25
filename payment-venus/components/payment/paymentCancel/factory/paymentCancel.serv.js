/**
 * 结算单作废模块
 */
define(['../module','config'], function (moduleApp,config) {
    'use strict';
    function paymentCancelHandler($http,$$adapter,ApiPath) {
        console.log('结算单作废模块api...');
        var searchCancelList=function(keywords, options, pagination){
            console.log('结算单作废查询');
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
                "currency2": keywords.currency2||'',
                "appliName": keywords.appliName||'',
                "insuredName": keywords.insuredName||'',
                "packCode": keywords.packCode||'',
                "packDate": keywords.packDate||'',
                "pageNo":pagination.pageNo||'',
                "pageSize":pagination.pageSize||'',
                "webUserCode":keywords.webUserCode||'',//当前登录人代码
                "webComCode":keywords.webComCode||'',//当前登录机构代码
                "webCenterCode":keywords.webCenterCode||'',//当前核算单位代码
                "webTaskCode":'payment.paymanager.commission.sheetsettlement'//当前操作菜单代码
            };
            config.httpPackage.data = $$adapter.exports('searchCancelList', _data);
            config.httpPackage.url =  ApiPath.api.searchCancelListDto;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('searchCancelList', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var cancelPay=function(_data, options){
            console.log('结算单作废');
            config.httpPackage.data = $$adapter.exports('cancelPay', _data);
            config.httpPackage.url =  ApiPath.api.cancelPayDto;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('cancelPay', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var searchVisaSerialNoList=function(_data, options){
            console.log('结算单详情查询');
            config.httpPackage.data = $$adapter.exports('searchVisaSerialNoList', _data);
            config.httpPackage.url =  ApiPath.api.queryVisaSerialNoList;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('searchVisaSerialNoList', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var paymentCancel = function () {
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
            this.paymentCancelCondition ={};
            this.status = {
                "moreFlag":false,
                "allChecked":false
            };
            this.paymentCancelList = [];
        };
        return {
            searchCancelList:function(keywords,options,pagination) {
                return searchCancelList(keywords, options,pagination)
            },
            cancelPay:function(_data,options,keywords) {
                return cancelPay(_data, options,keywords)
            },
            searchVisaSerialNoList:function(_data,options) {
                return searchVisaSerialNoList(_data, options)
            },
            paymentCancel:function () {
                return new paymentCancel();
            }
        }
    }
    moduleApp.factory('$$paymentCancel',['$http','$$adapter','ApiPath',paymentCancelHandler]);
});