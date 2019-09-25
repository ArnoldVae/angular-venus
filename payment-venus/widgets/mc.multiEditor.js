define(['angular', 'constants'
], function (constants) {

    angular.module('mc.multiEditor', [])
        .constant('mcDigestEditorConfig', {})

        .controller('mcMultiEditorCtrl', ['mcMultiEditorCacheService', '$scope', '$rootScope', '$state', '$timeout',
            function (mcMultiEditorCacheService, $scope, $rootScope, $state, $timeout) {

                var ctrl = this;

                ctrl.documents = mcMultiEditorCacheService.getCache();
                ctrl.layout = undefined;
                ctrl.activeIndex = undefined;

                // 如果是登录进来的，删除所有的标签页面--后续有正式接口需要调整
                if (!$rootScope.isLogout) {
                    ctrl.documents = [];
                    // $state.go('dashboard');
                }

                //判断是否已经打开

                var _isOpen = function (document) {

                    if (!ctrl.documents)
                        return false;

                    var _found = false;

                    $.each(ctrl.documents, function (index, _document) {
                        if (_document.state === document.state && !document.multiple || _document.id === document.id) {
                            ctrl.activeIndex = index;
                            _found = true;
                            return false
                        }
                    });

                    return _found;
                };

                // 通过鼠标右击，关闭标签页
                ctrl.closeMenu = function (tab, index) {
                    // 关闭当前的标签页,否则全部关闭
                    if (tab.id == '01') {
                        ctrl.closeDocument(index);
                        $.each(ctrl.documents, function (index, document) {
                            document.showTabMenu = false;
                        });
                    } else if (tab.id == '02') {
                        var copyDocument = ctrl.documents[index];
                        copyDocument.showTabMenu = false;
                        ctrl.documents = [];
                        ctrl.documents.push(copyDocument);
                        ctrl.activeIndex = ctrl.documents.length - 1;
                    } else {
                        ctrl.documents = [];
                        $state.go('dashboard');
                    }
                };
                // 鼠标移开后，不展示菜单项
                ctrl.mouseleave = function (data) {

                    $.each(ctrl.documents, function (index, document) {
                        document.showTabMenu = false;
                    });
                };
                // 判断是否在标签上右击
                ctrl.mousedown = function (event, data) {
                    console.log(document.activeElement.id);
                    var btnNum = event.button;
                    if (btnNum == 2) {
                        // 现在点击的是鼠标右击，要将该tab找到，并且设置菜单显示
                        $.each(ctrl.documents, function (index, document) {
                            if (data.id == document.id) {
                                document.showTabMenu = true;
                            } else {
                                document.showTabMenu = false;
                            }
                        });
                    } else {
                        event.preventDefault();
                    }
                };

                ctrl.openDocument = function (document) {

                    if (_isOpen(document))
                        return false;

                    document.id = Date.now();

                    if (document.params && !document.params.option)
                        document.params.option = {};

                    document.params.option.cache = document.id;
                    document.params.option = JSON.stringify(document.params.option);

                    ctrl.documents.push(document);
                    // 设置当前索引
                    ctrl.activeIndex = ctrl.documents.length - 1;
                    // saveData();
                };

                ctrl.switchDocument = function (index) {
                    if (ctrl.documents.length <= index - 1)
                        return;

                    ctrl.activeIndex = index;

                    $.each(ctrl.documents, function (index, document) {
                        document.showTabMenu = false;
                    });
                    $state.go(ctrl.documents[index].state, ctrl.documents[index].params, {reload: true});
                };

                ctrl.closeDocument = function (index) {
                    if (ctrl.documents.length === 0 || ctrl.documents.length < index)
                        return;

                    if (ctrl.documents[index].onCloseCallback && !ctrl.documents[index].onCloseCallback()) {
                        return;
                    }

                    mcMultiEditorCacheService.deleteLocalData(ctrl.documents[index].state);//关闭标签页时清除操作记录

                    ctrl.documents.splice(index, 1);

                    if (ctrl.documents.length === 0) {
                        $state.go('dashboard');
                    } else {
                        if (index == ctrl.activeIndex) {
                            ctrl.activeIndex = index > 0 ? index - 1 : 0;
                            ctrl.switchDocument(ctrl.activeIndex);
                        }

                        if (index < ctrl.activeIndex) {
                            ctrl.activeIndex = ctrl.activeIndex - 1;
                        }
                    }
                };


                // 监听是否需要关闭当前页面
                $rootScope.$on('closeCurrentDocument', function (event, data) {
                    ctrl.closeDocument(data)
                });
                // 监测当前路由名称
                $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {

                    var document = {
                        id: undefined,
                        label: toState.name,
                        tabs: [
                            {
                                id: '01',
                                name: '关闭标签页'
                            },
                            {
                                id: '02',
                                name: '关闭其他标签页'
                            },
                            {
                                id: '03',
                                name: '关闭所有标签页'
                            }
                        ],
                        showTabMenu: false//是否展示右击菜单选项
                    };

                    if (toParams.option) {
                        if (typeof(toParams.option) == 'string')
                            toParams.option = JSON.parse(toParams.option);
                        document.id = toParams.option.cache;
                    }

                    document.state = toState.name;
                    document.params = toParams;

                    if (toState.multiEditor) {
                        document.label = toState.multiEditor.label;
                        document.multiple = toState.multiEditor.multiple;
                    }

                    /**
                     * 多标签页数量限制（暂时关闭此功能）
                     */
                    // if(ctrl.documents && ctrl.documents.length>3){
                    //     if(!_isOpen(document)){
                    //         ctrl.switchDocument(3);
                    //     }
                    //     return false
                    // }

                    ctrl.openDocument(document);

                });

            }])
        .directive('mcMultiEditor', ['$compile', '$parse', '$timeout', '$document',
            function ($compile, $parse, $timeout, $document) {
                return {
                    require: 'mcMultiEditor',
                    restrict: 'EA',
                    scope: true,
                    replace: true,
                    templateUrl: 'template/mc/multiEditor/multi.editor.tpl.html',
                    controller: 'mcMultiEditorCtrl',
                    controllerAs: '$editor',
                    compile: function (tElement, tAttrs) {


                        return function (scope, element, attrs, $editor) {


                            attrs.$observe('layout', function (layout) {
                                if ($editor.layout !== layout) {
                                    $editor.layout = layout || 'scrollspy';
                                    $editor.switchDocument($editor.activeIndex || 0);
                                }

                            });
                        }
                    }
                }
            }])
        .factory('mcMultiEditorCacheService', [
            function () {

                var cache = [];
                var dataCopy = {};
                return {
                    getCache: function () {
                        return cache;
                    },
                    clearLocalData: function(target){
                        delete dataCopy[target]
                    },
                    getDocument: function (id) {
                        var found = undefined;

                        $.each(cache, function (index, document) {
                            if (document.id == id) {
                                found = document;
                                return false;
                            }
                        });

                        return found;
                    },
                    /**
                     * 缓存各个控制器操作记录数据
                     * @param target
                     * @param data
                     * @returns {*}
                     */
                    localData: function(target,data){
                        if(data){
                            dataCopy[target]=data;//存储数据
                            return false;
                        }else{
                            return dataCopy[target];
                        }
                    },

                    /**
                     * 删除各个控制器操作记录
                     * @param target
                     */
                    deleteLocalData:function(target){
                        delete dataCopy[target];//删除数据
                    }
                }

            }])

    ;
});

