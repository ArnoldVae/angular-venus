/**
 * Created by Administrator on 2017-10-24.
 *运维管理-挂帐管理-应收保费挂帐api
 */
define(['../module','config','constants'], function (moduleApp, config, constants) {
    'use strict';
    function InsuranceReceivablesHandler($http,$$adapter,ApiPath) {
        angular.extend(constants.TARGET, constants.FINDERCONFIG.TARGET);
        /**
         * 应收保费查询
         * @param keywords
         * @param options
         */
        var transaccount=function (keywords,options,pagination) {
            var _data={
                "yearMonth":keywords.yearMonth||'',//日期
                "businessType":keywords.businessType||'',//挂账类型
                //"userCode":keywords.userCode||'',//用户代码
                //"centerCode":keywords.centerCode||'',//机构代码
                //"pageNo":pagination.pageNo||'',
                //"pageSize":pagination.pageSize||'',
            };
            config.httpPackage.data =_data;
            config.httpPackage.url =  ApiPath.api.payRefRecVouToFinance;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('payRefRecVouToFinance', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
            
        };
        /**
         * 应收保费查询详情
         * @param _data
         * @param options
         */
        var transAccVouToFinance=function (keywords,options,pagination) {
            var _data={
                "yearMonth":keywords.yearMonth||'',//日期
                "businessType":keywords.businessType||'',//挂账类型
                //"userCode":keywords.userCode||'',//用户代码
                //"centerCode":keywords.centerCode||'',//机构代码
                //"pageNo":pagination.pageNo||'',
                //"pageSize":pagination.pageSize||'',
            };
            config.httpPackage.data =_data;
            config.httpPackage.url =  ApiPath.api.transAccVouToFinance;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('transAccVouToFinance', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
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
                "tapFlag":1,
                "tapName" : [
                    {
                        'title': '确认类-送财务',
                        'index': '1',
                        'active': true,
                        "btnStyle":{"width":"150px"}
                    },
                    {
                        'title': '结算类-送财务',
                        'index': '2',
                        'active': false,
                        "btnStyle":{"width":"150px"}

                    }
                ],
            }
        };
        return {
            transaccount:function (keywords,options,pagination) {
                return transaccount(keywords,options,pagination)
            },
            transAccVouToFinance:function (keywords,options,pagination) {
              return transAccVouToFinance(keywords,options,pagination)
            },
            Account:function(){
                return new Account()
            },
        }
    }
    moduleApp.factory('$$InsuranceReceivablesend',['$http','$$adapter','ApiPath',InsuranceReceivablesHandler]);
});
