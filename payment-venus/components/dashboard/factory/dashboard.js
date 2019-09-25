/**
 *工作台api
 */
define(['../module','config'], function (moduleApp,config) {
    'use strict';
    function dashboardHandler($http,$$adapter,ApiPath) {
        console.log('到账确认api');
        var dashboard=function(){
            // 分页信息
            this.pagination={
                totalItems:'',//总数
                pageIndex:'1',//当前页面
                pageSize:'15',//显示条数
                maxSize:'5',//最大页数
                numPages:'',//共有多少页
                previousText: config.pagination.previousText,
                nextText: config.pagination.nextText,
                firstText: config.pagination.firstText,
                lastText: config.pagination.lastText
            };
            // 状态
            this.status={
                "checkedClaimAll":false,//全选flag
                "moreFlag":false//展开高级查询flag
            };
        };
        //工作台-异常信息查询
        var abnormalQuery=function(keywords,options,pagination){
            console.log('工作台-异常信息查询');
            var _data={
                "compensateNo":keywords.compensateNo||''//计算书号/赔案号1
            };
            config.httpPackage.data = $$adapter.exports('abnormal', _data);
            config.httpPackage.url = ApiPath.api.Abnormal;
            $http(config.httpPackage)

                .success(function (data) {
                    data = $$adapter.imports('abnormal', data);
                    if (data && options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })

        };

        //工作台-通知信息查询
        var DailyPaymentQuery=function(keywords,options,pagination){
            console.log('工作台-通知信息查询--日结失败提醒接口');
            var _data={
                "handlerCode":keywords.handlerCode||''//收付员代码
            };
            config.httpPackage.data = $$adapter.exports('queryDailyPaymentList', _data);
            config.httpPackage.url = ApiPath.api.queryDailyPaymentList;
            $http(config.httpPackage)

                .success(function (data) {
                    data = $$adapter.imports('queryDailyPaymentList', data);
                    if (data && options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })

        };

        return {
            abnormalQuery:function(keywords,options,pagination){
              return abnormalQuery(keywords,options,pagination);
            },
            DailyPaymentQuery:function(keywords,options,pagination){
                return DailyPaymentQuery(keywords,options,pagination);
            },
        }
    }
    moduleApp.factory('$$dashboard',['$http','$$adapter','ApiPath', dashboardHandler]);


});
