define([
    'app',
    'config',
    'codes'
],function (app, config,codes) {
    'use strict';
    app.registerController('CollectionCtrl',['$scope','$$venus','$rootScope','$state','$modal','$$user',
        function($scope,$$venus,$rootScope,$state,$modal,$$user){


            $scope.digest={
                businessType:'T'
            };
            $scope.BTs = codes.businessType;
            //-----ui-tree------
            $scope.subject={
                title:'123'
            };
            $scope.showData=function(data){
                $scope.subject=data.$modelValue;
                $scope.subject.title=data.$modelValue.title;
                console.log($scope.subject.title);

            };


            //删除节点
            $scope.remove = function (scope) {
                scope.remove();
            };
            //开关触发器
            $scope.toggle = function (scope) {
                console.log(scope);
                scope.toggle();
            };

            //新建节点
            $scope.newSubItem = function (scope) {

                $modal.open({
                    templateUrl: 'components/collection/modal/add.modal.tpl.html',
                    resolve: {

                    },
                    controller: function ($scope, $modalInstance) {

                        $scope.subject = {
                            title: ''
                        };


                        $scope.ok = function () {
                            $modalInstance.close($scope.subject);
                        };
                        $scope.cancel = function () {
                            $modalInstance.dismiss();
                        };

                    }
                }).result.then(function (data) {

                    var nodeData = $scope.subject;
                    nodeData.nodes.push({
                        id: nodeData.id * 10 + nodeData.nodes.length,
                        title: data.title,
                        checked:false,
                        nodes: []
                    });

                });

            };

            //折叠所有节点
            $scope.collapseAll = function () {
                $scope.$broadcast('angular-ui-tree:collapse-all');
            };

            //打开所有节点
            $scope.expandAll = function () {
                $scope.$broadcast('angular-ui-tree:expand-all');
            };


            $scope.data = [
                {
                    "id": 1,
                    "title": "node1",
                    "checked": false,
                    "nodes": [
                        {
                            "id": 11,
                            "title": "node1.1",
                            "checked": false,
                            "nodes": [
                                {
                                    "id": 111,
                                    "title": "node1.1.1",
                                    "checked": false,
                                    "nodes": [
                                        {
                                            "id": 1110,
                                            "title": "node1.1.1.1",
                                            "checked": false,
                                            "nodes": []
                                        },{
                                            "id": 1111,
                                            "title": "node1.1.1.2",
                                            "checked": false,
                                            "nodes": []
                                        }

                                    ]
                                }
                            ]
                        },
                        {
                            "id": 12,
                            "title": "node1.2",
                            "checked": false,
                            "nodes": []
                        },{
                            "id": 13,
                            "title": "node1.3",
                            "checked": false,
                            "nodes": []
                        }
                    ]
                },
                {
                    "id": 2,
                    "title": "node2",
                    "checked": false,
                    "nodes": [
                        {
                            "id": 21,
                            "title": "node2.1",
                            "checked": false,
                            "nodes": []
                        },
                        {
                            "id": 22,
                            "title": "node2.2",
                            "checked": false,
                            "nodes": []
                        }
                    ]
                },
                {
                    "id": 3,
                    "title": "node3",
                    "checked": false,
                    "nodes": [
                        {
                            "id": 31,
                            "title": "node3.1",
                            "checked": false,
                            "nodes": []
                        }
                    ]
                }
            ];

            //当checked发生变化 执行本方法
            $scope.changeNode = function (node,parent,parentNode) {
                $scope.copyData=[];
                changeChildrenNodeStatus(node);
                checkBrotherNodeStatus(parentNode);
                getCheckedData($scope.data);

            };
            //改变兄弟级的状态
            function changeChildrenNodeStatus(node) {
                angular.forEach(node.nodes,function(childrenNode){
                    childrenNode.checked=node.checked;
                    $scope.nodeData=childrenNode.title;
                    //如果还有子集
                    if(childrenNode.nodes.length>0){
                        changeChildrenNodeStatus(childrenNode);

                    }
                })
            }

            //获取选中的节点
            function getCheckedData(data){

                angular.forEach(data,function(childData){
                    if(childData.checked){
                        var checkedData=childData;
                        $scope.copyData.push(checkedData)
                    }
                    if(childData.nodes.length>0){
                        getCheckedData(childData.nodes);
                    }
                })
            }

            //检查兄弟级的状态
            function checkBrotherNodeStatus(nodeScope){
                //判断是否到达了顶级
                if(!nodeScope){
                    return false;
                }
                //父节点的值
                var parentNodeValue=nodeScope.$modelValue;
                //父节点上次的状态
                var lastStatus=parentNodeValue.checked;

                var checkedAll=true;

                angular.forEach(parentNodeValue.nodes,function(brotherNode){
                    if(!brotherNode.checked) {
                        checkedAll=false;
                        return false
                    }
                })
                parentNodeValue.checked=checkedAll;

                if(lastStatus!==parentNodeValue.checked){
                    checkBrotherNodeStatus(nodeScope.$parentNodeScope);
                }
            }

            //-----ui-tree end------

        }])
});