/**
 * 税金复核模块
 */
define(['../module','config', 'constants'], function (moduleApp,config,constants) {
    'use strict';
    function paymentTaxCheckHandler($http,$$adapter,ApiPath) {
        console.log('税金复核模块api...');
        angular.extend(constants.TARGET, constants.FINDERCONFIG.TARGET);
        var reviewTaxCheckData=function(_data, options){
            console.log('税金复核');
            config.httpPackage.data = $$adapter.exports("reviewTaxCheckData", _data);
            config.httpPackage.url =  ApiPath.api.reviewTaxCheckDto;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('reviewTaxCheckData', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var paymentTaxCheck = function () {
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
            this.taxCheckDto = {
                "visaSerialNo": "",
                "commisionType":"0"
            };
            this.taxCheckCondition = {};
            this.saveFeeDto={};//存储本次实付合计与代扣税金合计
        };
        return {
            reviewTaxCheckData:function(_data,options,keywords) {
                return reviewTaxCheckData(_data, options,keywords)
            },
            paymentTaxCheck:function () {
              return new paymentTaxCheck()
            },
            find: function (target, keywords, options,pagination) {
                if(target==constants.TARGET.SEARCHTAXCHECK){
                    console.log('税金复核查询');
                    var _data={
                        "visaSerialNo":keywords.visaSerialNo||'',
                        "commisionType":keywords.commisionType||'',
                        "pageNo":pagination.pageNo||'',
                        "pageSize":pagination.pageSize||'',
                        "webUserCode":keywords.webUserCode||'',//当前登录人代码
                        "webComCode":keywords.webComCode||'',//当前登录机构代码
                        "webCenterCode":keywords.webCenterCode||'',//当前核算单位代码
                        "webTaskCode":'payment.paymanager.commission.taxcheck'//当前操作菜单代码
                    };
                    config.httpPackage.data = $$adapter.exports(constants.TARGET.SEARCHTAXCHECK, _data);
                    config.httpPackage.url =  ApiPath.api.searchTaxCheckDto;
                    $http(config.httpPackage)
                        .success(function (data) {
                            data = $$adapter.imports(constants.TARGET.SEARCHTAXCHECK, data);
                            if (options && options.success && typeof(options.success) == 'function')
                                options.success(data);
                        })
                        .error(function (e, code) {
                            if (options && options.error && typeof(options.error) == 'function')
                                options.error(e);
                        })
                }
            }
        }
    }
    moduleApp.factory('$$paymentTaxCheck',['$http','$$adapter','ApiPath',paymentTaxCheckHandler]);
});