/**
 * 交易失败结算单查询及支付申请模块
 */
define(['../module','config'], function (moduleApp,config) {
    'use strict';
    function paymentReapplyHandler($http,$$adapter,ApiPath) {
        console.log('交易失败结算单查询及支付申请模块api...');
        var searchReapplyList=function(keywords, options, pagination){
            console.log('交易失败结算单查询');
            var _data={
                "visaSerialNo": keywords.visaSerialNo||'',
                "commisionType": keywords.commisionType||'',
                "comCode": keywords.comCode,
                "agentCode": keywords.agentCode||'',
                "pageNo":pagination.pageNo||'',
                "pageSize":pagination.pageSize||'',
                "webUserCode":keywords.webUserCode||'',//当前登录人代码
                "webComCode":keywords.webComCode||'',//当前登录机构代码
                "webCenterCode":keywords.webCenterCode||'',//当前核算单位代码
                "webTaskCode":'payment.paymanager.commission.failuresettlement'//当前操作菜单代码
            };
            config.httpPackage.data = $$adapter.exports('searchReapplyList', _data);
            config.httpPackage.url =  ApiPath.api.searchReapplyListDto;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('searchReapplyList', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var payReapply=function(_data, options){
            console.log('交易失败结算单重新申请');
            config.httpPackage.data = $$adapter.exports('payReapply', _data);
            config.httpPackage.url =  ApiPath.api.payReapplyDto;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('payReapply', data);
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
        var paymentReapply =function () {
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
            this.paymentReapplyCondition ={};
            this.status = {
                "allChecked":false,
                "moreFlag":false
            };
            this.paymentReapplyList = [];
        };
        return {
            searchReapplyList:function(keywords,options,pagination) {
                return searchReapplyList(keywords, options,pagination)
            },
            searchVisaSerialNoList:function(_data,options) {
                return searchVisaSerialNoList(_data, options)
            },
            payReapply:function(_data,options,keywords) {
                return payReapply(_data, options,keywords)
            },
            paymentReapply:function () {
                return new paymentReapply();
            }
        }
    }
    moduleApp.factory('$$paymentReapply',['$http','$$adapter','ApiPath',paymentReapplyHandler]);
});