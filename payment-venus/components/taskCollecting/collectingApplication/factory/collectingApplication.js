/**
 * Created by DELL on 2017/9/26.
 */
/**
 * 代收代付申请
 */
define(['../module','config','constants'], function (moduleApp,config,constants) {
    'use strict';
    function collectingApplicationHandler($http,$$adapter,ApiPath) {
        var Account=function(){
            //查询条件--保费查询
            this.premiumQuery={
                "transactionNo":'',
                "transactionNoList":'',
                "currency1":'',
                "comCode":'',
                "handler1Code":'',
                "insuredCode":'',
                "inputDate":'',
                "certiType":'01'
            };
            this.premiumList=[];//储存查出的数据
            //查询条件--手续费查询
            this.serviceQuery={
                "visaSerialNo":"",
                "visaSerialNoList":'',
                "currency1":'',
                "comCode":'',
                "handler1Code":'',
                "insuredCode":'',
                "inputDate":'',
                "certiType":'02'
            };
            this.commBillList=[];//储存查出的数据
            this.status={
                "tapFlag":1,//标签切换
                "moreFlag":false,//高级、普通
                "moreFlagT":false,//高级、普通
                "checkedAccountAll":false,//全选--保费
                "checkedAccountAllT":false,//全选--手续费
                "selectNum":0,
                "selectNumT":0
            };
            //标签切换
            this.tapName = [
                {
                    'title': '保费查询',
                    'index': '1',
                    'active': true,
                    "btnStyle":{"width":"150px"}
                },
                {
                    'title': '手续费查询',
                    'index': '2',
                    'active': false,
                    "btnStyle":{"width":"150px"}

                }
            ];
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
            //分页信息
            this.paginationT = {
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
        };
        //保费、手续费查询
        var searchReparations=function(keywords,options,pagination){
            var _data={
                "pageNo":pagination.pageNo,
                "pageSize":pagination.pageSize||'',
                "webComCode":keywords.webComCode||'',
                "webCenterCode":keywords.webCenterCode||'',
                "webTaskCode":keywords.webTaskCode||'',
                "webUserCode":keywords.webUserCode||'',
                "transactionNo":keywords.transactionNo||'',
                "visaSerialNo":keywords.visaSerialNo||'',
                "visaSerialNoList":keywords.visaSerialNoList||'',
                "comCode":keywords.comCode||'',
                "handler1Code":keywords.handler1Code||'',
                "transactionNoList":keywords.transactionNoList||'',
                "currency1":keywords.currency1||'',
                "insuredCode":keywords.insuredCode||'',
                "inputDate":keywords.inputDate||'',
                "certiType":keywords.certiType||''
            };
            config.httpPackage.data= $$adapter.exports(constants.TARGET.ENTRUSTAPPLYQUERY, _data);
            config.httpPackage.url= ApiPath.api.entrustApplyQuery;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports(constants.TARGET.ENTRUSTAPPLYQUERY, data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })

        };

        //申请登记
        var payLossInfo=function(data,options){
            config.httpPackage.data= $$adapter.exports(constants.TARGET.ENTRUSTAPPLYVIEW, data);
            config.httpPackage.url= ApiPath.api.entrustApplyView;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports(constants.TARGET.ENTRUSTAPPLYVIEW, data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })

        };
        //代收代付申请--详情--确定
        var payLossVerify=function(data,options){
            config.httpPackage.data= $$adapter.exports(constants.TARGET.ENTRUSTAPPLYCONFIRM, data);
            config.httpPackage.url= ApiPath.api.entrustApplyConfirm;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports(constants.TARGET.ENTRUSTAPPLYCONFIRM, data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })

        };

        return {
            searchReparations: function (keywords, options, pagination) {
                return searchReparations(keywords, options, pagination);
            },
            Account:function(){
                return new Account()
            },
            payLossInfo: function (data,options) {
                return payLossInfo(data,options);
            },
            payLossVerify: function (data,options) {
                return payLossVerify(data,options);
            }
        }
    }
    moduleApp.factory('$$collectingInvoice',['$http','$$adapter','ApiPath',collectingApplicationHandler]);
});