/**
 * 核算引擎模块控制器
 */

define([
    '../module',
    'config'
],function (moduleApp, config) {
    'use strict';
    var AccountingEngineCtrl=function($scope,$$accountingEngine,$timeout,$modal,$$util,FileUploader,$$venus,mcMultiEditorCacheService,constants){
        // 核算引擎模块控制器...
        $scope.constants = constants;

        /**
         * 校验
         */
        $scope.checkout = {
            isComplete:false,
            isVerification:false
        };
        /**
         * 数据排序
         * @param property
         * @returns {Function}
         */
        function compare(property){
            return function(a,b){
                var value1 = a[property];
                var value2 = b[property];
                return value1 - value2;
            };
        }

        //-------------------------- tab逻辑 start --------------------------
        /**
         * 顶部tap切换
         */
        $scope.changeAccountingEngineTab = function (index) {
            $scope.infoToView.accountingEngineTab.index = index;
        };
        /**
         * 会计科目设置下的tab切换
         */
        $scope.changeAccountingTab=function(index){
            $scope.infoToView.accountingTab.index=index;
            getRightContentHeight();//切换计算高度
        };
        /**
         * 收付设置设置下的tab切换
         */
        $scope.changePaymentTab=function(index){
            $scope.infoToView.paymentTab.index=index;
        };
        //-------------------------- tab逻辑 end --------------------------


        //-------------------------- 数据保存 start --------------------------
        /**
         * 获取上次数据
         */
        var getLastData = function(){
            var localDada=mcMultiEditorCacheService.localData('accountingEngine');//获取上次数据
            if(localDada){
                $scope.infoToView=localDada;
            }
        };
        /**
         * 存储当前页面数据和状态
         */
        var saveData = function(){
            mcMultiEditorCacheService.localData('accountingEngine',$scope.infoToView);//存储数据
        };
        //-------------------------- 数据保存 end --------------------------


        //-------------------------- 会计科目设置->1科目维护 start --------------------------
        /**
         * 会计科目与专项维护--组装树型菜单模版
         * @param data 数据
         * @param itemCode 编码
         * @param lev 级别
         */
        var treeDatas=[];//会计科目组装好的树结构数据
        function getNodes(data,itemCode,lev){
            if(data && data.length > 0){
                itemCode? true :itemCode=data[0].itemCode;
                var result=[];
                $.each(data,function(index,target){
                    if(target){
                        if(target.itemLevel==1){//一级
                            var first=target;
                            delete data[index];//删除防止死循环
                            first.nodes=getNodes(data,first.itemCode,target.itemLevel);
                            treeDatas.push(first);//存放一级
                            treeDatas.sort(compare('itemCode'));//排序
                        }else{
                            //子集
                            if(target.itemCode.substring(0,target.itemLevel*2 )==itemCode.substring(0,lev==1?4:lev*2+2)){
                                var son=target;
                                delete data[index];//删除防止死循环
                                son.nodes=getNodes(data,son.itemCode,son.itemLevel);
                                result.push(son);//存放子集
                                result.sort(compare('itemCode'));//排序
                            }
                        }
                    }
                });
                return result;
            }
        }

        /**
         *计算会计科目树区块的高度
         */
        var getRightContentHeight = function () {
            //确定是会计科目下的科目维护
            if($scope.infoToView.accountingTab.index == '1' && $scope.infoToView.accountingEngineTab.index == '1'){
                $timeout(function () {
                    var leftTreeHeight = document.getElementById("rightContent");
                    $scope.leftTreeHeight = {
                        "height":leftTreeHeight.offsetHeight + 'px'
                    };
                },10);
            }
        };
        /**
         * 会计科目与专项维护--查询树形菜单
         */
        $scope.searchAccountGroup = function () {
            $$accountingEngine.find('accountGroup', {
                "centerCode": ""
            }, {
                success: function (data) {
                    treeDatas = [];
                    getNodes(data);//组装模版
                    $scope.infoToView.accountTreeData = treeDatas;
                    getRightContentHeight();
                },
                error: function (e) {
                }

            });
        };
        /**
         * 会计科目与专项维护--树形菜单查询数据
         */
        $scope.searchAccData = function (node) {
            //树高亮
            function checkClass(data) {
                if (data && data.length > 0){
                    $.each(data, function (index, _obj) {
                        if (_obj.itemCode == node.itemCode) {
                            _obj.checkClass = '#32b522';
                            $scope.infoToView.status.checkAccountTreeItemCode = node.itemCode;//储存选中的科目
                            checkClass(_obj.nodes);
                        } else {
                            _obj.checkClass = '';
                            checkClass(_obj.nodes);
                        }
                    });
                }
            }
            checkClass($scope.infoToView.accountTreeData);

            $scope.startDate = new Date(node.startDate);
            $scope.accData = {
                "accBookType": node.accBookType,
                "accBookCode": node.accBookCode,
                "centerCode": node.centerCode,
                "itemCode": node.itemCode,
                "startDate":node.startDate
            };
            $$accountingEngine.find('searchAccount', $scope.accData, {
                success: function (data) {
                    $scope.infoToView.status.isDetail = true;
                    $scope.infoToView.supAccountData=[];
                    //更改返回的日期格式
                    $scope.createDate = new Date(data.accItemDefineDto.createDate);
                    $scope.endDate    = new Date(data.accItemDefineDto.endDate);
                    $scope.startDate  = new Date(data.accItemDefineDto.startDate);

                    data.accItemDefineDto.createDate = $scope.createDate.dateConversion();
                    data.accItemDefineDto.endDate    = $scope.endDate.dateConversion();
                    data.accItemDefineDto.startDate  = $scope.startDate.dateConversion();

                    $scope.infoToView.accountFrom = data.accItemDefineDto;//会计科目

                    angular.forEach(data.accItemArticleDtos,function(data,index,array){
                            $scope.infoToView.supAccountData.push(array[index]);
                    });
                    angular.forEach($scope.infoToView.supAccountData,function(data,index,array){
                        $scope.createDate=new Date(data.createDate);
                        data.createDate =$scope.createDate.dateConversion();
                    });

                    getRightContentHeight();//切换树菜单重新根据右侧高度计算菜单树的高度
                },
                error: function (e) {
                }
            });
        };
        /**
         * 会计科目与专项维护--修改
         */
        $scope.accountDisable = true;
        $scope.reviseAccount = function () {
            $scope.accountDisable = false;
            $scope.infoToView.status.isDetail = false;
        };
        /**
         *  会计科目与专项维护-1科目维护-辅助核算-新增
         */
        $scope.addAccount = function () {
            if($scope.infoToView.accountFrom.itemCode == '' || $scope.infoToView.accountFrom.itemCode == null || $scope.infoToView.accountFrom.itemCode == undefined){
                layerMsg('请输入正确的科目编码');
                return false;
            }
            $scope.infoToView.accountModol = [{}];
            $modal.open({
                templateUrl: 'components/accountingEngine/tpl/modal/accountingMaintenance.auxiliary.add.modal.tpl.html',
                resolve: {
                    infoToView: function () {
                        return $scope.infoToView;
                    },
                    accountMod: function () {
                        return $scope.accountMod;
                    }
                },
                controller: function ($scope, $modalInstance, infoToView, accountMod) {
                    $scope.infoToView = infoToView;
                    $scope.accountMod = accountMod;
                    $$accountingEngine.find('accountItemGroup', {}, {
                        success: function (data) {
                            $scope.infoToView.accountModol = data;
                            angular.forEach( $scope.infoToView.accountModol,function(data){
                                data.checked=false;
                            });
                        },
                        error: function (e) {
                        }
                    });
                    $scope.saveChangeInfo = function () {
                        angular.forEach($scope.infoToView.accountModol,function(data,index,array){
                            if(data.checked){
                                $scope.infoToView.supAccountData.push(array[index]);
                            }
                        });
                        angular.forEach($scope.infoToView.supAccountData,function(data,index,array){
                            $scope.createDate=new Date(data.createDate);
                            data.createDate =$scope.createDate.dateConversion();
                        });
                        $modalInstance.close();
                    };
                        $scope.cancel = function () {
                            $modalInstance.dismiss();
                        };
                }
            }).result.then(function () {
                getRightContentHeight();
            });
        };
        /**
         *  会计科目与专项维护-1科目维护-辅助核算-删除
         */
        $scope.delAccount = function (supInf,index) {
            $scope.infoToView.supAccountData.splice(index, 1);
            getRightContentHeight();
        };
        /**
         * 会计科目与专项维护--新增树形菜单
         */
        $scope.newAccountTree = function(){
            $scope.infoToView.accountFrom={
                "balanceDirection":"",
                "validStatus":"1",
                "endFlag":"",
                "itemCode":"",
                "itemLevel":"",
                "itemName":"",
                "showName":"",
                "startDate":"",
                "itemAttribute":""
            };
            $scope.infoToView.supAccountData=[];
            $scope.infoToView.status.isDetail = false;
            //树高亮
            $scope.infoToView.status.checkAccountTreeItemCode = '';//清空记录的树高亮状态
            function checkClass(data) {
                if (data && data.length > 0){
                    $.each(data, function (index, _obj) {
                        _obj.checkClass = '';
                        checkClass(_obj.nodes);
                    });
                }
            }
            checkClass($scope.infoToView.accountTreeData)
        };
        /**
         * 会计科目与专项维护--保存
         */
        $scope.saveAccount = function () {
            if(!$scope.infoToView.accountFrom.balanceDirection){
                layerMsg('请选择科目方向！');
                return false;
            }
            $scope.checkout.isComplete = true;
            $timeout(function () {
                if($scope.checkout.isVerification){
                    $scope.checkout.isComplete = false;
                    $scope._newTree={
                        "accBookType": "02",
                        "accBookCode": "01",
                        "centerCode": "0000",
                        "itemCode": $scope.infoToView.accountFrom.itemCode,
                        "itemName": $scope.infoToView.accountFrom.itemName,
                        "showName": $scope.infoToView.accountFrom.showName,
                        "itemLevel": $scope.infoToView.accountFrom.itemLevel,
                        "endFlag": "0",
                        "relateSegmentCol": null,
                        "printSegmentCol": null,
                        "validStatus": $scope.infoToView.accountFrom.validStatus,
                        "itemAttribute": $scope.infoToView.accountFrom.itemAttribute,
                        "balanceDirection": $scope.infoToView.accountFrom.balanceDirection,
                        "relateOriginLen": 10,
                        "flag": null,
                        "startDate": $scope.infoToView.accountFrom.startDate,
                        "endDate": $scope.infoToView.accountFrom.endDate,
                        "createDate":$scope.infoToView.accountFrom.createDate
                    };
                    $$accountingEngine.saveAccounting($scope._newTree, {
                        success: function (data) {
                            if(data.resultCode=='0000'){
                                layerMsg(data.resultMsg,'success');
                                //科目保存保存成功后重新获取菜单
                                $scope.searchAccountGroup();
                                //科目保存保存成功后重新查询该菜单下的信息
                                $timeout(function () {
                                    $scope.searchAccData($scope._newTree);
                                },1000);
                                $scope.infoToView.status.isDetail = true;
                            }else {
                                layerMsg(data.resultMsg);
                            }

                        },
                        error: function (e) {
                        }
                    });
                }else {
                    $scope.checkout.isComplete = false;
                }
            },500);
        };
        /**
         *  会计科目与专项维护-1科目维护-辅助核算项保存
         */
        $scope.saveAccountInf = function () {
            if($scope.infoToView.accountFrom.itemCode == '' || $scope.infoToView.accountFrom.itemCode == null || $scope.infoToView.accountFrom.itemCode == undefined){
                layerMsg('请输入正确的科目编码');
                return false;
            }
            //对科目编码做分离存储
            var itemcode = $scope.infoToView.accountFrom.itemCode;
            var itemCode = itemcode.substring(0,4);
            var direction = itemcode.substring(4);

            var directionIDX='';
            if(direction != ''){
                for(var i=0,len=direction.length;i<len;i++){
                    directionIDX += direction[i];
                    if(i % 2 == 1) directionIDX += '/';
                }
            }
            $scope.accItemArticleList = new Array();
            angular.forEach($scope.infoToView.supAccountData, function (data, index, array) {
                $scope.infoToView.supAccountDatas = data;
                //日期格式化
                $scope.createDate=new Date(array[index].createDate);
                $scope.updateDate=new Date(new Date());
                $scope.startDate=new Date(array[index].startDate);
                $scope.endDate=new Date(array[index].endDate);

                $scope.infoToView.supAccountDatas.itemCode=itemCode;
                $scope.infoToView.supAccountDatas.directionIDX= directionIDX;
                $scope.infoToView.supAccountDatas.articleCode = array[index].articleCode;
                $scope.infoToView.supAccountDatas.validStatus = array[index].validStatus;
                $scope.infoToView.supAccountDatas.createDate  = $scope.createDate.dateConversion();
                $scope.infoToView.supAccountDatas.updateDate  = $scope.updateDate.dateConversion();
                $scope.infoToView.supAccountDatas.startDate   = $scope.startDate.dateConversion();
                $scope.infoToView.supAccountDatas.endDate     = $scope.endDate.dateConversion();
                $scope.accItemArticleList.push($scope.infoToView.supAccountDatas);
            });

            $$accountingEngine.saveSupAccounting($scope.accItemArticleList, {
                success: function (data) {
                    if(data.resultCode=='0000'){
                        layerMsg(data.resultMsg,'success');
                        //辅助核算项保存成功后重新查询该菜单下的信息
                        $scope.searchAccData($scope.accData);
                    }else {
                        layerMsg(data.resultMsg);
                    }
                },
                error: function (e) {
                }
            });
        };
        //-------------------------- 会计科目设置->1科目维护 end --------------------------


        //-------------------------- 会计科目设置->2辅助核算项 start --------------------------
        /**
         * 会计科目设置-2辅助核算-查询树形菜单
         */
        $scope.searchAccountItemGroup = function () {
            $$accountingEngine.find('accountItemGroup', {}, {
                success: function (data) {
                    if(data && data.length > 0){
                        $.each(data,function(index,target){
                            target["nodes"]=[];
                        });
                        $scope.accountItemData = data;
                    }
                },
                error: function (e) {
                }
            });
        };

        /**
         *  会计科目设置-2辅助核算项-点击菜单单项查询信息
         */
        $scope.queryAccounting = function (node) {
            //树高亮
            if ($scope.accountItemData && $scope.accountItemData.length > 0){
                $.each($scope.accountItemData, function (index, _obj) {
                    if (_obj.articleCode == node.articleCode) {
                        _obj.checkClass = '#32b522';
                        $scope.infoToView.status.checkAccountItemCode = node.articleCode;//储存选中的辅助核算项
                    } else {
                        _obj.checkClass = '';
                    }
                });
            }
            $$accountingEngine.find('queryAccount', {
                "articleCode": node.articleCode,
                "startDate":node.startDate
            }, {
                success: function (data) {
                    $scope.startDate=new Date(data.startDate);
                    $scope.endDate=new Date(data.endDate);
                    $scope.createDate=new Date(data.createDate);
                    data.startDate =$scope.startDate.dateConversion();
                    data.endDate =$scope.endDate.dateConversion();
                    data.createDate =$scope.createDate.dateConversion();
                    $scope.infoToView.accountItem = data;

                },
                error: function (e) {
                }
            });
        };

        /**
         *  会计科目设置-2辅助核算项-新增树形菜单
         */
        $scope.newAccountItemTree = function () {
            $scope.infoToView.accountItem={
                "validstatus":"1",
                "articleCode":"",
                "articleName":"",
                "showName":"",
                "fbusTab":"",
                "fvouTab":"",
                "startDate":"",
                "endDate":"",
                "createDate":""
            };
            //设置默认日期
            var d = new Date();
            var date = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();//得到天数双位数
            var month = (d.getMonth()+1) < 10 ? '0' + (d.getMonth()+1) : d.getMonth()+1;//得到天数双位数
            $scope.infoToView.accountItem.startDate = d.getFullYear()+"-"+ month +"-"+ date

            //树高亮
            $scope.infoToView.status.checkAccountItemCode = '';//清空选中的辅助核算项
            if ($scope.accountItemData && $scope.accountItemData.length > 0){
                $.each($scope.accountItemData, function (index, _obj) {
                    _obj.checkClass = '';
                });
            }
        };

        /**
         *  会计科目设置-2辅助核算项-全部保存
         */
        $scope.saveAccountAll = function () {
            $scope.checkout.isComplete = true;
            $timeout(function () {
                if ($scope.checkout.isVerification) {
                    $scope.checkout.isComplete = false;
                    $$accountingEngine.saveCenterCode($scope.infoToView.accountItem, {
                        success: function (data) {
                            if(data.resultCode == '0000'){
                                layerMsg(data.resultMsg,"success");
                                //辅助核算项保存保存成功后重新获取菜单
                                $scope.searchAccountItemGroup();
                                //辅助核算项保存成功后重新查询该菜单下的信息
                                $timeout(function () {
                                    $scope.queryAccounting($scope.infoToView.accountItem);
                                },1000);
                            }else if(data.resultCode == '9999'){
                                layerMsg(data.resultMsg);
                            }
                        },
                        error: function (e) {
                        }
                    });
                }else {
                    $scope.checkout.isComplete = false;
                }
            },500);
        };
        //-------------------------- 会计科目设置->2辅助核算项 end --------------------------


        /**
         * 公共列表查询方法
         * @param target
         */
        $scope.queryPublic = function (index, target) {
            if(target!='page'){
                $scope.infoToView[index].pagination.pageIndex=1
            }
            $$accountingEngine.find(index, $scope.infoToView[index].queryConditions,{
                success:function(data){
                    $scope.infoToView[index].queryList = data.content;
                    $scope.infoToView[index].pagination.totalItems=data.totalCount;
                    if(!data.content||data.content.length<1){
                        layerMsg('暂无数据！');
                    }
                },
                error: function (e) {
                }
            },{
                "pageNo": $scope.infoToView[index].pagination.pageIndex,
                "pageSize": $scope.infoToView[index].pagination.pageSize
            });
        };
        /**
         * 公共列表删除方法
         * @param index
         * @param obj
         */
        $scope.deletePublic = function (index, obj) {
            var keywords={};
            if(index == constants.TARGET.PAYMENTTYPE){//收付类型
                keywords = {
                    "payType": obj.payType
                };
            }
            if(index == constants.TARGET.PAYMENTWAY){//收付方式
                keywords = {
                    "payWayCode":obj.payWayCode,
                    "permitPayType":obj.permitPayType
                };
            }
            if(index == constants.TARGET.PAYMENTREASON){//收付原因
                keywords = {
                    "codeCode":obj.codeCode
                };
            }
            if(index == constants.TARGET.VOUCHERTEMPLATE){//凭证模板设置
                keywords = {
                    "payType": obj.payType,
                    "payItem": obj.payItem,
                    "version": obj.version
                };
            }
            layer.confirm('确定删除吗', {
                btn: ['确定','取消'] //按钮
            }, function(){
                //点确定回调方法
                var loading = layer.load(2, {
                    shade: [0.1,'#fff'] //0.1透明度的白色背景
                });
                $$accountingEngine.deletePublic(keywords, {
                    success: function (data) {
                        layer.close(loading);
                        if(data.resultCode=='0000'){
                            layerMsg(data.resultMsg, "success");
                            $scope.queryPublic(index,'page');
                        }
                        if(data.resultCode=='9999'){
                            layerMsg(data.resultMsg);
                        }
                    },
                    error: function (e) {
                    }
                }, {
                    "target": index
                });
            });
        };

        //-------------------------- 收付方式设置 start --------------------------
        /**
         * 收付方式设置--重置
         */
        $scope.resetPaymentWay = function () {
            $scope.infoToView.paymentWay.queryConditions = {
                "payWayCode":"",//收付方式代码
                "payWayCName":"",//收付方式名称
                "titleCode":""//会计科目编码
            };
        };
        /**
         * 收付方式设置--新增
         */
        $scope.newPaymentWay = function () {
            $modal.open({
                templateUrl:'components/accountingEngine/tpl/modal/paymentWay.add.modal.tpl.html',
                resolve:{
                    queryPublic:function () {
                        return $scope.queryPublic;
                    },
                    constants:function () {
                        return constants;
                    },
                    resetPaymentWay:function () {
                        return $scope.resetPaymentWay;
                    }
                },
                controller:function($scope,$modalInstance,queryPublic,constants,resetPaymentWay){
                    $scope.newPaymentCondition = {
                        "payWayCode":"",
                        "payWayCName":"",
                        "titleCode":"",
                        "payWayType":"",
                        "permitPayType":"",
                        "titleName":"",
                        "titleRelation":"",
                        "permitCenterCode":"",
                        "dataSign":"000000",
                        "signTransFlag":"1",
                        "dcind":"1",
                        "validStatus":"1",
                        "createCode":"000000"
                    };
                    $scope.saveNewPayment = function () {
                        if(!$scope.newPaymentCondition.payWayCName||!$scope.newPaymentCondition.payWayCode){
                            layerMsg('收付方式代码和名称不能为空！');
                            return false;
                        }
                        if(!$scope.newPaymentCondition.titleCode||!$scope.newPaymentCondition.titleName){
                            layerMsg('科目类型代码名称不能为空！');
                            return false;
                        }

                        if(!$scope.newPaymentCondition.permitPayType){
                            layerMsg('适用收付类型不能为空！');
                            return false;
                        }
                        if(!$scope.newPaymentCondition.payWayType){
                            layerMsg('收付方式属性不能为空！');
                            return false;
                        }
                        if(!$scope.newPaymentCondition.permitCenterCode){
                            layerMsg('适用核算单位不能为空！');
                        }
                        if(!$scope.newPaymentCondition.titleCode){
                            layerMsg('科目类型代码不能为空！');
                            return false;
                        }
                        if(!$scope.newPaymentCondition.titleRelation){
                            layerMsg('请选择是否合算单位和关联科目！');
                            return false;
                        }
                        $$accountingEngine.saveNewPay($scope.newPaymentCondition,{
                            success: function (data) {
                                if(data.resultCode == '0000'){
                                    layerMsg(data.resultMsg,"success");
                                    $modalInstance.close();
                                    resetPaymentWay();//重置高级查询表单后查询列表
                                    queryPublic(constants.TARGET.PAYMENTWAY);
                                }else if(data.resultCode == '9999'){
                                    layerMsg(data.resultMsg);
                                }
                            },
                            error: function (e) {
                            }
                        });
                    };
                    $scope.resetNewPayment = function () {
                        $scope.newPaymentCondition = {
                            "payWayCode":"",
                            "payWayCName":"",
                            "titleCode":"",
                            "payWayType":"",
                            "permitPayType":"",
                            "titleName":"",
                            "titleRelation":"",
                            "permitCenterCode":"",
                            "signTransFlag":"1",
                            "dcind":"1",
                            "validStatus":"1",
                            "updateCode":"000000"
                        };
                    };
                    $scope.cancel = function () {
                        $modalInstance.dismiss();
                    };
                }
            }).result.then(function(){
            });

        };
        /**
         * 收付方式设置--修改
         */
        $scope.revisePaymentWay = function(target){
            $modal.open({
                templateUrl:'components/accountingEngine/tpl/modal/paymentWay.revise.modal.tpl.html',
                resolve:{
                    target: function () {
                        return target;
                    },
                    queryPublic:function () {
                        return $scope.queryPublic;
                    },
                    constants:function () {
                        return constants;
                    }
                },
                controller:function($scope,$modalInstance,target,queryPublic,constants){
                    $scope.target = target;
                    $scope.revisePaymentCondition = {
                        "payWayCode":"",
                        "payWayCName":"",
                        "titleCode":"",
                        "payWayType":"",
                        "permitPayType":"",
                        "titleName":"",
                        "titleRelation":"",
                        "permitCenterCode":"",
                        "signTransFlag":"1",
                        "dcind":"1",
                        "validStatus":"1",
                        "updateCode":"000000"
                    };
                    $scope.revisePaymentCondition = $scope.target;
                    $scope.saveRevisePayment = function () {
                        $$accountingEngine.saveRevisePay($scope.revisePaymentCondition,{
                            success: function (data) {
                                if(data.resultCode == '0000'){
                                    layerMsg(data.resultMsg,"success");
                                    $modalInstance.close();
                                    queryPublic(constants.TARGET.PAYMENTWAY,'page');//重新查询列表
                                }else if(data.resultCode == '9999'){
                                    layerMsg(data.resultMsg);
                                }
                            },
                            error: function (e) {
                            }
                        });

                    };
                    $scope.resetRevisePayment = function () {
                        $scope.revisePaymentCondition = {
                            "payWayCode":"",
                            "payWayCName":"",
                            "titleCode":"",
                            "payWayType":"",
                            "permitPayType":"",
                            "titleName":"",
                            "titleRelation":"",
                            "permitCenterCode":"",
                            "signTransFlag":"1",
                            "dcind":"1",
                            "validStatus":"1",
                            "updateCode":"000000"
                        };
                    };
                    $scope.cancel = function () {
                        $modalInstance.dismiss();
                    };
                }
            }).result.then(function(){
            });
        };
        //-------------------------- 收付方式设置 end --------------------------


        //-------------------------- 收付原因设置 start --------------------------
        /**
         * 收付原因--新增／修改
         */
        $scope.editPaymentReason = function (target, keywords) {
            $modal.open({
                templateUrl: 'components/accountingEngine/tpl/modal/paymentReason.edit.modal.tpl.html',
                backdrop: 'static',
                resolve: {
                    target: function () {
                        return target;
                    },
                    keywords: function () {
                        return keywords;
                    },
                    queryPublic: function () {
                        return $scope.queryPublic;
                    },
                    constants: function () {
                        return constants;
                    }
                },
                controller: function ($scope, $modalInstance, target, keywords, queryPublic, constants) {
                    $scope.target = target;
                    var d = new Date();
                    var date = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
                    if (target == 'update') {
                        $scope.payReason = keywords;
                        $scope.payReason.updateDate = date;
                    } else {
                        $scope.payReason = {
                            "updateCode": "0000000000",
                            "updateDate": date,
                            "flag": "",
                            "codeType": "",
                            "codeCode": "",
                            "codeTypeEName": "",
                            "transcodeCode": "",
                            "remark": "3434",
                            "transcodeCodeName": "3434",
                            "updateTimes": 1,
                            "validStatus": "1",
                            "codeName": "",
                            "createCode": "0000000000",
                            "createDate": date
                        };
                    }
                    $scope.cancel = function () {
                        $modalInstance.dismiss();
                    };
                    $scope.savePayReason = function () {
                        if(!$scope.payReason.codeCode||!$scope.payReason.codeName){
                            layerMsg('收付原因代码名称不能为空！');
                            return false;
                        }
                        if (target == 'add') {
                            $$accountingEngine.addPayReason($scope.payReason, {
                                success: function (data) {
                                    if(data.resultCode=='0000'){
                                        layerMsg(data.resultMsg,"success");
                                        $modalInstance.close();
                                        queryPublic(constants.TARGET.PAYMENTREASON);
                                    }
                                    else {
                                        layerMsg(data.resultMsg);
                                    }
                                },
                                error: function (e) {
                                }
                            });
                        } else{
                            $$accountingEngine.updatePayReason($scope.payReason, {
                                success: function (data) {
                                    if(data.resultCode=='0000'){
                                        layerMsg(data.resultMsg,"success");
                                        $modalInstance.close();
                                        queryPublic(constants.TARGET.PAYMENTREASON,'page');
                                    }else {
                                        layerMsg(data.resultMsg);
                                    }
                                },
                                error: function (e) {
                                }
                            });
                        }
                    };
                }
            }).result.then(function () {
            });
        };
        //-------------------------- 收付原因设置 end --------------------------


        //--------------------------  收付场景 start --------------------------
        /**
         * 凭证模板设置--重置
         */
        $scope.resetVoucherTemplate = function () {
            $scope.infoToView.voucherTemplate.queryConditions = {
                'payType':'',//收付类型
                'payName':'',//收付类型名称
                'payItem':'',//场景代码
                'payItemName':'',//场景名称
                'validStatus':'1'//是否有效
            };
        };
        /**
         * 凭证模板设置--添加/修改/详情
         * 核算详情
         * 场景修改
         */
        $scope.editVoucherTemplate = function (index, obj) {

            $modal.open({
                templateUrl: 'components/accountingEngine/tpl/modal/voucherTemplate.add.modal.tpl.html',
                resolve: {
                    index: function () {
                        return index;
                    },
                    infoToView: function () {
                        return $scope.infoToView;
                    },
                    checkItem: function () {
                        return $scope.checkItem;
                    },
                    obj: function () {
                        return obj;
                    }
                },
                controller: function ($scope, $modalInstance, index, infoToView, checkItem) {
                    $scope.infoToView = infoToView;
                    /**
                     * 新增函数
                     */
                    $scope.subString=function(){
                        if(index=='detail'||index=='modify'){
                            return false;
                        }
                        $scope.infoToView.paySceneData.payItem=
                            $scope.infoToView.paySceneData.payRefReason+$scope.infoToView.paySceneData.payType
                            +$scope.infoToView.paySceneData.relation1+$scope.infoToView.paySceneData.relation2
                            +$scope.infoToView.paySceneData.relation3+$scope.infoToView.paySceneData.relation4+
                            $scope.infoToView.paySceneData.relation5;
                    };
                    $scope.target=index;
                    //如果是修改调用接口
                    if (index == 'modify') {
                        $$accountingEngine.update({
                            "payType": obj.payType,
                            "payItem": obj.payItem,
                            "version": obj.version
                        }, {
                            success: function (data) {
                                $scope.infoToView.paySceneData = data;
                                $scope.copyPayItem = angular.copy($scope.infoToView.paySceneData.payItem);
                                $scope.infoToView.paySceneData.endDate=new Date($scope.infoToView.paySceneData.endDate).dateConversion();
                                $scope.infoToView.paySceneData.startDate=new Date($scope.infoToView.paySceneData.startDate).dateConversion();
                                $scope.infoToView.paySceneData.createDate= new Date($scope.infoToView.paySceneData.createDate).dateConversion();
                                $scope.copyPaySeneData = angular.copy($scope.infoToView.paySceneData);//备份用于的引起场景代码改变的元素还原
                            },
                            error: function (e) {
                            }
                        }, {
                            "target": "scene"
                        });
                    } else if (index == 'detail') {
                        $$accountingEngine.update({
                            "payType": obj.payType,
                            "payItem": obj.payItem,
                            "version": obj.version
                        }, {
                            success: function (data) {
                                $scope.infoToView.paySceneData = data;
                                $scope.infoToView.paySceneData.endDate=new Date($scope.infoToView.paySceneData.endDate).dateConversion();
                                $scope.infoToView.paySceneData.startDate=new Date($scope.infoToView.paySceneData.startDate).dateConversion();
                                $scope.infoToView.paySceneData.createDate= new Date($scope.infoToView.paySceneData.createDate).dateConversion();
                                $scope.copyPaySeneData = angular.copy($scope.infoToView.paySceneData);//备份用于的引起场景代码改变的元素还原
                            },
                            error: function (e) {
                            }
                        }, {
                            "target": "scene"
                        });
                    } else if (index == 'add') {
                        $scope.infoToView.paySceneData = angular.copy($scope.infoToView.paySceneInitData);
                    }

                    //进入收付场景详情
                    $scope.getSceneDetail = function(scene,num){
                        $modal.open({
                            templateUrl:'components/accountingEngine/tpl/modal/voucherTemplate.detail.modal.tpl.html',
                            resolve:{
                                infoToView: function () {
                                    return $scope.infoToView;
                                }
                            },
                            controller: function($scope, $modalInstance, infoToView){
                                $scope.vouchers=scene.nodes;//场景详情
                                //同步信息
                                $.each($scope.vouchers,function(index,target){
                                    target.payItem=scene.payItem;//同主信息场景代码
                                    target.serialNo=target.index=num+1;//同主信息序号
                                    target.relation2=scene.relation2;//同主信息业务币/收付币
                                });
                                //添加
                                $scope.addVoucher=function(){
                                    infoToView.voucher.subNo=$scope.vouchers.length+1;
                                    var voucher=angular.copy(infoToView.voucher);//增加列数据
                                    voucher.payItem=scene.payItem;//同主信息场景代码
                                    voucher.serialNo=num+1;//同主信息场景代码
                                    $scope.vouchers.push(voucher);
                                };
                                //删除
                                $scope.deleteVoucher=function(index){
                                    $scope.vouchers.splice(index,1);
                                    infoToView.voucher.subNo=$scope.vouchers.length;
                                };
                                //确定
                                $scope.confirm=function(){
                                    $modalInstance.close($scope.vouchers)
                                };
                                //关闭
                                $scope.cancel=function(){
                                    $modalInstance.dismiss();
                                };
                            }
                        }).result.then(function(data){
                            // 确定回调
                        },function(e){
                            //取消回调
                        });

                    };

                    //新增按钮
                    $scope.newSceneAdd = function () {
                        if($scope.infoToView.paySceneData.payItem){
                            $scope.infoToView.paySceneDataList.serialNo=$scope.infoToView.paySceneData.lists.length+1;
                            var newArray = angular.copy($scope.infoToView.paySceneDataList);
                            newArray.payItem=$scope.infoToView.paySceneData.payItem;
                            $scope.infoToView.paySceneData.lists.push(newArray);
                            $scope.copyPaySeneData = angular.copy($scope.infoToView.paySceneData);//备份用于的引起场景代码改变的元素还原
                        }else{
                            layerMsg('请输入场景代码');
                        }

                    };
                    //删除按钮
                    $scope.newSceneDelete = function (index) {
                        if ($scope.infoToView.paySceneData.lists.length == '1') {
                            return false;
                        }
                        $scope.infoToView.paySceneData.lists.splice(index, 1);
                        $scope.infoToView.paySceneDataList.serialNo=$scope.infoToView.paySceneData.lists.length;
                        $scope.copyPaySeneData = angular.copy($scope.infoToView.paySceneData);//备份用于的引起场景代码改变的元素还原
                    };
                    $scope.cancel=function(){
                        $modalInstance.dismiss();
                    };
                    //保存
                    $scope.sceneSave = function () {
                        if (index == 'modify') {
                            var go = function () {
                                $$accountingEngine.updateSave($scope.infoToView.paySceneData, {
                                    success: function (data) {
                                        if(data.resultCode == '0000'){
                                            layerMsg(data.resultMsg,"success");
                                            $modalInstance.close(index)
                                        }else if(data.resultCode == '9999'){
                                            layerMsg(data.resultMsg);
                                        }
                                    },
                                    error: function (e) {
                                    }
                                }, {
                                    "target": "scene"
                                });

                            };
                            if($scope.copyPayItem == $scope.infoToView.paySceneData.payItem){
                                go();
                            }else {
                                layer.confirm('场景基础信息发生变化，请确认凭证信息是否需要调整', {
                                    btn: ['是','否'] //按钮
                                }, function(){
                                    go();
                                });
                            }

                        } else if (index == 'add') {
                            if($scope.infoToView.paySceneData.lists.length<1){
                                layerMsg('请先添加收付场景表单！');
                                return false;
                            }
                            var goFlag=true;
                            $.each($scope.infoToView.paySceneData.lists,function (index,obj) {
                                $.each(obj.nodes,function (i,_obj) {
                                    if(_obj.titleCode==''){
                                        goFlag=false
                                    }
                                })
                            });
                            if(!goFlag){
                                layerMsg(' 请点击场景代码选择科目种类！');
                                return false;
                            }
                            $$accountingEngine.add($scope.infoToView.paySceneData, {
                                success: function (data) {
                                    if(data.resultCode == '0000'){
                                        layerMsg(data.resultMsg,"success");
                                        $modalInstance.close(index)
                                    }else if(data.resultCode == '9999'){
                                        layerMsg(data.resultMsg);
                                    }
                                },
                                error: function (e) {
                                }
                            }, {
                                "target": "scene"
                            });

                        } else if (index == 'detail') {
                            $modalInstance.close(index);
                        }
                    };
                    $scope.cancel = function () {
                        $modalInstance.dismiss();
                    };

                    $scope.$watch('infoToView.paySceneData.payItem', function (newValue,oldValue) {

                        if(oldValue && $scope.infoToView.paySceneData && $scope.infoToView.paySceneData.lists && $scope.infoToView.paySceneData.lists.length > 0){
                            if(newValue == oldValue || $scope.infoToView.paySceneData.lists[0].payItem == newValue){
                                return false
                            }else {
                                layerOpen('场景基础信息发生变化，收付场景列表将会被清空，请确认凭证信息是否需要调整', {
                                    sure: function () {
                                        $scope.$apply(function () {
                                            $scope.infoToView.paySceneData.lists.splice(0,$scope.infoToView.paySceneData.lists.length);
                                            $scope.copyPaySeneData = angular.copy($scope.infoToView.paySceneData);//备份用于的引起场景代码改变的元素还原
                                        });
                                    },
                                    cancel:function () {
                                        $scope.$apply(function () {
                                            //将备份的引起场景代码改变的元素还原
                                            $scope.infoToView.paySceneData.payItem = $scope.copyPaySeneData.payItem;
                                            $scope.infoToView.paySceneData.payType = $scope.copyPaySeneData.payType;
                                            $scope.infoToView.paySceneData.payName = $scope.copyPaySeneData.payName;
                                            $scope.infoToView.paySceneData.payRefReason = $scope.copyPaySeneData.payRefReason;
                                            $scope.infoToView.paySceneData.relation1 = $scope.copyPaySeneData.relation1;
                                            $scope.infoToView.paySceneData.relation2 = $scope.copyPaySeneData.relation2;
                                            $scope.infoToView.paySceneData.relation3 = $scope.copyPaySeneData.relation3;
                                            $scope.infoToView.paySceneData.relation4 = $scope.copyPaySeneData.relation4;
                                            $scope.infoToView.paySceneData.relation5 = $scope.copyPaySeneData.relation5;
                                            return false
                                        });
                                    }
                                });
                            }
                        }
                    })

                }
            }).result.then(function (index) {
                if(index=='add'){
                    $scope.resetVoucherTemplate();//重置表单后再查询
                    $scope.queryPublic($scope.constants.TARGET.VOUCHERTEMPLATE);
                }
                if(index=='modify'){
                    $scope.queryPublic($scope.constants.TARGET.VOUCHERTEMPLATE,'page');
                }
            });

        };
        //--------------------------  收付场景 end --------------------------


        //--------------------------  收付类型 start --------------------------
        /**
         * 收付类型--重置
         */
        $scope.resetPaymentType = function () {
            $scope.infoToView.paymentType.queryConditions = {
                "payName":'',//查询因子
                "payType":'',
                'validStatus':'1'//是否有效
            }
        };
        /**
         * 收付类型--添加／修改
         */
        $scope.editPaymentType = function (target, obj) {
            $modal.open({
                templateUrl: 'components/accountingEngine/tpl/modal/paymentType.add.modal.tpl.html',
                resolve: {
                    infoToView: function () {
                        return $scope.infoToView;
                    },
                    target: function () {
                        return target
                    },
                    obj: function () {
                        return obj;
                    },
                    queryPublic: function () {
                        return $scope.queryPublic
                    },
                    constants:function () {
                        return constants;
                    },
                    resetPaymentType:function () {
                        return $scope.resetPaymentType
                    }
                },
                controller: function ($scope, $modalInstance, infoToView, target, obj, queryPublic, constants,resetPaymentType) {
                    $scope.infoToView = infoToView;
                    $scope.target=target;
                    $scope.infoToView.payTypeData= angular.copy($scope.infoToView.payTypeInitData);
                    if (target == 'update') {
                        $scope.infoToView.payTypeData = obj;
                    }
                    $scope.cancel=function(){
                        $modalInstance.dismiss()
                    };
                    //修改进入调用接口
                    $scope.toSave = function () {
                        var d = new Date();
                        var date = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
                        if (target == 'add') {
                            if(!$scope.infoToView.payTypeData.payType||!$scope.infoToView.payTypeData.payName){
                                layerMsg('收付类型代码名称不能为空！');
                                return false;
                            }
                            $scope.infoToView.payTypeData.createDate = date;
                            $scope.infoToView.payTypeData.updateDate = date;
                            $$accountingEngine.add($scope.infoToView.payTypeData, {
                                success: function (data) {
                                    if(data.resultCode=='0000'){
                                        layerMsg(data.resultMsg,"success");
                                        $modalInstance.close();
                                        resetPaymentType();//先重置高级查询表单再查询列表
                                        queryPublic(constants.TARGET.PAYMENTTYPE);
                                    }else {
                                        layerMsg(data.resultMsg);
                                    }
                                },
                                error: function (e) {
                                }
                            }, {
                                "target": "type"
                            });
                        } else if (target == 'update') {
                            $scope.infoToView.payTypeData.updateDate = date;
                            $$accountingEngine.updateSave($scope.infoToView.payTypeData, {
                                success: function (data) {
                                    if(data.resultCode=='0000'){
                                        layerMsg(data.resultMsg,"success");
                                        $modalInstance.close();
                                        queryPublic(constants.TARGET.PAYMENTTYPE,'page');
                                    }else {
                                        layerMsg(data.resultMsg);
                                    }
                                },
                                error: function (e) {
                                }
                            }, {
                                "target": "type"
                            });

                        }

                    }
                }
            }).result.then(function (record) {
            });
        };
        //--------------------------  收付类型 end --------------------------


        //-------------------------- uitee 插件 start --------------------------
        /**
         * uitee 插件
         *
         * $scope.remove（）删除方法
         * $scope.toggle（）展开折叠
         * $scope.moveLastToTheBeginning（）
         * $scope.newSubItem（）新建节点
         * $scope.collapseAll（）关闭所有
         * $scope.expandAll（）展开所有
         */
        $scope.remove = function (scope) {
            scope.remove();
        };

        $scope.toggle = function (scope) {
            scope.toggle();
        };

        $scope.moveLastToTheBeginning = function () {
            var a = $scope.data.pop();
            $scope.data.splice(0, 0, a);
        };

        $scope.newSubItem = function (scope) {
            var nodeData = scope.$modelValue;
            nodeData.nodes.push({
                id: nodeData.id * 10 + nodeData.nodes.length,
                title: nodeData.title + '.' + (nodeData.nodes.length + 1),
                nodes: []
            });
        };

        $scope.collapseAll = function () {
            $scope.$broadcast('angular-ui-tree:collapse-all');
        };

        $scope.expandAll = function () {
            $scope.$broadcast('angular-ui-tree:expand-all');
        };
        //-------------------------- uitee 插件 end --------------------------


        //-------------------------- 上传下载 start --------------------------
        /**
         *重置
         */
        $scope.resetImport = function () {
            $scope.importCondition = {};
            $scope.fileItem = '';
        };
        //上传
        $scope.submitImport = function(target){
            //先验证焦点定位
            $scope.uploadStatus = false;
            $$venus.Focus(
                "premiumForm"
            ).then(
                function (Ele) {
                    if (angular.isDefined(Ele)) {
                        $timeout(function () {
                            Ele.focus();
                        },1000)
                    } else {
                        uploader.uploadAll();
                        if($scope.fileItem== undefined){
                            layerMsg('请选择上传文件')
                        }
                    }
                }
            );
        };
        $scope.uploadStatus = false; //定义两个上传后返回的状态，成功获失败
        var uploader = $scope.uploader = new FileUploader({
            url: '/comm-fileserver/uploadFile',
            formData:[{userCode:$scope.usercode,systemId:'gscore-pa-web',bussType:'payment'}],
            queueLimit: 1, //文件个数
            removeAfterUpload: false //上传后删除文件
        });
        $scope.clearItems = function(){ //重新选择文件时，清空队列，达到覆盖文件的效果
            uploader.clearQueue();
        };
        uploader.onAfterAddingFile = function(fileItem) {
            $scope.fileItem = fileItem.file; //添加文件之后，把文件信息赋给scope
            $scope.name=fileItem.file.name;
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            $scope.uploadStatus = true;
            $scope.importCondition.impFileNum = response.resultObj.fileId;
            $scope.importCond = function(){
                $$accountingEngine.excelImport($scope.importCondition.impFileNum,{
                    success: function (data) {
                        if(data.resultCode == '0000'){
                            layer.msg(data.resultMsg,{icon:1});
                            $scope.fileItem = '';
                            return false;
                        }else{
                            layer.msg(data.resultMsg,{icon:1});
                            $scope.fileItem = '';
                            return false;
                        }
                    },
                    error: function (e) {
                        layer.msg(data.content.resultMsg,{icon:1})
                    }
                });
            };
            $scope.importCond();


        };
        uploader.onErrorItem = function (fileItem, response, status, headers) {
            $scope.uploadStatus = false;//上传失败则把状态改为false
            alert('上传失败！');
            $scope.fileItem = '';
        };
        //模版下载
        $scope.voucherDetailed = function () {
            $scope.fileId = 'a83b3c2a66e74f11ab2b4ec07e5b4a03';
            window.open("/comm-fileserver/downloadFile?fileId="+$scope.fileId);
        };
        $scope.voucherDetailed_subject = function () {
            $scope.fileId = 'a83b3c2a66e74f11ab2b4ec07e5b4a03';
            window.open("/comm-fileserver/downloadFile?fileId="+$scope.fileId);
        };
        //-------------------------- 上传下载 end --------------------------

        /**
         * 初始化函数
         */
        var init = function () {
            //分页信息
            $scope.pagination = {
                totalItems: '',//总数
                pageIndex: '1',//当前页面
                pageSize: '20',//显示条数
                maxSize: '3',//最大页数
                numPages: '',//共有多少页
                previousText: config.pagination.previousText,
                nextText: config.pagination.nextText,
                firstText: config.pagination.firstText,
                lastText: config.pagination.lastText
            };
            //实例化Preference对象
            $scope.Preference = $$accountingEngine.Preference();
            //infoToView信息
            $scope.infoToView = $scope.Preference.infoToView;
            $scope.infoToView.accountingEngineTab.index = 1;//tab默认显示会计科目设置
            $scope.infoToView.accountingTab.index = 1;//会计科目设置下-》默认显示科目维护
            $scope.infoToView.paymentTab.index = 1;//收付方式下-》默认显示收付类型

            $scope.searchAccountGroup();
            //核算项树查询
            $scope.searchAccountItemGroup();
            //会计科目设置-2辅助核算项-新增菜单项
            $scope.newAccountItemTree();
            //会计科目树形菜单新增
            $scope.newAccountTree();
            $scope.importCondition = {};
        };
        init();
        getLastData();
        saveData();
    };
    moduleApp.controller('AccountingEngineCtrl',['$scope','$$accountingEngine','$timeout','$modal','$$util','FileUploader','$$venus','mcMultiEditorCacheService','constants',AccountingEngineCtrl]);

});