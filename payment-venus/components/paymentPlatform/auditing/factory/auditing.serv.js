/**
 * 送支付平台审核核心逻辑
 */
define(['../module','config','constants'], function (moduleApp,config,constants) {
    'use strict';
    function auditingHandler($http,$$adapter,ApiPath) {
        angular.extend(constants.TARGET, constants.FINDERCONFIG.TARGET);
        var confirmAudit=function(_data, options, keywords){
            console.log('支付单审批');
            config.httpPackage.data = $$adapter.exports('confirmAudit', _data);
            config.httpPackage.url =  ApiPath.api.confirmAuditDto;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('confirmAudit', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var submitApproved=function(_data, options, keywords){
            console.log('已审批记录查询-推送');
            config.httpPackage.data = $$adapter.exports('submitApproved', _data);
            config.httpPackage.url =  ApiPath.api.submitApprovedData;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('submitApproved', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var lockingAudit=function(_data, options, keywords){
            console.log('支付单锁定与释放');
            config.httpPackage.data = $$adapter.exports('lockingAudit', _data);
            config.httpPackage.url =  ApiPath.api.lockingAuditDto;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('lockingAudit', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var simulationSuccess=function(_data, options, keywords){
            console.log('模拟支付成功');
            config.httpPackage.data = $$adapter.exports('simulationSuccess', _data);
            config.httpPackage.url =  ApiPath.api.simulationSuccessDto;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('simulationSuccess', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var simulationFail=function(_data, options, keywords){
            console.log('模拟退票');
            config.httpPackage.data = $$adapter.exports('simulationFail', _data);
            config.httpPackage.url =  ApiPath.api.simulationFailDto;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('simulationFail', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var lookVisaSerialNo=function(_data, options){
            console.log('支付单号详情查看');
            config.httpPackage.data = $$adapter.exports('lookVisaSerialNo', _data);
            config.httpPackage.url =  ApiPath.api.lookVisaSerialNoDto;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('lookVisaSerialNo', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var auditing = function () {
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
            this.paginationA = {
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
            //待审批对象
            this.paymentPlatformAudit = {
                "businessType":"1",
                "approveStatus":"3"
            };
            this.auditingList = [];
            //已审批对象
            this.approvedCondition = {
                "businessType":"1"
            };
            this.approvedList = [];
            this.tapFlag = '1';
            this.tapName = [
                {
                    'title': '待审批记录查询',
                    'index': '1',
                    'active': true,
                    "btnStyle":{"width":"150px"}
                },
                {
                    'title': '已审批记录查询',
                    'index': '2',
                    'active': false,
                    "btnStyle":{"width":"150px"}
                }
            ];
            this.status = {
                "checkedAll":false,
                "moreFlag":false,
                "moreFlagNew":false
            }
        };
        return {
            confirmAudit:function(_data,options,keywords) {
                return confirmAudit(_data, options,keywords)
            },
            lockingAudit:function(_data,options,keywords) {
                return lockingAudit(_data, options,keywords)
            },
            submitApproved:function(_data,options,keywords) {
                return submitApproved(_data, options,keywords)
            },
            simulationSuccess:function(_data,options,keywords) {
                return simulationSuccess(_data, options,keywords)
            },
            simulationFail:function(_data,options,keywords) {
                return simulationFail(_data, options,keywords)
            },
            lookVisaSerialNo:function(_data,options) {
            return lookVisaSerialNo(_data, options)
            },
            auditing:function () {
                return new auditing()
            },
            find: function (target, keywords, options, pagination) {
                if (target == constants.TARGET.SEARCHAUDITING) {
                    console.log('待审批记录查询');
                    var _data = {
                        "visaSerialNo": keywords.visaSerialNo || '',
                        "annulus": keywords.annulus || '',
                        "businessDepartment": keywords.businessDepartment || '',
                        "businessMember": keywords.businessMember || '',
                        "earlierMonth": keywords.earlierMonth || '',
                        "laterMonth": keywords.laterMonth || '',
                        "approveStatus": keywords.approveStatus || '',
                        "businessType": keywords.businessType || '',
                        "taskName": keywords.taskName || '',
                        "globalUserCode": keywords.globalUserCode || '',
                        "powerSystemCode": keywords.powerSystemCode || '',
                        "taskCode": keywords.taskCode || '',
                        "pageNo": pagination.pageNo || '',
                        "pageSize": pagination.pageSize || '',
                    };
                    config.httpPackage.data = $$adapter.exports(constants.TARGET.SEARCHAUDITING, _data);
                    config.httpPackage.url =  ApiPath.api.searchAuditingDto;
                    $http(config.httpPackage)
                        .success(function (data) {
                            data = $$adapter.imports(constants.TARGET.SEARCHAUDITING, data);
                            if (options && options.success && typeof(options.success) == 'function')
                                options.success(data);
                        })
                        .error(function (e, code) {
                            if (options && options.error && typeof(options.error) == 'function')
                                options.error(e);
                        })
                }
                if (target == constants.TARGET.SEARCHAPPROVED) {
                    console.log('已审批记录查询');
                    var _data = {
                        "visaSerialNo": keywords.visaSerialNo || '',
                        "annulus": keywords.annulus || '',
                        "businessDepartment": keywords.businessDepartment || '',
                        "businessMember": keywords.businessMember || '',
                        "earlierMonth": keywords.earlierMonth || '',
                        "laterMonth": keywords.laterMonth || '',
                        "businessType": keywords.businessType || '',
                        "taskName": keywords.taskName || '',
                        "approveStatus": keywords.approveStatus || '',
                        "globalUserCode": keywords.globalUserCode || '',
                        "powerSystemCode": keywords.powerSystemCode || '',
                        "taskCode": keywords.taskCode || '',
                        "pageNo": pagination.pageNo || '',
                        "pageSize": pagination.pageSize || ''
                    };
                    config.httpPackage.data = $$adapter.exports(constants.TARGET.SEARCHAPPROVED, _data);
                    config.httpPackage.url =  ApiPath.api.searchApprovedDto;
                    $http(config.httpPackage)
                        .success(function (data) {
                            data = $$adapter.imports(constants.TARGET.SEARCHAPPROVED, data);
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
    moduleApp.factory('$$auditing',['$http','$$adapter','ApiPath',auditingHandler]);
});