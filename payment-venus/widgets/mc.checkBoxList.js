/**
 * Created by Administrator on 2017/11/6 0006.
 */
define(['angular', 'config', 'codes'], function (angular, config, codes) {

    angular.module('mc.checkBoxList',[])

        .directive('checkList',['$parse','$timeout', function factory($parse,$timeout) {
            var directiveDefinitionObject = {
                restrict: 'E',
                replace: true,
                scope: {
                    ck:'=',
                    lists:'=valueItems',
                    titleNames:'=titleNames',
                    dItem:'&',
                    mItem:'&',
                    sItem:'&'
                },
                templateUrl: 'template/directive/check-group.html',
                compile: function compile(tElement, tAttrs, transclude) {

                    return function (scope, element, attrs) {
                        scope.dItemFlag=attrs.dItem||'';
                        scope.mItemFlag=attrs.mItem||'';

                        //删除回调
                        var delClickBack=$parse(attrs.dItem);
                        //删除回调
                        var modClickBack=$parse(attrs.mItem);
                        //查看回调
                        var shoClickBack=$parse(attrs.sItem)
                        /**
                         * 对外放出一个接口,触发指令函数
                         * @param waitEvent
                         * @param scope
                         */
                        var validationData = function (clickEvent, scope) {
                            if (clickEvent) {
                                $timeout(function () {
                                    clickEvent(scope.$parent);
                                }, 100)
                            }
                        };
                        //点击全选
                        scope.selectedListAll=function(){
                            $.each(scope.lists,function(index,obj){
                                if(scope.checkedListAllFlag){
                                    obj.checked=true;
                                }else obj.checked=false;
                            });
                        }
                        //点击单项
                        scope.selectedListOne=function(){
                            scope.checkedListAllFlag=scope.lists.every(function(item,index,array){
                                return item.checked;
                            })
                            $.each(scope.lists,function(index,obj){
                                if(obj.checked){
                                    obj.selectedClass='venus_table_check'
                                }else {
                                    obj.selectedClass=''
                                }
                            })
                        }
                        //如果出现字段点击
                        if(attrs.dbTarget){
                            $.each(scope.lists,function (index,obj) {
                                obj.dbFlag=attrs.dbTarget;
                            })
                        }

                        scope.lists=scope.lists;
                        //获取元素
                        $.each(scope.lists,function(index,obj){
                            obj.vulueObjlist=Object.keys(obj)
                        })
                        scope.titleNames=scope.titleNames;
                        // 删除回调函数
                        scope.dClick=function (list) {
                            layer.confirm('确定删除吗', {
                                btn: ['确定','取消'], //按钮
                                icon: '3',
                                skin: 'layer-ext-moon'
                            }, function() {
                                scope.$parent.data = list;
                                validationData(delClickBack, scope);
                            });
                        };
                        //修改回调函数
                        scope.mClick=function (list) {
                            scope.$parent.data = list;
                            validationData(modClickBack, scope);
                        }
                        // 查看回调函数
                        scope.sClick=function (list) {
                            scope.$parent.data = list;
                            validationData(shoClickBack, scope);
                        }
                        element.on('click',function(data){

                            // console.log(data);
                        })



                    }
                }
            };
            return directiveDefinitionObject;
        }])
});