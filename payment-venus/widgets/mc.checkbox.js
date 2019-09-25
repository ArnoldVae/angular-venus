define(['angular', 'constants'], function (angular, constants) {

    angular.module('mc.checkbox', [])

        .directive('mcCheckbox', ['$parse', function ($parse) {
            return {
                require: 'mcCheckbox',
                replace: true,
                restrict: 'AE',
                templateUrl: 'template/directive/checkbox.directive.html',
                controller: 'checkboxCtrl',
                controllerAs: '$checkbox',
                scope: {
                    cModel: '=',//数据
                    cTrue: "@", // 选中
                    cFalse: "@", // 未选中
                    cDisabled: "=", // 是否允许点击
                    cType: "@", // 类型
                    cId:"@" // id
                },
                compile: function (tElement, tAttrs) {
                    return function (scope, element, attrs, ctrl) {
                        // 设置id防止错乱
                        scope.myId = scope.cId || new Date().valueOf()+"";
                    }
                }
            }
        }])
        .controller('checkboxCtrl', ['$scope', function ($scope) {
            var ctrl = this;

        }]);
});