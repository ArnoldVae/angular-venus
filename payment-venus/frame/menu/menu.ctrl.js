define([
    'app',
    'config'
],function (app, config) {
    'use strict';
    app.registerController('MenuCtrl',['$scope','$rootScope','$state',
        function($scope,$rootScope,$state){

            //默认不显示右侧子集菜单区块
            $scope.showMenuShade = false;

            //选择一级菜单
            $scope.selectFirstMenu=function(data){
                if(data.nodes && data.nodes.length > 0){
                    $scope.showMenuShade=true;

                    //判断是否显示二级菜单如果显示二级菜单遍历给二级菜单添加一个showThirdMenu属性，默认false
                    $.each(data.nodes, function (index, _obj) {
                        data.nodes[index].showThirdMenu = false;
                    });
                    $scope.secondMenu = data;

                    //判断鼠标滑过一级菜单高亮
                    $.each($scope.menus,function(index,target){
                        if(data.actionURL == target.actionURL){
                            $scope.menus[index].checked = true
                        }else {
                            target.checked = false;
                        }
                    });

                }else {
                        //如果没有子集，右侧子集菜单区块不显示并判断高亮问题
                        $scope.showMenuShade=false;
                        $.each($scope.menus,function(index,target){
                            if(data.actionURL == target.actionURL){
                                $scope.menus[index].checked = true
                            }else {
                                target.checked = false;
                            }
                        });
                }
            };

            //选择二级菜单
            $scope.selectSecondMenu=function(secondMenu){
                if(secondMenu.nodes && secondMenu.nodes.length > 0){
                    $scope.showMenuShade=true;
                    //遍历判断三级菜单展开关闭问题（互斥）
                    $.each($scope.secondMenu.nodes, function (index, _obj) {
                        if(secondMenu.menuCName == _obj.menuCName){
                            if(_obj.showThirdMenu){
                                _obj.showThirdMenu = false;
                            }else {
                                _obj.showThirdMenu = true;
                            }
                        }else {
                            _obj.showThirdMenu = false;
                        }
                    })
                }else {
                    //判断二级菜单没有子集时，点击跳转路由将其区块隐藏
                    $scope.showMenuShade=false;
                    $scope.isSearchMenu = false;//选择二级隐藏搜索框
                }
            };

            //选择三级菜单
            $scope.selectThirdMenu = function () {
                $scope.showMenuShade=false;
                $scope.isSearchMenu = false;//选择二级隐藏搜索框
            };

            //查找页面在哪个模块下返回是否高亮标识
            var _res = 0;
            var checkMenu = function(data,actionURL){
                var _resFlag = false;
                $.each(data,function(index,target){
                    if(target){//解决ie下报错问题
                        if(target.actionURL==actionURL){
                            _res = 1;
                            target.checked = true;
                        }else if(target.nodes && target.nodes.length){
                            var _flag = checkMenu(target.nodes,actionURL);
                            if(_flag){
                                target.checked = true;
                                _resFlag = true;
                            }else{
                                target.checked = false;
                            }
                        }else{
                            _res = 0;
                            target.checked = false;
                        }
                        if(_res == 1){
                            _resFlag = true;
                        }
                    }
                });
                return _resFlag
            };

            /**
             * 改变菜单高亮显示
             */
            $scope.changeMenu = function(actionURL){
                var _menus = angular.copy($scope.menus);
                $.each(_menus,function(index,target){
                    if(target){//解决ie下报错问题
                        if(target.actionURL == actionURL){
                            target.checked = true;
                        }else if(target.nodes && target.nodes.length){
                            var _result = checkMenu(target.nodes,actionURL);
                            if(_result){
                                target.checked = true;
                            }else{
                                target.checked = false;
                            }
                        }else{
                            target.checked = false;
                        }
                    }

                });
                $scope.menus = _menus;
            };

            //根据当前页面重置高亮
            $scope.resetMenuActive = function(){
                $scope.changeMenu($state.current.name);
            };

            $scope.resetMenuActive();

            /**
             * 根据路由地址改变菜单高亮显示
             */
            $rootScope.$on('$stateChangeSuccess', function (ev, to) {
                $scope.changeMenu(to.name);
            });

            /**
             * 是否显示搜索菜单框
             */
            $scope.isSearchMenu = false;
            $scope.showSearchMenu = function () {
                $scope.isSearchMenu = true;
            };
            $scope.hiddenSearchMenu = function () {
                $scope.isSearchMenu = false;
                $scope.search.menu = ''

            };

            /**
             * 菜单数据--获取可进行搜索的菜单数组
             */
            $scope.searchMenus = [];
            function getSearchMenu(data) {
                if(data && data.length > 0){
                    $.each(data, function (index, _obj) {
                        if(_obj.nodes && _obj.nodes.length > 0){
                            getSearchMenu(_obj.nodes);
                        }else {
                            $scope.searchMenus.push(_obj);
                        }
                    })
                }
            }
            getSearchMenu($scope.menus);
            console.log('可进行搜索的数据:',$scope.searchMenus);

            /**
             * 获取搜索菜单中鼠标滑过的菜单项
             */
            $scope.getSearchChecked = function (searchMenu) {
                if($scope.searchMenus && $scope.searchMenus.length > 0){
                    $.each($scope.searchMenus, function (index, _obj) {
                        if(_obj.actionURL == searchMenu.actionURL){
                            _obj.checked = true;
                        }else {
                            _obj.checked = false;
                        }
                    })
                }
            };
            /**
             * 初始化方法
             */
            var init = function(){
                //定义搜索框变量
                $scope.search = {
                    menu:''
                }
            };

            init();


        }])
});