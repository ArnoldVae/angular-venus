/**
 * Created by yangweichao on 2017/11/18.
 */
define(['angular', 'constants'
], function (constants) {

    angular.module('mc.allocation', [])
        .controller('mcAllocationCtrl', ['$scope', '$rootScope', '$state', '$timeout',
            function ($scope, $rootScope, $state, $timeout) {

                var ctrl = this;
                ctrl.showType = undefined;
                ctrl.checkState = false;//快捷操作显示控制

                /**
                 * 鼠标放上去触发，翻转
                 */
                var turn = function (target,time,opts){
                    //jQuery(document).ready
                    target.find('.allocation_content').hover(function () {
                        $(this).find('.allocation_before').stop().animate(opts[0], time, function () {
                            $(this).hide().next().show();
                            $(this).next().animate(opts[1],time);
                        });
                    }, function () {
                        $(this).find('.allocation_after').stop().animate(opts[0], time, function () {
                            $(this).hide().prev().show();
                            $(this).prev().animate(opts[1],time);
                            ctrl.waitChange();
                        });
                    });
                };
                var verticalOpts = [{'display': 'none'}, { 'display': 'block'}];
                ctrl.goTurn = function (){
                    turn($('.allocation'), 50,verticalOpts);
                };

                /**
                 *
                 * 公共选中取消方法
                 */
                ctrl.checkText = function (id) {
                    if(ctrl.data && ctrl.data.length > 0){
                        $.each(ctrl.data, function (index, _obj) {
                            if(_obj.id == id){
                                _obj.checked = !_obj.checked ;
                            }
                        })
                    }
                };

                /**
                 * 快捷操作进入编辑模式
                 */
                ctrl.goCheckState = function () {
                    ctrl.checkState = true;
                };

                /**
                 * 快捷操作编辑完成取消编辑模式
                 */
                ctrl.cancelCheckState = function () {
                    ctrl.checkState = false;
                    //TODO：后续点击完成调用接口
                };

                var init = function () {

                };
            }])
        .directive('mcAllocation', ['$compile', '$parse', '$timeout', '$document',
            function ($compile, $parse, $timeout, $document) {
                return {
                    require: 'mcAllocation',
                    restrict: 'EA',
                    scope: true,
                    replace: true,
                    templateUrl: 'template/mc/allocation/allocation.tpl.html',
                    controller: 'mcAllocationCtrl',
                    controllerAs: '$allocation',
                    compile: function (tElement, tAttrs) {


                        return function (scope, element, attrs, $allocation) {

                            //数据
                            attrs.$observe('data', function () {
                                $allocation.data = scope.$eval(attrs.data);
                            });

                            //显示的类型
                            attrs.$observe('showType', function (showType) {
                                if ($allocation.showType !== showType) {
                                    $allocation.showType = showType || 'btn';
                                }
                            });

                            //title
                            attrs.$observe('title', function (title) {
                                $allocation.title = title;
                            });

                            var changeCallBack = $parse(attrs.waitChange);
                            var validationData = function (waitEvent, scope) {
                                if(waitEvent){
                                    $timeout(function () {
                                        waitEvent(scope.$parent);
                                    },100);
                                }
                            };
                            $allocation.waitChange = function () {
                                validationData(changeCallBack, scope);
                            };
                        }
                    }
                }
            }])

    ;
});


