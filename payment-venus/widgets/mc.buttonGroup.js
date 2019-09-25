/**
 * Created by martin on 2017/4/29.
 */

define(['angular', 'config', 'codes'], function (angular, config, codes) {

    angular.module('mc.buttonGroup',[])

        .directive('btnGroup', function factory() {
            var directiveDefinitionObject = {
                restrict: 'E',
                replace: true,
                scope: {
                    custom:'=',
                    btns:'=',
                    bClick:"&",
                    myFn:"&"
                },
                templateUrl: 'template/directive/button-group.html',
                compile: function compile(tElement, tAttrs, transclude) {

                    return function (scope, element, attrs) {

                        scope.btns=scope.btns;
                        scope.myFn=function(data){

                            $.each(scope.btns,function(index,target){
                                if(target.index==data){
                                    target.active=true;
                                }
                                else{
                                    target.active=false;
                                }
                            });
                            // 回调函数
                            scope.bClick({index:data});
                        };

                        element.on('click',function(data){

                            // console.log(data);
                        })



                    }
                }
            };
            return directiveDefinitionObject;
        })
});

