define(['angular', 'config', 'codes'], function (angular, config, codes) {

    angular.module('mc.selectList', [])

        .factory('$$selectListCode',['$http','$q','ApiPath','$$adapter',
            function ($http,$q,ApiPath,$$adapter){
                var localCodes = codes;
                var getLocalCodes = function (codetype, options) {
                    return localCodes[codetype];
                };
                var getLocalCode = function (code, codetype) {

                    if(!localCodes[codetype]) return '';

                    var result = '';

                    $.each(localCodes[codetype],function(index, _code){
                        if(_code.code === code){
                            result = _code.value;
                            return false;
                        }
                    });

                    return result;
                };

                //远程获取数据字典
                var getRemoteCodes = function(target, codetype, options) {

                    var deferred = $q.defer();
                    // 如果是普通双机域
                    if(target=='select'){
                        var _data={"codeType":codetype,"codeCode":options.codeValue};
                        config.httpPackage.data = $$adapter.exports("getCodeListLike", _data);
                        config.httpPackage.url = ApiPath.api.getCodeListLike;
                        $http(config.httpPackage)

                            .success(function (data) {
                                console.log(data);
                                if(target == 'select'){
                                    data = $$adapter.imports('getCodeListLike', data);
                                    if(data){
                                        deferred.resolve(data);
                                    }
                                }
                            })
                            .error(function (e, code) {
                                deferred.reject(code);
                            });

                    }
                    // 如果是人员双机域
                    if(target=='user'){
                        var _data={"comCode":options.codeValue};
                        if(_data.comCode==""){
                            layerMsg("请先录入核算单位！");
                            return false
                        }
                        config.httpPackage.data = $$adapter.exports("getCustomCodeList", _data);
                        config.httpPackage.url = ApiPath.api.queryByUserCode;
                        $http(config.httpPackage)

                            .success(function (data) {
                                console.log(data);
                                data = $$adapter.imports('getCustomCodeList', data);
                                if(data){
                                    deferred.resolve(data);
                                }
                            })
                            .error(function (e, code) {
                                deferred.reject(code);
                            });

                    }
                    // 如果是组织机构双机域
                    if(target=='organization'){
                        var _data=options.data;//入参
                        config.httpPackage.data = $$adapter.exports("getCustomCodeList", _data);
                        config.httpPackage.url = ApiPath.api.queryAllCompany;
                        $http(config.httpPackage)
                            .success(function (data) {
                                console.log(data);
                                data = $$adapter.imports('getCustomCodeList', data);
                                if(data){
                                    deferred.resolve(data);
                                }
                            })
                            .error(function (e, code) {
                                deferred.reject(code);
                            });

                    }
                    //业务员
                    if(target=='operatorName'){
                        if(!!options.data.checkComCode){
                            var _data={
                                "queryStr":options.value||'',
                                "comCode":options.data.comCode||'',
                                "checkComCode":options.data.checkComCode||''
                            }
                            config.httpPackage.data = $$adapter.exports("operatorNameList", _data);
                            config.httpPackage.url = ApiPath.api.queryOperatorName;
                            $http(config.httpPackage)
                                .success(function (data) {
                                    console.log(data);
                                    data = $$adapter.imports('operatorNameList', data);
                                    if(data){
                                        deferred.resolve(data);
                                    }
                                })
                                .error(function (e, code) {
                                    deferred.reject(code);
                                });
                        }else {
                            layer.msg('请输入业务部门！');
                        }
                    }
                    //业务部门
                    if(target=='salesDepartment'){
                        var _data={
                            "newComCode":options.value||'',
                            "centerCode":options.data.centerCode,
                            "comCode":options.data.comCode
                        }//入参
                        config.httpPackage.data = $$adapter.exports("osalesDepartmentList", _data);
                        config.httpPackage.url = ApiPath.api.AsalesDepartment;
                        $http(config.httpPackage)
                            .success(function (data) {
                                console.log(data);
                                data = $$adapter.imports('salesDepartment', data);
                                if(data){
                                    deferred.resolve(data);
                                }
                            })
                            .error(function (e, code) {
                                deferred.reject(code);
                            });
                    }
                    //代收代付--受托单位
                    if(target=='commissioned'){
                        var _data={
                            "comCode":options.data.comCode
                        };//入参
                        config.httpPackage.data = $$adapter.exports("commissionedUnitList", _data);
                        config.httpPackage.url = ApiPath.api.queryAllCenterUpByComCode;
                        $http(config.httpPackage)
                            .success(function (data) {
                                data = $$adapter.imports('commissionedUnitList', data);
                                if(data){
                                    deferred.resolve(data);
                                }
                            })
                            .error(function (e, code) {
                                deferred.reject(code);
                            });
                    }
                    //登陆机构权限范围内的代理信息
                    if(target=='queryAgent'){
                        var _data=options.data;//入参
                        config.httpPackage.data = $$adapter.exports("queryAgent", _data);
                        config.httpPackage.url = ApiPath.api.queryAgent;
                        $http(config.httpPackage)
                            .success(function (data) {
                                console.log(data);
                                data = $$adapter.imports('queryAgent', data);
                                if(data){
                                    deferred.resolve(data);
                                }
                            })
                            .error(function (e, code) {
                                deferred.reject(code);
                            });
                    }
                    //收付员
                    if(target=='cashOwner'){
                        var _data=options.data;//入参
                        config.httpPackage.data = $$adapter.exports("cashOwner", _data);
                        config.httpPackage.url = ApiPath.api.comSelectData;
                        $http(config.httpPackage)
                            .success(function (data) {
                                console.log(data);
                                data = $$adapter.imports('cashOwner', data);
                                if(data){
                                    deferred.resolve(data);
                                }
                            })
                            .error(function (e, code) {
                                deferred.reject(code);
                            });
                    }
                    // 如果是账户机构双机域
                    if(target=='accountOrganization'){
                        var _data=options.data;//入参
                        config.httpPackage.data = $$adapter.exports("getCustomCodeList2", _data);
                        config.httpPackage.url = ApiPath.api.queryAllCenter;
                        $http(config.httpPackage)

                            .success(function (data) {
                                console.log(data);
                                data = $$adapter.imports('getCustomCodeList2', data);
                                if(data){
                                    deferred.resolve(data);
                                }
                            })
                            .error(function (e, code) {
                                deferred.reject(code);
                            });

                    }
                    // 如果是银行账户机构双机域
                    if(target=='bankAccountOrganization'){
                        var _data=options.data;//入参
                        config.httpPackage.data = $$adapter.exports("getCustomCodeList3", _data);
                        config.httpPackage.url = ApiPath.api.confirmBank;
                        $http(config.httpPackage)
                            .success(function (data) {
                                console.log(data);
                                data = $$adapter.imports('getCustomCodeList3', data);
                                if(data){
                                    deferred.resolve(data);
                                }
                            })
                            .error(function (e, code) {
                                deferred.reject(code);
                            });

                    }
                    // 如果是支付方式
                    if(target=='payway'){
                        var _data=options.data;//入参
                        config.httpPackage.data = $$adapter.exports("getCustomCodeList4", _data);
                        config.httpPackage.url = ApiPath.api.payWayQuery;
                        $http(config.httpPackage)
                            .success(function (data) {
                                console.log(data);
                                data = $$adapter.imports('getCustomCodeList4', data);
                                if(data){
                                    deferred.resolve(data);
                                }
                            })
                            .error(function (e, code) {
                                deferred.reject(code);
                            });

                    }

                    return deferred.promise;
                };

                var getCodes = function (target, codetype, options) {

                    if(options && options.forceRemote)
                        return getRemoteCodes(target, codetype, options);

                    var deffered = $q.defer();

                    if(localCodes[codetype]) {
                        deffered.resolve(getLocalCodes(codetype, options));
                    }else{
                        //如果本地没有，尝试从远程获取
                        return getRemoteCodes(target, codetype, options);
                    }
                    return deffered.promise;
                };
                var  getAccCodes=function (codeType,options) {
                    console.log('核算引擎双击域查询');
                    var data1={
                        "codeType":codeType
                    };
                    $http({
                        method: "POST",
                        dataType: "JSON",
                        contentType: "application/json; charset=UTF-8",
                        url: ApiPath.api.getAccCodeListLike,
                        headers: {},
                        data: data1
                    })
                        .success(function (data) {
                            // data = $$adapter.imports('comSelectData', data);
                            if (options && options.success && typeof(options.success) == 'function')
                                options.success(data);
                        })
                        .error(function (e, code) {
                            if (options && options.error && typeof(options.error) == 'function')
                                options.error(e);
                        })
                }
                var getBaseCom=function (target,options) {
                    console.log('收付机构下拉查询');
                    var _data={
                    };
                    $http({
                        method: "POST",
                        dataType: "JSON",
                        contentType: "application/json; charset=UTF-8",
                        url: ApiPath.api.comSelectData,
                        headers: {},
                        data: _data
                    })
                        .success(function (data) {
                            data = $$adapter.imports('comSelectData', data);
                            if (options && options.success && typeof(options.success) == 'function')
                                options.success(data);
                        })
                        .error(function (e, code) {
                            if (options && options.error && typeof(options.error) == 'function')
                                options.error(e);
                        })

                };
                return {
                    //获取本地代码值
                    getLocalCode: function (code, codetype) {
                        return getLocalCode(code, codetype);
                    },

                    //获取代码数组
                    getCodes: function (target, codetype, options) {
                        return getCodes(target, codetype, options);
                    },
                    //未转换（核算引擎）
                    getAccCodes:function (codeType,options) {
                        return  getAccCodes(codeType,options);
                    },
                    //基础信息模块（机构代码）
                    getBaseCom:function (target,options) {
                        return  getBaseCom(target,options);
                    }
                };
            }])
        //双击域
        .directive('selectList', ['$timeout', '$parse', '$$selectListCode','$compile',
            function ($timeout, $parse, $$selectListCode,$compile) {
                return {
                    require: '^ngModel',
                    restrict: "E",
                    scope: {
                        ngModel: '=',
                        ngValue: '=',
                        ngDisabled: '=',
                        ngRequired: '=',
                        selectValue: '=',
                        maxLength: '=',
                        accountFlag:'=',//会计引擎模块
                        baseCom:'=',//基础信息模块机构代码
                        parent:'=',//父级
                        data:'=',//自定义入参
                        forceRemote:'='//强制从后端获取数据

                    },
                    templateUrl: "template/directive/select-list.html",
                    compile: function () {
                        return function (scope, element, attrs, ngModel) {
                            scope._code = "";//临时code
                            scope._value = "";//临时value
                            scope.openListFlag = false;//下拉框是否显示
                            scope.codeList = [];//下拉框数据
                            scope.displaytype = attrs.displaytype;//双击域类型
                            scope.myClass = attrs.myClass;

                            //如果需要显示code--name
                            if(attrs.showType=='codeValue'){
                                var inputId= 'mc-select-list' + scope.$id + '-' + Math.floor(Math.random() * 10000);
                                scope.firstId=inputId;
                                scope.secondId=inputId+1;

                                //隐藏输入框获取焦点
                                scope.onFocusInsurerName = function () {
                                    scope.showTypeAhead = false;
                                    $timeout(function(){
                                        if(scope.displaytype == 'CODE' && !scope.showTypeAhead){
                                            //获取焦点
                                            document.getElementById(scope.firstId).focus();
                                            //选中输入框文本
                                            document.getElementById(scope.firstId).select();
                                        }else{
                                            //获取焦点
                                            document.getElementById(scope.secondId).focus();
                                            //选中输入框文本
                                            document.getElementById(scope.secondId).select();
                                        }
                                    },10);
                                };

                                scope.showTypeAhead=true;
                                var inputEl = angular.element('<input ng-model="codeValue"/>');
                                inputEl.attr({
                                    'ng-show': 'showTypeAhead',
                                    'ng-focus': 'onFocusInsurerName()',
                                    'type': 'text',
                                    'style':"background: #e4f0f9",
                                    'class':attrs.myClass +' pt4-ie2 wid_input'
                                });

                                var $input = $compile(inputEl)(scope);
                                element.after($input);
                            }

                            var fieldExt = "";//级联
                            var codeMethod = "select";//类型

                            var changeCallBack = $parse(attrs.waitChange);
                            /**
                             * 对外放出一个接口,触发指令函数
                             * @param waitEvent
                             * @param scope
                             */
                            var validationData = function (waitEvent, scope) {
                                if (waitEvent) {
                                    $timeout(function () {
                                        waitEvent(scope.$parent);
                                    }, 100)
                                }
                            };
                            /**
                             * 处理级联关系
                             * @param keywords
                             */
                            var handleCascade = function (codeType,keywords) {

                                codeType = codeType || "";
                                keywords = keywords || {};




                            };

                            /**
                             * 双击触发
                             */
                            scope.modalOpen = function () {
                                scope.codeList = [];//下拉框数据
                                // handleCascade(attrs.baseCode,scope.selectValue);
                                scope.openListFlag = true;
                                if(attrs.selecttype=='cashOwner'){
                                    $$selectListCode.getCodes(attrs.selecttype,attrs.baseCode,{
                                        codeMethod : codeMethod,
                                        fieldExt : fieldExt,
                                        value:attrs.value,
                                        codeValue : attrs.displaytype=="CODE"||scope.ngModel!="" ? scope.ngModel : scope.ngValue,
                                        data:scope.data
                                    }).then(function (data) {
                                        scope.codeList = data;
                                        if(!(data&&data.length>0)){
                                            layerMsg("未查询到数据，请检查录入是否正确");
                                        }
                                    })
                                    }
                                    //     success:function(data){
                                    //         var comValueList=[];
                                    //         var comList=[];
                                    //         var userValueList=[];
                                    //         var a={};
                                    //         var b={};
                                    //         var c={};
                                    //
                                    //         $.each(data.content,function(index,obj){
                                    //             a['code']=obj.comName;
                                    //             a['value']=obj.comCode;
                                    //             b['code']=obj.comCode;
                                    //             b['value']=obj.comName;
                                    //             c['code']=obj.userCode;
                                    //             c['value']=obj.userName;
                                    //             comList.push(angular.copy(a));
                                    //             comValueList.push(angular.copy(b));
                                    //             userValueList.push(angular.copy(c));
                                    //         });
                                    //         scope.codeList = userValueList;
                                    //         if((!data||data.length<1)){
                                    //             layerMsg("未查询到数据，请检查录入是否正确");
                                    //         }
                                    //     },error:function(err){
                                    //
                                    //     }
                                    // })
                                else if(attrs.selecttype=='operatorName'){
                                    $$selectListCode.getCodes('operatorName',attrs.baseCode, {
                                        codeMethod : codeMethod,
                                        fieldExt : fieldExt,
                                        value:attrs.value,
                                        codeValue : attrs.displaytype=="CODE"||scope.ngModel!="" ? scope.ngModel : scope.ngValue,
                                        data:scope.data
                                    }).then(function (data) {
                                        scope.codeList = data;
                                        if(!(data&&data.length>0)){
                                            layerMsg("未查询到数据，请检查录入是否正确");
                                        }
                                    });

                                }else if(attrs.selecttype=='salesDepartment'){
                                    $$selectListCode.getCodes('salesDepartment',attrs.baseCode, {
                                        codeMethod : codeMethod,
                                        fieldExt : fieldExt,
                                        value:attrs.value,
                                        codeValue : attrs.displaytype=="CODE"||scope.ngModel!="" ? scope.ngModel : scope.ngValue,
                                        data:scope.data
                                    }).then(function (data) {
                                        scope.codeList = data;
                                        if(!(data&&data.length>0)){
                                            layerMsg("未查询到数据，请检查录入是否正确");
                                        }
                                    });

                                }
                                //登陆机构权限范围内的代理信息
                                else if(attrs.selecttype=='queryAgent'){
                                    $$selectListCode.getCodes('queryAgent',attrs.baseCode, {
                                        data:scope.data
                                    }).then(function (data) {
                                        scope.codeList = data;
                                        if(!(data&&data.length>0)){
                                            layerMsg("未查询到数据，请检查录入是否正确");
                                        }
                                    });

                                }else  if(attrs.selecttype=='organization'){
                                    $$selectListCode.getCodes('organization',attrs.baseCode, {
                                        codeMethod : codeMethod,
                                        fieldExt : fieldExt,
                                        codeValue : attrs.displaytype=="CODE"||scope.ngModel!="" ? scope.ngModel : scope.ngValue,
                                        data:scope.data
                                    }).then(function (data) {
                                        scope.codeList = data;
                                        if(!(data&&data.length>0)){
                                            layerMsg("未查询到数据，请检查录入是否正确");
                                        }
                                    });

                                }
                                //代收代付--受托单位
                                else if(attrs.selecttype=='commissioned'){
                                    $$selectListCode.getCodes('commissioned',attrs.baseCode, {
                                        codeMethod : codeMethod,
                                        fieldExt : fieldExt,
                                        codeValue : attrs.displaytype=="CODE"||scope.ngModel!="" ? scope.ngModel : scope.ngValue,
                                        data:scope.data
                                    }).then(function (data) {
                                        scope.codeList = data;
                                        if(!(data&&data.length>0)){
                                            layerMsg("未查询到数据，请检查录入是否正确");
                                        }
                                    });
                                }else if(attrs.selecttype=='accountOrganization'){
                                    $$selectListCode.getCodes('accountOrganization',attrs.baseCode, {
                                        codeMethod : codeMethod,
                                        fieldExt : fieldExt,
                                        codeValue : attrs.displaytype=="CODE"||scope.ngModel!="" ? scope.ngModel : scope.ngValue,
                                        data:scope.data
                                    }).then(function (data) {
                                        scope.codeList = data;
                                        if(!(data&&data.length>0)){
                                            layerMsg("未查询到数据，请检查录入是否正确");
                                        }
                                    });

                                }
                                else if(attrs.selecttype=='bankAccountOrganization'){
                                    $$selectListCode.getCodes('bankAccountOrganization',attrs.baseCode, {
                                        codeMethod : codeMethod,
                                        fieldExt : fieldExt,
                                        codeValue : attrs.displaytype=="CODE"||scope.ngModel!="" ? scope.ngModel : scope.ngValue,
                                        data:scope.data
                                    }).then(function (data) {
                                        scope.codeList = data;
                                        if(!(data&&data.length>0)){
                                            layerMsg("未查询到数据，请检查录入是否正确");
                                        }
                                    });

                                }
                                else if(attrs.selecttype=='payway'){
                                    $$selectListCode.getCodes('payway',attrs.baseCode, {
                                        codeMethod : codeMethod,
                                        fieldExt : fieldExt,
                                        codeValue : attrs.displaytype=="CODE"||scope.ngModel!="" ? scope.ngModel : scope.ngValue,
                                        data:scope.data
                                    }).then(function (data) {
                                        scope.codeList = data;
                                        if(!(data&&data.length>0)){
                                            layerMsg("未查询到数据，请检查录入是否正确");
                                        }
                                    });

                                }
                                else if(attrs.selecttype=='user'){
                                    $$selectListCode.getCodes('user',attrs.baseCode, {
                                        codeMethod : codeMethod,
                                        fieldExt : fieldExt,
                                        codeValue : scope.parent
                                    }).then(function (data) {
                                        scope.codeList = data;
                                        if(!(data&&data.length>0)){
                                            layerMsg("未查询到数据，请检查录入是否正确");
                                        }
                                    });
                                }else if(scope.accountFlag){
                                    $$selectListCode.getAccCodes(attrs.baseCode, {
                                        success:function(data){
                                            scope.codeList = data.content;
                                            if((data.content&&data.content.length<1)){
                                                layerMsg("未查询到数据，请检查录入是否正确");
                                            }
                                        },
                                        error:function(err){}

                                    });
                                }else if(scope.baseCom){
                                    $$selectListCode.getBaseCom({
                                    },{
                                        success:function(data){
                                            scope.codeList = data.content;
                                        },
                                        error: function (e) {
                                        }
                                    })
                                }
                                else{
                                    $$selectListCode.getCodes('select',attrs.baseCode, {
                                        codeMethod : codeMethod,
                                        fieldExt : fieldExt,
                                        codeValue : attrs.displaytype=="CODE"||scope.ngModel!="" ? scope.ngModel : scope.ngValue,
                                        forceRemote:scope.forceRemote
                                    }).then(function (data) {
                                        scope.codeList = data;
                                        if(!(data&&data.length>0)){
                                            layerMsg("未查询到数据，请检查录入是否正确");
                                        }
                                    });
                                }

                            };

                            /**
                             * 关闭下拉框
                             */
                            scope.closeList = function () {
                                $timeout(function () {

                                    scope.openListFlag = false;
                                    scope.ngModel = scope.ngModel?scope._code:scope.ngModel;
                                    scope.ngValue = scope.ngValue?scope._value:scope.ngValue;

                                    //如果需要显示code--name
                                    scope.showTypeAhead = attrs.showType == 'codeValue'?true:false;


                                    //如果需要显示code--name
                                    if(attrs.showType){
                                        scope.codeValue = (scope.ngModel?scope.ngModel:'') + (scope.ngModel?'--':'') + (scope.ngValue?scope.ngValue:'');
                                    }
                                    //判断
                                    //if (ngCtrl.$invalid) {
                                    //    if (ngCtrl.$error.required) {                          //必填项验证
                                    //        alert(attrs.warnText + '为必填项');
                                    //    }
                                    //}
                                }, 200);
                            };

                            /**
                             * 输入域变化
                             */
                            scope.changeList = function () {
                                scope.openListFlag = false;
                                scope._code = "";
                                scope._value = "";

                            };

                            /**
                             * 选中列表
                             * @param item
                             */
                            scope.chooseList = function (item) {
                                scope.ngModel = item.code;
                                scope.ngValue = item.value;
                                scope._code = item.code;
                                scope._value = item.value;
                                scope.openListFlag = false;

                                //如果需要显示code--name
                                if(attrs.showType){
                                    scope.inputValue = scope.ngModel+'--'+scope.ngValue;
                                }


                                validationData(changeCallBack, scope);
                            };

                        }
                    }
                }
            }
        ])

});