/**
 * 收付员日结模块
 */
define(['../module','config'], function (moduleApp,config) {
    'use strict';
    function tellerDailyHandler($http,$$adapter,ApiPath) {
        //收付员日结模块api...

        //实例化对象
        var TellerDaily = function () {
            // 分页信息
            this.pagination={
                totalItems:'',//总数
                pageIndex:'1',//当前页面
                pageSize:'2000',//显示条数
                maxSize:'5',//最大页数
                numPages:'',//共有多少页
                previousText: config.pagination.previousText,
                nextText: config.pagination.nextText,
                firstText: config.pagination.firstText,
                lastText: config.pagination.lastText
            };
            var initDate = new Date();
            //默认查询当前日期的日结情况（失败清单上面显示的日历日期）
            this.currentDate = initDate.dateConversion();
            //日历日期初始化
            this.initDate =  initDate.dateConversion();

            this.status = '';//日结单状态

            //日结失败清单
            this.dateErrorCondition = {
                "handlerCode":"",//收付员
                "comCode":"" || '',//归属机构
                "balanceDate":this.currentDate,
                "currency":'',//日结币种
                "operateTime":'',//操作日期
                "status": '4',//日结状态 1初始化 2日结完成 3已取消 4日结失败 5未做日结 6日结中
                "dailyAccount":'',//日结单号
                "pageNo":1,
                "pageSize":2000
            };

            //立即日结
            this.endDayCondition = {
                "handlerCode":"",
                "comCode":"",
                "balanceDate":this.currentDate
            };

            //日结单汇总表
            this.findDailyCondition = {
                "handlerCode":"",
                "currency":"",
                "balanceDate":this.currentDate,
                "dailyAccount":'',//日结单号
                "pageNo":1,
                "pageSize":2000
            };

            //失败清单
            this.dateErrorList = [];

            //汇总加+补充信息
            this.findDaily = {
                dailyPaymentSumDtos:[],
                supInfoList:[],
                debitSupSumAll:"",
                creditSupSumAll:"",
                dailyAccount:""//汇总中获取的日结单号
            }

        };
        var searchDailyInfo=function(_data, options){
            //日结失败清单查询
            config.httpPackage.data = $$adapter.exports('queryDailyPaymentMain', _data);
            config.httpPackage.url =  ApiPath.api.queryDailyPaymentMain;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('queryDailyPaymentMain', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var endDay=function(_data, options){
            //收付员日结-立即日结
            config.httpPackage.data = $$adapter.exports('endDayDto', _data);
            config.httpPackage.url =  ApiPath.api.endDayDto;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('endDayDto', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var cancelDaily=function(_data, options){
            //收付员日结-取消日结
            config.httpPackage.data = $$adapter.exports('cancelDaily', _data);
            config.httpPackage.url =  ApiPath.api.cancelDailyDto;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('cancelDaily', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var initDaily=function(_data, options){
            //收付员日结-日历初始化
            config.httpPackage.data = $$adapter.exports('initDaily', _data);
            config.httpPackage.url =  ApiPath.api.initDailyDto;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('initDaily', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var lookFlow=function(_data, options){
            //收付员日结-查询流水单
            config.httpPackage.data = $$adapter.exports('queryDailyPaymentDetail', _data);
            config.httpPackage.url =  ApiPath.api.queryDailyPaymentDetail;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('queryDailyPaymentDetail', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var findDailyAddtional=function(_data, options){
            //收付员日结-查询汇总+补充资料
            config.httpPackage.data = $$adapter.exports('queryDailyAddtional', _data);
            config.httpPackage.url =  ApiPath.api.queryDailyAddtional;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('queryDailyAddtional', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var exportDailyAddtional=function(_data, options){
            //收付员日结-首页面，汇总信息+补充资料 导出按钮
            config.httpPackage.data = $$adapter.exports('exportDailyAddtional', _data);
            config.httpPackage.url =  ApiPath.api.exportDailyAddtional;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('exportDailyAddtional', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };

        var exportDailyPaymentDetail = function (_data, options) {
            //收付员日结-业务流水清单导出
            config.httpPackage.data = $$adapter.exports('exportDailyPaymentDetail', _data);
            config.httpPackage.url =  ApiPath.api.exportDailyPaymentDetail;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('exportDailyPaymentDetail', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var queryDailyErrorMsg = function (_data, options) {
            //收付员日结-失败清单查看错误日志表信息
            config.httpPackage.data = $$adapter.exports('queryDailyErrorMsg', _data);
            config.httpPackage.url =  ApiPath.api.queryDailyErrorMsg;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('queryDailyErrorMsg', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        return {
            TellerDaily:function(){
                return new TellerDaily();
            },
            searchDailyInfo:function(_data,options,keywords) {
                return searchDailyInfo(_data,options,keywords)
            },
            endDay:function(_data,options,keywords) {
                return endDay(_data,options,keywords)
            },
            cancelDaily:function(_data,options,keywords) {
                return cancelDaily(_data,options,keywords)
            },
            initDaily:function(_data,options,keywords) {
                return initDaily(_data,options,keywords)
            },
            lookFlow:function(_data,options,keywords) {
                return lookFlow(_data,options,keywords)
            },
            findDailyAddtional:function (_data,options,keywords) {
                return findDailyAddtional(_data,options,keywords)
            },
            exportDailyAddtional:function (_data,options,keywords) {
                return exportDailyAddtional(_data,options,keywords)
            },
            exportDailyPaymentDetail:function (_data,options,keywords) {
                return exportDailyPaymentDetail(_data,options,keywords)
            },
            queryDailyErrorMsg:function (_data,options,keywords) {
                return queryDailyErrorMsg(_data,options,keywords)
            }
        }
    }
    moduleApp.factory('$$tellerDaily',['$http','$$adapter','ApiPath',tellerDailyHandler]);
});