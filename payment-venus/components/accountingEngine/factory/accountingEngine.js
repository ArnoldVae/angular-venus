/**
 * 核算引擎api
 */
define(['../module','config'], function (moduleApp,config) {
    'use strict';
    function accountingEngineHandler($http,$$adapter,ApiPath,constants) {
        //核算引擎模块api...

        var Preference=function(_accountant){
            var pagination={
                totalItems:'',//总数
                pageIndex:1,//当前页面
                pageSize:'15',//显示条数
                maxSize:'3',//最大页数
                numPages:'',//共有多少页
                previousText: config.pagination.previousText,
                nextText: config.pagination.nextText,
                firstText: config.pagination.firstText,
                lastText: config.pagination.lastText
            };
            //会计引擎信息模版
            this.infoToView = {
                //顶部合算引擎tab
                "accountingEngineTab":[
                    {
                        'title': '会计科目设置',
                        'index': '1',
                        'active': true,
                        "btnStyle":{"width":"130px"}
                    },
                    {
                        'title': '收付信息设置',
                        'index': '2',
                        'active': false,
                        "btnStyle":{"width":"130px"}

                    },
                    {
                        'title': '凭证模版设置',
                        'index': '3',
                        'active': false,
                        "btnStyle":{"width":"130px"}


                    }
                ],

                //会计科目设置下-》按钮定义tab
                "accountingTab": [
                    {title: "科目维护", index: "1", active: true, btnStyle: {'border-radius': "50%"}},
                    {title: "辅助核算项", index: "2", active: false, btnStyle: {'border-radius': "50%"}}
                ],

                //收付信息下-》按钮定义tab
                "paymentTab":[
                    {title: "收付类型", index: "1", active: true, btnStyle: {'border-radius': "50%"}},
                    {title: "收付方式", index: "2", active: false, btnStyle: {'border-radius': "50%"}},
                    {title: "收付原因", index: "3", active: false, btnStyle: {'border-radius': "50%"}}
                ],

                //状态
                'status':{
                    isDetail: false,//会计科目右侧表单修改模式，详情模式判断
                    checkAccountTreeItemCode:"",//会计科目树选中记录
                    checkAccountItemCode:""//辅助核算项树选中记录
                },

                //收付方式列表
                "paymentWay":{
                    "mareFlag":false,//展示更多按钮
                    "queryConditions":{ //账龄区间查询条件
                        "payWayCode":"",//收付方式代码
                        "payWayCName":"",//收付方式名称
                        "titleCode":""//会计科目编码
                    },
                    "queryList":[],//账龄区间查询结果存储
                    "pagination":angular.copy(pagination)
                },
                //收付原因列表
                'paymentReason':{
                    "queryConditions":{ //账龄区间查询条件
                        "codeCode": "",//收付原因代码
                        "validStatus": "1"//是否有效
                    },
                    "queryList":[],//账龄区间查询结果存储
                    "pagination":angular.copy(pagination)
                },
                //收付场景查询条件
                'voucherTemplate':{
                    "mareFlag":false,//展示更多按钮
                    "queryConditions":{ //账龄区间查询条件
                        'payType':'',//收付类型
                        'payName':'',//收付类型名称
                        'payItem':'',//场景代码
                        'payItemName':'',//场景名称
                        'validStatus':'1'//是否有效
                    },
                    "queryList":[],//账龄区间查询结果存储
                    "pagination":angular.copy(pagination)
                },
                //收付场景／凭证模版查询列表数据
                "sceneDataList":[],
                // 收复场景详情增加列数据
                "voucher":{
                    "subNo":1,
                    "collection":"0",//是否代收
                    "crossCurrency":"1",//是否代收
                    "relation2":"0",//业务币/收付币
                    "serialNo":"1",//凭证号
                    "titleCode":"0",//会计科目编码
                    "titleName":"应收保费",//会计科目编码
                    "payItem": "",//收复场景
                    "dcInd": "0",
                    "cgFlag": "N",
                    "dataSign": 1,
                    "signTransFlag": "0",
                    "s01": null,
                    "s02": null,
                    "s03": null,
                    "s04": null,
                    "s05": null,
                    "s06": null,
                    "s07": null,
                    "s08": null,
                    "s09": null,
                    "s10": null,
                    "flag": null
                },
                //收付场景表格数据
                'paySceneDataList': {
                    "serialNo":1,
                    "relation1":"0",//机构类型
                    "relation2":"0",//业务币/收付币
                    "validStatus": "1",//状态
                    "payItemName": "",
                    "payItem": "",
                    "titleCode": "",
                    "dcInd": "0",
                    "cgFlag": "",
                    "titleName": "",
                    "dataSign": 1,
                    "signTransFlag": "",
                    "s01": true,
                    "s02": null,
                    "s03": null,
                    "s04": null,
                    "s05": null,
                    "s06": null,
                    "s07": null,
                    "s08": null,
                    "s09": null,
                    "s10": null,
                    "flag": null,
                    "nodes":[
                        {
                            "collection":"0",//是否代收
                            "crossCurrency":"1",//是否代收
                            "relation2":"0",//业务币/收付币
                            "subNo":1,
                            "serialNo":"1",//凭证号
                            "titleCode":"",//会计科目编码
                            "titleName":"",//会计科目编码
                            "payItem": "",//收复场景
                            "dcInd": "0",
                            "cgFlag": "N",
                            "dataSign": 1,
                            "signTransFlag": "0",
                            "s01": null,
                            "s02": null,
                            "s03": null,
                            "s04": null,
                            "s05": null,
                            "s06": null,
                            "s07": null,
                            "s08": null,
                            "s09": null,
                            "s10": null,
                            "flag": null
                        }
                    ]
                },
                //收付场景弹窗绑定
                'paySceneData':{
                    "payType": "",
                    "payName": "",
                    "payItem": "",
                    "payItemName": "",
                    "payRefReason":"",
                    "createDate": "",
                    "relation1":"0",//是否代收
                    "relation2":"0",//是否跨币别
                    "relation3":"0",//是否预收
                    "relation4": "0",
                    "relation5": "0",
                    "validStatus": "1",
                    "flag": null,
                    "lists": [
                        {
                            "serialNo":1,
                            "relation1":"0",//机构类型
                            "relation2":"0",//业务币/收付币
                            "validStatus": "1",//状态
                            "payItemName": "",
                            "payItem": "",//收复场景
                            "titleCode": "",
                            "dcInd": "0",
                            "cgFlag": "N",
                            "titleName": "",
                            "dataSign": 1,
                            "signTransFlag": "0",
                            "s01": null,
                            "s02": null,
                            "s03": null,
                            "s04": null,
                            "s05": null,
                            "s06": null,
                            "s07": null,
                            "s08": null,
                            "s09": null,
                            "s10": null,
                            "flag": null,
                            "nodes":[
                                {
                                    "collection":"0",//是否代收
                                    "crossCurrency":"1",//是否代收
                                    "relation2":"0",//业务币/收付币
                                    "subNo":1,//序号
                                    "serialNo":"1",//凭证号
                                    "titleCode":"0",//会计科目编码
                                    "titleName":"应收保费",//会计科目编码
                                    "payItem": "",//收复场景
                                    "dcInd": "0",
                                    "cgFlag": "N",
                                    "dataSign": 1,
                                    "signTransFlag": "0",
                                    "s01": null,
                                    "s02": null,
                                    "s03": null,
                                    "s04": null,
                                    "s05": null,
                                    "s06": null,
                                    "s07": null,
                                    "s08": null,
                                    "s09": null,
                                    "s10": null,
                                    "flag": null
                                }
                            ]
                        }
                    ]
                },
                //用于重新初始化收付场景弹窗
                'paySceneInitData':{
                    "payType": "",
                    "payName": "",
                    "payItem": "",
                    "payItemName": "",
                    "payRefReason":"",
                    "createDate": "",
                    "relation1":"0",//是否代收
                    "relation2":"0",//是否跨币别
                    "relation3":"0",//是否预收
                    "relation4": "0",
                    "relation5": "0",
                    "validStatus": "1",
                    "flag": null,
                    "lists": []
                },
                //收付类型弹窗绑定
                "payTypeData":{
                    "flag":"1",
                    "relation10":"N",
                    "payType":"",
                    "validStatus":"1",
                    "cashFlowName":"",
                    "payName":"",
                    "redFlag":"1",
                    "cashFlowCode":"",
                    "fundDCFlag":"1",
                    "relation7":"N",
                    "relation6":"N",
                    "relation5":"N",
                    "relation4":"N",
                    "attribute4":"",
                    "relation9":"N",
                    "relation8":"N",
                    "attribute1":"",
                    "attribute3":"",
                    "attribute2":"",
                    "relation3":"N",
                    "relation2":"N",
                    "relation1":"N",
                    "createDate":"",
                    "updateDate":""
                },
                //用于重新初始化收付类型弹窗
                "payTypeInitData":{
                    "flag":"1",
                    "relation10":"N",
                    "payType":"",
                    "validStatus":"1",
                    "cashFlowName":"",
                    "payName":"",
                    "redFlag":"1",
                    "cashFlowCode":"",
                    "fundDCFlag":"1",
                    "relation7":"N",
                    "relation6":"N",
                    "relation5":"N",
                    "relation4":"N",
                    "attribute4":"",
                    "relation9":"N",
                    "relation8":"N",
                    "attribute1":"",
                    "attribute3":"",
                    "attribute2":"",
                    "relation3":"N",
                    "relation2":"N",
                    "relation1":"N",
                    "createDate":"",
                    "updateDate":""
                },
                //收付类型查询条件
                'paymentType':{
                    "mareFlag":false,//展示更多按钮
                    "queryConditions":{ //账龄区间查询条件
                        "payName":'',//查询因子
                        "payType":'',
                        'validStatus':'1'//是否有效
                    },
                    "queryList":[],//账龄区间查询结果存储
                    "pagination":angular.copy(pagination)
                },
                //    会计科目与专项维护-树形菜单查询
                'accountFrom':{
                    "balanceDirection":"",
                    "validStatus":"",
                    "itemCode":"",
                    "itemLevel":"",
                    "itemName":"",
                    "showName":"",
                    "startDate":"",
                    "itemAttribute":"",
                    "createDate":"",
                    "endDate":""

                },
                //    会计科目与专项维护-辅助核算数据
                'supAccountData':[],
                //    会计科目与专项维护-辅助核算数据集
                'supAccountDatas':{
                    "accBookType": "02",
                    "accBookCode": "01",
                    "centerCode": "0000",
                    "itemCode":"",
                    "directionIDX":"",
                    "articleCode": "",
                    "validStatus":"",
                    "flag":"",
                    "createDate":"",
                    "updateDate":"",
                    "startDate":"",
                    "endDate":""
                },

                //    辅助核算项目维护-树形菜单查询
                'accountItem':{
                    "articleCode": "",
                    "articleName":"",
                    "showName":"",
                    "fbusTab":"",
                    "fvouTab":"",
                    "createDate":"",
                    "flag":"",
                    "validstatus":"",
                    "startDate":"",
                    "endDate":""
                }
            };

            var hello=function(data){
                var that=this;
                that.hello=data;
            }.bind(this);

            hello();

        };

        var add=function(_data, options, keywords){
            var _url='';
            if(keywords.target=='type'){//新增类型
                _url=ApiPath.api.addType;

            }
            else if(keywords.target=='scene'){//新增场景
                _url=ApiPath.api.addScene;
            }
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: _url,
                headers: {},
                data:_data
            })
                .success(function (data) {
                    data = $$adapter.imports('addType', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var update=function(_data, options, keywords){
            var _url='';
            if(keywords.target=='type'){//类型修改
                _url=ApiPath.api.updateType;

            }
            else if(keywords.target=='scene'){//修改场景或核算详情!
                _url=ApiPath.api.modifyScene;
            }
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url:_url,
                headers: {},
                data: _data
            })
                .success(function (data) {
                   data = $$adapter.imports('modifyScene', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var updateSave=function(_data, options, keywords){
            var _url='';
            if(keywords.target=='type'){//类型修改确认
                _url=ApiPath.api.updateTypeSave;

            }
            else if(keywords.target=='scene'){//修改场景确认
                _url=ApiPath.api.updateSceneSave;
                _data = $$adapter.exports('updateAccountNext', _data);
            }
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url:_url,
                headers: {},
                data: _data
            })
                .success(function (data) {
                    data = $$adapter.imports('updateTypeSave', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        //公共删除方法
        var deletePublic=function(_data, options, keywords){
            var _url='';
            if(keywords.target == constants.TARGET.PAYMENTTYPE){//删除收付类型
                _data = _data.payType;
                _url=ApiPath.api.deleteType
            } else if(keywords.target == constants.TARGET.PAYMENTWAY){//删除收付方式
                _url=ApiPath.api.delPaymentDto
            } else if(keywords.target == constants.TARGET.PAYMENTREASON){//删除收付原因
                _data = _data.codeCode;
                _url=ApiPath.api.deletePayReason
            } else if(keywords.target == constants.TARGET.VOUCHERTEMPLATE){//删除凭证模板设置
                _url=ApiPath.api.deleteScene
            }
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: _url,
                headers: {},
                data: _data
            })
                .success(function (data) {
                   data = $$adapter.imports('deleteType', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        // 收付方式新增
        var saveNewPay = function(_data, options, keywords){
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.saveNewPaymenter,
                headers: {},
                data: _data
            })
                .success(function (data) {
                    data = $$adapter.imports('saveNewPaymenter', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        // 收付方式修改
        var saveRevisePay = function(_data, options, keywords){
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.saveRevisePaymenter,
                headers: {},
                data: _data
            })
                .success(function (data) {
                    data = $$adapter.imports('saveRevisePaymenter', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        //收付原因增加
        var addPayReason=function(_data, options, keywords){
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.addPayReason,
                headers: {},
                data:_data
            })
                .success(function (data) {
                    data = $$adapter.imports('addPayReason', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        //收付原因修改
        var updatePayReason=function(_data, options, keywords){
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.updatePayReason,
                headers: {},
                data:_data
            })
                .success(function (data) {
                    data = $$adapter.imports('updatePayReason', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        //会计科目保存
        var saveAccounting=function(_data, options, keywords){
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.saveAccounting,
                headers: {},
                data: _data
            })
                .success(function (data) {
                    data = $$adapter.imports('saveAccounting', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        //会计科目-辅助核算保存
        var saveSupAccounting=function(_data, options, keywords){
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.saveSupAccount,
                headers: {},
                data: _data
            })
                .success(function (data) {
                    data = $$adapter.imports('saveSupAccount', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        //会计科目-新增弹框保存
        var saveNewAccounting=function(_data, options, keywords){
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.saveNewAccounting,
                headers: {},
                data: _data
            })
                .success(function (data) {
                    data = $$adapter.imports('saveNewAccounting', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        //会计科目-辅助核算删除
        var delSupAccount=function(_data, options, keywords){
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.delSupInfo,
                headers: {},
                data: _data
            })
                .success(function (data) {
                    data = $$adapter.imports('delSupInfo', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        //核算项保存全部
        var saveCenterCode=function(_data, options){
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.saveArticleCode,
                headers: {},
                data: _data
            })
                .success(function (data) {
                    data = $$adapter.imports('saveArticleCode', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };

        //收付场景详情
        var getScenceDetail=function(_data, option){
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.getScenceDetail,
                headers: {},
                data: _data
            })
                .success(function (data) {
                    data = $$adapter.imports('getScenceDetail', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        Preference.prototype={
            /**
             * 保存
             * @param target
             * @param options
             * @param keywords
             */
            save:function(target, options, keywords){
                target = target || '';

                if (target == constants.TARGET.ProposalSave) {
                    var _data = this;
                    _data = $$adapter.exports('proposalSave', _data);
                    $http({
                        method: "POST",
                        dataType: "JSON",
                        contentType: "application/json; charset=UTF-8",
                        url: ApiPath.api.proposalSave,
                        headers: {},
                        data: {
                            "auth": {},
                            "log": {},
                            "param": _data,
                            "version": "",
                            "channe": {}
                        }
                    })
                        .success(function (data) {
                            data = $$adapter.imports('proposalSave', data);
                            if (options && options.success && typeof(options.success) == 'function')
                                options.success(data);
                        })
                        .error(function (e) {
                            if (options && options.error && typeof(options.error) == 'function')
                                options.error(e);
                        });

                }

            }
        };
        //凭证模版设置-文件上传
        var excelImport=function(_data, options, keywords){
            var _data={
                "localfileurl":_data||''
            };
            config.httpPackage.data= $$adapter.exports('excelImport', _data);
            config.httpPackage.url= ApiPath.api.excelImport;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('excelImport', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };

        return {
            Preference:function(){
                return new Preference();
            },

            add:function(_data,options,keywords){
                return add(_data,options,keywords);
            },
            update:function(_data,options,keywords){
                return update(_data,options,keywords)
            },
            deletePublic:function(_data,options,keywords) {
                return deletePublic(_data, options,keywords)
            },
            updateSave:function(_data,options,keywords){
                return updateSave(_data, options,keywords)
            },
            addPayReason:function(_data, options, keywords){
                return addPayReason(_data, options, keywords);
            },
            updatePayReason:function (_data, options, keywords) {
                return updatePayReason(_data, options, keywords);
            },
            saveAccounting:function(_data,options,keywords){
                return saveAccounting(_data,options,keywords);
            },
            saveNewAccounting:function(_data,options,keywords){
                return saveNewAccounting(_data,options,keywords);
            },
            delSupAccount:function(_data,options,keywords){
                return delSupAccount(_data,options,keywords);
            },
            saveSupAccounting:function(_data,options,keywords){
                return saveSupAccounting(_data,options,keywords);
            },
            saveCenterCode:function(_data,options,keywords){
                return saveCenterCode(_data,options,keywords);
            },
            saveNewPay:function(_data,options,keywords){
                return saveNewPay(_data,options,keywords);
            },
            saveRevisePay:function(_data,options,keywords){
                return saveRevisePay(_data,options,keywords);
            },
            excelImport:function(_data,options,keywords){
                return excelImport(_data,options,keywords);
            },
            find: function (target, keywords, options, pagination) {
                /**
                 * @description
                 * 投保单查询列表查询接口
                 * @example
                 * $$finder.find('proposal',keywords,options,pagination)
                 * @param {string} type 查询类型
                 * @param {object} keywords 入参数据
                 * @param {object} options onSuccess/onError回调
                 * @param {object} pagination 分页信息
                 * @returns {httpPromise} resolve with fetched data, or fails with error description.
                 */
                if(target==constants.TARGET.VOUCHERTEMPLATE){//凭证模板设置查询
                    var _data={
                        "pageNo":pagination.pageNo||'',
                        "pageSize":pagination.pageSize||'',
                        "payType":keywords.payType||'',
                        "payName":keywords.payName||'',
                        "payItem": keywords.payItem||'',
                        "payItemName": keywords.payItemName||'',
                        "validStatus": keywords.validStatus||''
                    };
                    _data = $$adapter.exports('sceneSearch', _data);
                    $http({
                        method: "POST",
                        dataType: "JSON",
                        contentType: "application/json; charset=UTF-8",
                        url: ApiPath.api.sceneSearch,
                        headers: {},
                        data: _data
                    })
                        .success(function (data) {
                            data = $$adapter.imports('sceneSearch', data);
                            if (options && options.success && typeof(options.success) == 'function')
                                options.success(data);
                        })
                        .error(function (e, code) {
                            if (options && options.error && typeof(options.error) == 'function')
                                options.error(e);
                        })
                }
                if(target==constants.TARGET.PAYMENTTYPE){//收付类型查询
                    var _data={
                        "pageNo":pagination.pageNo||'',
                        "pageSize":pagination.pageSize||'',
                        "payName":keywords.payName||'',
                        "payType":keywords.payType||'',
                        "validStatus": keywords.validStatus||''
                    };
                    _data = $$adapter.exports('typeQuery', _data);
                    $http({
                        method: "POST",
                        dataType: "JSON",
                        contentType: "application/json; charset=UTF-8",
                        url: ApiPath.api.typeQuery,
                        headers: {},
                        data: _data
                    })
                        .success(function (data) {
                            data = $$adapter.imports('typeQuery', data);
                            if (options && options.success && typeof(options.success) == 'function')
                                options.success(data);
                        })
                        .error(function (e, code) {
                            if (options && options.error && typeof(options.error) == 'function')
                                options.error(e);
                        })
                }
                if(target==constants.TARGET.PAYMENTWAY){//收付方式查询
                    var _data={
                        "payWayCode":keywords.payWayCode||'',
                        "payWayCName":keywords.payWayCName||'',
                        "titleCode":keywords.titleCode||'',
                        "pageNo":pagination.pageNo||'',
                        "pageSize":pagination.pageSize||''
                    };
                    $http({
                        method: "POST",
                        dataType: "JSON",
                        contentType: "application/json; charset=UTF-8",
                        url: ApiPath.api.searchPaymentData,
                        headers: {},
                        data: _data
                    })
                        .success(function (data) {
                            data = $$adapter.imports('searchPaymentData', data);
                            if (options && options.success && typeof(options.success) == 'function')
                                options.success(data);
                        })
                        .error(function (e, code) {
                            if (options && options.error && typeof(options.error) == 'function')
                                options.error(e);
                        })
                }
                if(target==constants.TARGET.PAYMENTREASON){//收付原因查询
                    var _data= {
                        "codeCode":keywords.codeCode||'',
                        "validStatus":keywords.validStatus||'',
                        "pageNo":pagination.pageNo||'',
                        "pageSize":pagination.pageSize||''
                    };
                    $http({
                        method: "POST",
                        dataType: "JSON",
                        contentType: "application/json; charset=UTF-8",
                        url: ApiPath.api.payReason,
                        headers: {},
                        data:_data
                    })
                        .success(function (data) {
                            data = $$adapter.imports('payReason', data);
                            if (options && options.success && typeof(options.success) == 'function')
                                options.success(data);
                        })
                        .error(function (e, code) {
                            if (options && options.error && typeof(options.error) == 'function')
                                options.error(e);
                        })
                }
                if(target==constants.TARGET.ACCOUNTGROUP){//会计科目树查询
                    var _data={ };
                    $http({
                        method: "POST",
                        dataType: "JSON",
                        contentType: "application/json; charset=UTF-8",
                        url: ApiPath.api.accountGroup,
                        headers: {},
                        data: _data
                    })
                        .success(function (data) {
                            data = $$adapter.imports('subjectTreeMenu', data);
                            if (options && options.success && typeof(options.success) == 'function')
                                options.success(data);
                        })
                        .error(function (e, code) {
                            if (options && options.error && typeof(options.error) == 'function')
                                options.error(e);
                        })
                }
                if(target==constants.TARGET.SEARCHACCOUNT){//会计科目树形菜单查询
                    var _data={
                        "accBookType":keywords.accBookType||'',
                        "accBookCode":keywords.accBookCode||'',
                        "itemCode":keywords.itemCode||'',
                        "centerCode":keywords.centerCode||'',
                        "startDate":keywords.startDate||''
                    };
                    $http({
                        method: "POST",
                        dataType: "JSON",
                        contentType: "application/json; charset=UTF-8",
                        url: ApiPath.api.searchAccount,
                        headers: {},
                        data: _data
                    })
                        .success(function (data) {
                            data = $$adapter.imports('searchAccount', data);
                            if (options && options.success && typeof(options.success) == 'function')
                                options.success(data);
                        })
                        .error(function (e, code) {
                            if (options && options.error && typeof(options.error) == 'function')
                                options.error(e);
                        })
                }
                if(target==constants.TARGET.ACCOUNTITEMGROUP){//核算项树查询
                    var _data={
                        // "accBookType":keywords.accBookType||'',
                        // "accBookCode":keywords.accBookCode||'',
                        // "centerCode":keywords.centerCode||'',
                        // "itemCode":keywords.itemCode||'',
                        // "directionIdx":keywords.directionIdx||'',
                        // "articleCode":keywords.articleCode||''
                    };
                    $http({
                        method: "POST",
                        dataType: "JSON",
                        contentType: "application/json; charset=UTF-8",
                        url: ApiPath.api.accountItemGroup,
                        headers: {},
                        data: _data
                    })
                        .success(function (data) {
                            data = $$adapter.imports('accountItemGroup', data);
                            if (options && options.success && typeof(options.success) == 'function')
                                options.success(data);
                        })
                        .error(function (e, code) {
                            if (options && options.error && typeof(options.error) == 'function')
                                options.error(e);
                        })
                }
                if(target==constants.TARGET.QUERYACCOUNT){//辅助核算项树形菜单查询
                    var _data = {
                        "articleCode": keywords.articleCode,
                        "startDate":keywords.startDate
                    };
                    $http({
                        method: "POST",
                        dataType: "JSON",
                        contentType: "application/json; charset=UTF-8",
                        url: ApiPath.api.queryAccount,
                        headers: {},
                        data: _data
                    })
                        .success(function (data) {
                            data = $$adapter.imports('queryAccount', data);
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
    moduleApp.factory('$$accountingEngine',['$http','$$adapter','ApiPath','constants',accountingEngineHandler]);

});
