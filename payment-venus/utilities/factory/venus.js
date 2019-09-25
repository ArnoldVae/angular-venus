/**
 * Created by martin on 2017/4/13.
 * 核心业务逻辑
 */

define([
    'constants',
    'config',
    'codes'
], function (constants, config, codes) {
    'use strict';
    function venusFactoryHandler($rootScope, $q, $$adapter, $http, ApiPath) {

        console.log('venus.js加载玩完成');

        var localCodes = codes;

        //初始化加载部分数据字典
        var codeTypeInit = function () {
            var deferred = $q.defer();
            var _codeTypeInit = {
                "initlist": [
                    {
                        "codeType": "workYear"//工作所在年份
                    },
                    {
                        "codeType": "workMonth"//工作所在月份
                    },
                    {
                        "codeType": "checkType"//字段名称
                    },
                    {
                        "codeType": "dailyPStatus"//日结状态
                    },
                    {
                        "codeType": "autoDP"//自动日结标识
                    },
                    {
                        "codeType": "payRefReason"//业务类型
                    },
                    {
                        "codeType": "paymentMehtod"//支付方式
                    },
                    {
                        "codeType": "autoDPType"//设置类型
                    },
                    {
                        "codeType": "sendSapFlag"//送财务标识
                    },
                    {
                        "codeType": "accMonthStat"//会计期间-有效状态
                    },
                    {
                        "codeType": "saveNature"//存款性质
                    },
                    {
                        "codeType": "accountType"//账户类型
                    },
                    {
                        "codeType": "validStatus"//有效状态
                    },
                    {
                        "codeType": "agingType"//账龄期间类型
                    },
                    {
                        "codeType": "ims_comLevel"//机构级别
                    },
                    {
                        "codeType": "Currency"//币别
                    },
                    {
                        "codeType": "ims_flag"//操作员-机构级别
                    },
                    {
                        "codeType":"ims_validStatus"//有效状态
                    },
                    {
                        "codeType":"salesDepartment"//业务部门
                    },
                    {
                        "codeType":"operatorName"//业务员
                    },
                    {
                        "codeType":"sendSapFlag"//综合查询-凭证状态
                    },
                    {
                        "codeType":"customerType"//客户类型
                    },
                    {
                        "codeType":"IdentifyType"//证件类型
                    },
                    {
                        "codeType":"upperComCode"//上级机构
                    },
                    {
                        "codeType":"IDTYPE"//账户信息修改-证件类型
                    },
                    {
                        "codeType":"paywaycode"//收付方式
                    },
                    {
                        "codeType":"coinsFlagType"//共保标识
                    },
                    {
                        "codeType":"cusLevelType"//风险等级
                    },
                    {
                        "codeType":"itemStatusType"//记录状态
                    },
                    {
                        "codeType":"accPayType"//凭证类型
                    },
                    {
                        "codeType":"riskCode"//险种
                    },
                    {
                        "codeType":"policyCertiType"//-综合查询业务类型
                    },
                    {
                        "codeType":"coinsFlagType"//共保标志
                    },
                    {
                        "codeType":"payRefReason"//费用类型
                    },
                    {
                        "codeType":"collectingStatus"//代收代付状态
                    },
                    {
                        "codeType":"visaStatus"//发票状态
                    },
                    {
                        "codeType":"configResult"//配置结果值
                    },
                    {
                        "codeType":"configMold"//配置方式类型
                    },
                    {
                        "codeType":"validIdentification"//有效标示
                    },
                    {
                        "codeType":"Q_PAYTYPE_FIN"//
                    },
                    {
                        "codeType":"P_PAYTYPE_FIN"//
                    },
                    {
                        "codeType":"reverseTypeFund"//结算红冲
                    },
                    {
                        "codeType":"reverseTypeCerti"//业务红冲
                    },
                    {
                        "codeType":"reverseTypePay"//部分红冲
                    }
                ]

            };

            //请求地址
            config.httpPackage.url = ApiPath.api.getCodeTypeList;
            //后端入参适配
            config.httpPackage.data = $$adapter.exports('getCodeTypeList', _codeTypeInit.initlist);
            //请求网络
            $http(config.httpPackage).then(
                function (data) {
                    //后端回参适配
                    data = $$adapter.imports('getCodeTypeList', data);
                    if (!data) {
                        layerMsg('数据字典加载失败');
                    } else {

                        //后端回参适配（codeCode==>code,codeCName==>value）
                        $.each(_codeTypeInit.initlist,function(index,codeType){

                            $.each(data,function(i,target){

                                var results=[];
                                if(target.prpDnewCodeEasyDtoList){
                                    $.each(target.prpDnewCodeEasyDtoList,function(index1,target1){
                                        var result={};
                                        result.code=target1.codeCode;
                                        result.value=target1.codeCName;
                                        results.push(result);
                                    });

                                    if(codeType.codeType==target.codeType){
                                        localCodes[codeType.codeType]=results;
                                    }
                                }

                            });

                        });

                        deferred.resolve();
                    }
                },
                function (error) {

                }
            );

            return deferred.promise;

        };

        //获取菜单
        var getMenus = function (_data,options) {

            var data = {
                "userCode":_data.usercode
            };
            config.httpPackage.data = $$adapter.exports(constants.TARGET.GETMENUS, data);//后端入参适配
            config.httpPackage.url = ApiPath.api.getMenus;//请求路径
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports(constants.TARGET.GETMENUS, data);
                    if (options && options.success && typeof(options.success) == 'function'){
                        options.success(data);
                    }
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };

        //初始化
        var init = function () {

            var tasks = [
                codeTypeInit()//数据字典初始化预加载
            ];

            $q.all(tasks).then(
                function () {
                    $rootScope.$broadcast(constants.EVENTS.VENUS_READY);//数据字典加载完毕开始展示页面
                }
            );
        };

        $rootScope.$on(constants.EVENTS.LOADCODETYPE,function(){
            init();
        });

        $rootScope.isUndefined = angular.isUndefined;
        $rootScope.isDefined = angular.isDefined;

        /**
         * 表单焦点定位提示信息
         * @param _formFocus
         */
        var formFocusPrompt = function (_formFocus) {
            if (_formFocus.attributes['warn-text']) {
                layerMsg(_formFocus.attributes['warn-text'].nodeValue);
            }
        };

        //收付方式
        var paymentWay=function(_data,options){
            console.log('收付方式');
            var _data= {
                "permitPayType":"VJP02",
                "comCode":$rootScope.comCode,
            }

            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.payWayQuery,
                headers: {},
                data: _data
            })
                .success(function (data) {
                    data = $$adapter.imports('payWayQuery', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        }
        //银行信息
        var getSelBank=function(_data, options){
            console.log('收保费银行信息');
            var _data={
                "centerCode":$rootScope.user.centerCode,
                "currency":"CNY",
                "webUserCode":$rootScope.user.userCode,
            }
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.confirmBank,
                headers: {},
                data: _data
            })
                .success(function (data) {
                    data = $$adapter.imports('confirmBank', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        }

        return {

            /**
             * 焦点定位
             * @param formName
             * @returns {*}
             * @constructor
             */
            Focus: function (formName) {
                formName = formName || 'formProposal';
                var deffer = $q.defer();
                var ele;
                var modalFlag=false;
                var Ele = $("[name=" + formName + "] .ng-invalid:not(ng-form)");
                //$.each(Ele, function (index, ele) {//加标示
                //    $(ele).addClass('ng-dirty');
                //});
                if (angular.isDefined(Ele[0])) {
                    if (Ele[0].nodeName == 'DIV') {
                        ele = Ele[0].children[1];
                    } else if(Ele[0].nodeName == 'SELECT'){
                        ele = Ele[0];
                    } else if (Ele[0].nodeName == 'SELECT-LIST'||Ele[0].nodeName =='select-list') {
                        angular.forEach(Ele[0].classList,function(data){
                            if(data=='modalList'){
                                modalFlag=true
                            }
                        });
                        if(modalFlag){
                            ele = Ele[0].children[2];
                        }else {
                            ele = Ele[0].children[1];
                        }

                    } else {
                        ele = Ele[0];
                    }
                }
                if (angular.isDefined(ele)) {
                    formFocusPrompt(Ele[0]);
                    deffer.resolve(ele);
                }else{
                    deffer.resolve();
                }

                return deffer.promise;

            },

            /**
             * 获取菜单数据
             */
            getMenus: function (_data,options){
                return getMenus(_data,options)
            },
            //获取银行信息
            getSelBank:function (_data, options) {
                return getSelBank(_data, options)
            },
            getPayWay:function (_data, option) {
                return paymentWay(_data, option)
            }
        }
    }

    return venusFactoryHandler;
});