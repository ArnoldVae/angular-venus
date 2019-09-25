define([
    'angular',
    'config',
    'codes',
    'constants'
], function (angular, config, codes, constants) {

    var latestId = 0;
    var KEY = {
        TAB: 9,
        ENTER: 13,
        ESC: 27,
        SPACE: 32,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        SHIFT: 16,
        CTRL: 17,
        ALT: 18,
        PAGE_UP: 33,
        PAGE_DOWN: 34,
        HOME: 36,
        END: 35,
        BACKSPACE: 8,
        DELETE: 46,
        COMMAND: 91,

        MAP: { 91 : "COMMAND", 8 : "BACKSPACE" , 9 : "TAB" , 13 : "ENTER" , 16 : "SHIFT" , 17 : "CTRL" , 18 : "ALT" , 19 : "PAUSEBREAK" , 20 : "CAPSLOCK" , 27 : "ESC" , 32 : "SPACE" , 33 : "PAGE_UP", 34 : "PAGE_DOWN" , 35 : "END" , 36 : "HOME" , 37 : "LEFT" , 38 : "UP" , 39 : "RIGHT" , 40 : "DOWN" , 43 : "+" , 44 : "PRINTSCREEN" , 45 : "INSERT" , 46 : "DELETE", 48 : "0" , 49 : "1" , 50 : "2" , 51 : "3" , 52 : "4" , 53 : "5" , 54 : "6" , 55 : "7" , 56 : "8" , 57 : "9" , 59 : ";", 61 : "=" , 65 : "A" , 66 : "B" , 67 : "C" , 68 : "D" , 69 : "E" , 70 : "F" , 71 : "G" , 72 : "H" , 73 : "I" , 74 : "J" , 75 : "K" , 76 : "L", 77 : "M" , 78 : "N" , 79 : "O" , 80 : "P" , 81 : "Q" , 82 : "R" , 83 : "S" , 84 : "T" , 85 : "U" , 86 : "V" , 87 : "W" , 88 : "X" , 89 : "Y" , 90 : "Z", 96 : "0" , 97 : "1" , 98 : "2" , 99 : "3" , 100 : "4" , 101 : "5" , 102 : "6" , 103 : "7" , 104 : "8" , 105 : "9", 106 : "*" , 107 : "+" , 109 : "-" , 110 : "." , 111 : "/", 112 : "F1" , 113 : "F2" , 114 : "F3" , 115 : "F4" , 116 : "F5" , 117 : "F6" , 118 : "F7" , 119 : "F8" , 120 : "F9" , 121 : "F10" , 122 : "F11" , 123 : "F12", 144 : "NUMLOCK" , 145 : "SCROLLLOCK" , 186 : ";" , 187 : "=" , 188 : "," , 189 : "-" , 190 : "." , 191 : "/" , 192 : "`" , 219 : "[" , 220 : "\\" , 221 : "]" , 222 : "'"
        },

        isControl: function (e) {
            var k = e.which;
            switch (k) {
                case KEY.COMMAND:
                case KEY.SHIFT:
                case KEY.CTRL:
                case KEY.ALT:
                    return true;
            }

            if (e.metaKey) return true;

            return false;
        },
        isFunctionKey: function (k) {
            k = k.which ? k.which : k;
            return k >= 112 && k <= 123;
        },
        isVerticalMovement: function (k){
            return ~[KEY.UP, KEY.DOWN].indexOf(k);
        },
        isHorizontalMovement: function (k){
            return ~[KEY.LEFT,KEY.RIGHT,KEY.BACKSPACE,KEY.DELETE].indexOf(k);
        }
    };

    angular.module('mc.codes', [])

        .service('mcCodeSelectMinErr', function() {
            var minErr = angular.$$minErr('mc.code.select');
            return function() {
                var error = minErr.apply(this, arguments);
                var message = error.message.replace(new RegExp('\nhttp://errors.angularjs.org/.*'), '');
                return new Error(message);
            };
        })
        /**
         * Debounces functions
         *
         * Taken from UI Bootstrap $$debounce source code
         * See https://github.com/angular-ui/bootstrap/blob/master/src/debounce/debounce.js
         *
         */
        .factory('$$mcDebounce', ['$timeout', function($timeout) {
            return function(callback, debounceTime) {
                var timeoutPromise;

                return function() {
                    var self = this;
                    var args = Array.prototype.slice.call(arguments);
                    if (timeoutPromise) {
                        $timeout.cancel(timeoutPromise);
                    }

                    timeoutPromise = $timeout(function() {
                        callback.apply(self, args);
                    }, debounceTime);
                };
            };
        }])
        /**
         * A read-only equivalent of jQuery's offset function: http://api.jquery.com/offset/
         *
         * Taken from AngularUI Bootstrap Position:
         * See https://github.com/angular-ui/bootstrap/blob/master/src/position/position.js#L70
         */
        .factory('mcOffset',
            ['$document', '$window',
                function ($document, $window) {

                    return function(element) {
                        var boundingClientRect = element[0].getBoundingClientRect();
                        return {
                            width: boundingClientRect.width || element.prop('offsetWidth'),
                            height: boundingClientRect.height || element.prop('offsetHeight'),
                            top: boundingClientRect.top + ($window.pageYOffset || $document[0].documentElement.scrollTop),
                            left: boundingClientRect.left + ($window.pageXOffset || $document[0].documentElement.scrollLeft)
                        };
                    };
                }])
        .service('mcCodeRepeatParser', ['mcCodeSelectMinErr','$parse', function(mcCodeSelectMinErr, $parse) {
            var self = this;

            /**
             * Example:
             * expression = "address in addresses | filter: {street: $select.search} track by $index"
             * itemName = "address",
             * source = "addresses | filter: {street: $select.search}",
             * trackByExp = "$index",
             */
            self.parse = function(expression) {


                var match;
                //var isObjectCollection = /\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)/.test(expression);
                // If an array is used as collection

                // if (isObjectCollection){
                // 000000000000000000000000000000111111111000000000000000222222222222220033333333333333333333330000444444444444444444000000000000000055555555555000000000000000000000066666666600000000
                match = expression.match(/^\s*(?:([\s\S]+?)\s+as\s+)?(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+(\s*[\s\S]+?)?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);

                // 1 Alias
                // 2 Item
                // 3 Key on (key,value)
                // 4 Value on (key,value)
                // 5 Source expression (including filters)
                // 6 Track by

                if (!match) {
                    // throw uiSelectMinErr('iexp', "Expected expression in form of '_item_ in _collection_[ track by _id_]' but got '{0}'.",
                    //     expression);
                }

                var source = match[5],
                    filters = '';

                // When using (key,value) ui-select requires filters to be extracted, since the object
                // is converted to an array for $select.items
                // (in which case the filters need to be reapplied)
                if (match[3]) {
                    // Remove any enclosing parenthesis
                    source = match[5].replace(/(^\()|(\)$)/g, '');
                    // match all after | but not after ||
                    var filterMatch = match[5].match(/^\s*(?:[\s\S]+?)(?:[^\|]|\|\|)+([\s\S]*)\s*$/);
                    if(filterMatch && filterMatch[1].trim()) {
                        filters = filterMatch[1];
                        source = source.replace(filters, '');
                    }
                }

                return {
                    itemName: match[4] || match[2], // (lhs) Left-hand side,
                    keyName: match[3], //for (key, value) syntax
                    source: $parse(source),
                    filters: filters,
                    trackByExp: match[6],
                    modelMapper: $parse(match[1] || match[4] || match[2]),
                    repeatExpression: function (grouped) {
                        var expression = this.itemName + ' in ' + (grouped ? '$group.items' : '$select.items');
                        if (this.trackByExp) {
                            expression += ' track by ' + this.trackByExp;
                        }
                        return expression;
                    }
                };

            };

            self.getGroupNgRepeatExpression = function() {
                return '$group in $select.groups track by $group.name';
            };


        }])
        .constant('mcCodeSelectConfig', {
            EMPTY_SEARCH: '',
            searchEnabled: true,
            sortable: false,
            placeholder: '',
            refreshDelay: 1000, // In milliseconds
            closeOnSelect: true,
            dropdownPosition: 'auto',
            removeSelected: true,
            resetSearchInput: true,
            skipFocusser: false,
            generateId: function() {
                return latestId++;
            },
            appendToBody: false,
            spinnerEnabled: false,
            spinnerClass: 'glyphicon-refresh ui-select-spin'
        })
        .directive('mcTranscludeAppend', function () {
            return {
                link: function (scope, element, attrs, ctrl, transclude) {
                    transclude(scope, function (clone) {
                        element.append(clone);
                    });
                }
            };
        })

        .directive('mcCodeSelectChoices', ['mcCodeSelectConfig', 'mcCodeRepeatParser', '$compile', '$window',
            function(mcCodeSelectConfig, RepeatParser, $compile, $window) {

                return {
                    restrict: 'EA',
                    require: '^mcCodeSelect',
                    replace: true,
                    transclude: true,
                    templateUrl: 'template/mc/code/choices.tpl.html',
                    compile: function (tElement, tAttrs) {

                        if (!tAttrs.repeat) throw mcCodeSelectMinErr('repeat', "Expected 'repeat' expression.");

                        // var repeat = RepeatParser.parse(attrs.repeat);
                        var groupByExp = tAttrs.groupBy;
                        var groupFilterExp = tAttrs.groupFilter;

                        if (groupByExp) {
                            var groups = tElement.querySelectorAll('.ui-select-choices-group');
                            if (groups.length !== 1) throw uiSelectMinErr('rows', "Expected 1 .ui-select-choices-group but got '{0}'.", groups.length);
                            groups.attr('ng-repeat', RepeatParser.getGroupNgRepeatExpression());
                        }

                        var parserResult = RepeatParser.parse(tAttrs.repeat);

                        var choices = tElement.querySelectorAll('.ui-select-choices-row');

                        choices.attr('ng-repeat', parserResult.repeatExpression(groupByExp));

                        var rowsInner = tElement.querySelectorAll('.ui-select-choices-row-inner');
                        rowsInner.attr('mc-transclude-append', '');

                        var clickTarget = $window.document.addEventListener ? choices : rowsInner;
                        clickTarget.attr('ng-click', '$select.select(' + parserResult.itemName + ',$select.skipFocusser,$event)');

                        // if (angular.isDefined(tAttrs.multiple))
                        //     tElement.append("<div mc-code-select-multiple/>").removeAttr('multiple');
                        // else
                        //     tElement.append("<div mc-code-select-single/>");

                        return function link(scope, element, attrs, $select, transcludeFn) {
                            var groupByExp = attrs.groupBy;
                            var groupFilterExp = attrs.groupFilter;

                            $select.parseRepeatAttr(attrs.repeat, groupByExp, groupFilterExp); //Result ready at $select.parserResult

                            scope.$on('$destroy', function() {
                                choices.remove();
                            });

                            scope.$watch('$select.search', function(newValue) {
                                if(newValue && !$select.open && $select.multiple) $select.activate(false, true);
                                $select.activeIndex = $select.tagging.isActivated ? -1 : 0;
                                if (!attrs.minimumInputLength || $select.search.length >= attrs.minimumInputLength) {
                                    $select.refresh(attrs.refresh);
                                } else {
                                    $select.items = [];
                                }
                            });

                            attrs.$observe('refreshDelay', function() {
                                // $eval() is needed otherwise we get a string instead of a number
                                var refreshDelay = scope.$eval(attrs.refreshDelay);
                                $select.refreshDelay = refreshDelay !== undefined ? refreshDelay : mcCodeSelectConfig.refreshDelay;
                            });
                        }
                    }
                }
            }
        ])

        .controller('mcCodeSelectCtrl', ['$scope', '$element', '$filter', '$$mcDebounce', 'mcCodeSelectConfig', 'mcCodeRepeatParser', '$injector', '$timeout', '$parse', '$window',
            function($scope, $element, $filter, $$mcDebounce, mcCodeSelectConfig, RepeatParser, $injector, $timeout, $parse, $window) {

                var ctrl = this;

                ctrl.placeholder = mcCodeSelectConfig.placeholder;
                ctrl.searchEnabled = mcCodeSelectConfig.searchEnabled;
                ctrl.sortable = mcCodeSelectConfig.sortable;
                ctrl.refreshDelay = mcCodeSelectConfig.refreshDelay;
                ctrl.paste = mcCodeSelectConfig.paste;
                ctrl.resetSearchInput = mcCodeSelectConfig.resetSearchInput;
                ctrl.refeshing = false;
                ctrl.spinnerEnabled = mcCodeSelectConfig.spinnerEnabled;
                ctrl.spinnerClass = mcCodeSelectConfig.spinnerClass;

                ctrl.removeSelected = mcCodeSelectConfig.removeSelected;
                ctrl.closeOnSelect = mcCodeSelectConfig.closeOnSelect;
                ctrl.skipFocusser = mcCodeSelectConfig.skipFocusser;
                ctrl.search = mcCodeSelectConfig.EMPTY_SEARCH;

                ctrl.activeIndex = 0;
                ctrl.items = [];
                ctrl.codes = [];
                ctrl.parentSourse = undefined;             //监视的父级变量
                ctrl.parent = undefined;

                ctrl.open = false;
                ctrl.focus = false;
                ctrl.disabled = false;
                ctrl.selected = undefined;

                ctrl.dropdownPosition = "auto";

                ctrl.focusser = undefined;
                ctrl.multiple = undefined;
                ctrl.disableChoiceExpression = undefined;
                ctrl.tagging = {isActivated: false, fct: undefined};
                ctrl.taggingTokens = {isActivated: false, tokens: undefined};
                ctrl.lockChoiceExpression = undefined;
                ctrl.clickTriggeredSelect = false;
                ctrl.$filter = $filter;
                ctrl.$element = $element;

                ctrl.$animate = (function(){
                    try {
                        return $injector.get('$animate');
                    }catch (err) {
                        return null;
                    }
                })();

                ctrl.searchInput = $element.querySelectorAll('input.ui-select-search');

                //判断是否为空对象 add by zhangwei
                function isEmptyObject(e) {
                    var t;
                    for (t in e)
                        return !1;
                    return !0
                }

                ctrl.isEmpty = function() {

                    var flag=angular.isUndefined(ctrl.selected) || isEmptyObject(ctrl.selected)|| ctrl.selected === null || ctrl.selected === '' || (ctrl.multiple && ctrl.selected.length === 0);
                    return !!flag
                };

                function _findIndex(collection, predicate, thisArg) {
                    if (collection.findIndex){
                        return collection.findIndex(predicate, thisArg);
                    } else {
                        var list = Object(collection);
                        var length = list.length >>> 0;
                        var value;

                        for (var i = 0; i < length; i++) {
                            value = list[i];
                            if (predicate.call(thisArg, value, i, list)) {
                                return i;
                            }
                        }
                        return -1;
                    }
                }

                // Most of the time the user does not want to empty the search input when in typeahead mode
                function _resetSearchInput() {
                    if (ctrl.resetSearchInput) {
                        ctrl.search = mcCodeSelectConfig.EMPTY_SEARCH;
                        //reset activeIndex
                        if(ctrl.items){//add by zw 解决items undefined时报错问题
                            if (ctrl.selected && ctrl.items.length && !ctrl.multiple) {
                                ctrl.activeIndex = _findIndex(ctrl.items, function(item){
                                    return angular.equals(this, item);
                                }, ctrl.selected);
                            }
                        }
                    }
                }

                function _groupsFilter(groups, groupNames) {
                    var i, j, result = [];
                    for(i = 0; i < groupNames.length ;i++){
                        for(j = 0; j < groups.length ;j++){
                            if(groups[j].name == [groupNames[i]]){
                                result.push(groups[j]);
                            }
                        }
                    }
                    return result;
                }

                // When the user clicks on ui-select, displays the dropdown list
                ctrl.activate = function(initSearchValue, avoidReset) {
                    if (!ctrl.disabled  && !ctrl.open) {
                        if(!avoidReset) _resetSearchInput();

                        $scope.$broadcast('mc:activate');

                        ctrl.open = true;

                        if (ctrl.items){
                            ctrl.activeIndex = ctrl.activeIndex >= ctrl.items.length ? 0 : ctrl.activeIndex;
                        }

                        // ensure that the index is set to zero for tagging variants
                        // that where first option is auto-selected
                        if (ctrl.activeIndex === -1 && ctrl.taggingLabel !== false) {
                            ctrl.activeIndex = 0;
                        }

                        var container = $element.querySelectorAll('.ui-select-choices-content');
                        var searchInput = $element.querySelectorAll('.ui-select-search');
                        if (ctrl.$animate && ctrl.$animate.on && ctrl.$animate.enabled(container[0])) {
                            var animateHandler = function(elem, phase) {
                                if (phase === 'start' && ctrl.items.length === 0) {
                                    // Only focus input after the animation has finished
                                    ctrl.$animate.off('removeClass', searchInput[0], animateHandler);
                                    $timeout(function () {
                                        ctrl.focusSearchInput(initSearchValue);
                                    });
                                } else if (phase === 'close') {
                                    // Only focus input after the animation has finished
                                    ctrl.$animate.off('enter', container[0], animateHandler);
                                    $timeout(function () {
                                        ctrl.focusSearchInput(initSearchValue);
                                    });
                                }
                            };

                            if (ctrl.items.length > 0) {
                                ctrl.$animate.on('enter', container[0], animateHandler);
                            } else {
                                ctrl.$animate.on('removeClass', searchInput[0], animateHandler);
                            }
                        } else {
                            $timeout(function () {
                                ctrl.focusSearchInput(initSearchValue);
                                if(!ctrl.tagging.isActivated && ctrl.items.length > 1) {
                                    _ensureHighlightVisible();
                                }
                            });
                        }
                    }
                    else if (ctrl.open && !ctrl.searchEnabled) {
                        // Close the selection if we don't have search enabled, and we click on the select again
                        ctrl.close();
                    }
                };

                ctrl.focusSearchInput = function (initSearchValue) {
                    ctrl.search = initSearchValue || ctrl.search;
                    ctrl.searchInput[0].focus();
                };

                ctrl.findGroupByName = function(name) {
                    return ctrl.groups && ctrl.groups.filter(function(group) {
                            return group.name === name;
                        })[0];
                };

                ctrl.parseRepeatAttr = function(repeatAttr, groupByExp, groupFilterExp) {
                    function updateGroups(items) {
                        var groupFn = $scope.$eval(groupByExp);
                        ctrl.groups = [];
                        angular.forEach(items, function(item) {
                            var groupName = angular.isFunction(groupFn) ? groupFn(item) : item[groupFn];
                            var group = ctrl.findGroupByName(groupName);
                            if(group) {
                                group.items.push(item);
                            }
                            else {
                                ctrl.groups.push({name: groupName, items: [item]});
                            }
                        });
                        if(groupFilterExp){
                            var groupFilterFn = $scope.$eval(groupFilterExp);
                            if( angular.isFunction(groupFilterFn)){
                                ctrl.groups = groupFilterFn(ctrl.groups);
                            } else if(angular.isArray(groupFilterFn)){
                                ctrl.groups = _groupsFilter(ctrl.groups, groupFilterFn);
                            }
                        }
                        ctrl.items = [];
                        ctrl.groups.forEach(function(group) {
                            ctrl.items = ctrl.items.concat(group.items);
                        });
                    }

                    function setPlainItems(items) {
                        ctrl.items = items;
                    }

                    ctrl.setItemsFn = groupByExp ? updateGroups : setPlainItems;

                    ctrl.parserResult = RepeatParser.parse(repeatAttr);

                    ctrl.isGrouped = !!groupByExp;
                    ctrl.itemProperty = ctrl.parserResult.itemName;

                    //If collection is an Object, convert it to Array

                    var originalSource = ctrl.parserResult.source;

                    //When an object is used as source, we better create an array and use it as 'source'
                    var createArrayFromObject = function(){
                        var origSrc = originalSource($scope);
                        $scope.$uisSource = Object.keys(origSrc).map(function(v){
                            var result = {};
                            result[ctrl.parserResult.keyName] = v;
                            result.value = origSrc[v];
                            return result;
                        });
                    };

                    if (ctrl.parserResult.keyName){ // Check for (key,value) syntax
                        createArrayFromObject();
                        ctrl.parserResult.source = $parse('$uisSource' + ctrl.parserResult.filters);
                        $scope.$watch(originalSource, function(newVal, oldVal){
                            if (newVal !== oldVal) createArrayFromObject();
                        }, true);
                    }

                    ctrl.refreshItems = function (data){
                        data = data || ctrl.parserResult.source($scope);
                        var selectedItems = ctrl.selected;
                        //TODO should implement for single mode removeSelected
                        if (ctrl.isEmpty() || (angular.isArray(selectedItems) && !selectedItems.length) || !ctrl.multiple || !ctrl.removeSelected) {
                            ctrl.setItemsFn(data);
                        }else{
                            if ( data !== undefined && data !== null ) {
                                var filteredItems = data.filter(function(i) {
                                    return angular.isArray(selectedItems) ? selectedItems.every(function(selectedItem) {
                                        return !angular.equals(i, selectedItem);
                                    }) : !angular.equals(i, selectedItems);
                                });
                                ctrl.setItemsFn(filteredItems);
                            }
                        }
                        if (ctrl.dropdownPosition === 'auto' || ctrl.dropdownPosition === 'up'){
                            $scope.calculateDropdownPos();
                        }

                        $scope.$broadcast('mc:refresh');
                    };

                    // See https://github.com/angular/angular.js/blob/v1.2.15/src/ng/directive/ngRepeat.js#L259
                    $scope.$watchCollection(ctrl.parserResult.source, function(items) {
                        if (items === undefined || items === null) {
                            // If the user specifies undefined or null => reset the collection
                            // Special case: items can be undefined if the user did not initialized the collection on the scope
                            // i.e $scope.addresses = [] is missing
                            ctrl.items = [];
                        } else {
                            if (!angular.isArray(items)) {
                                throw uiSelectMinErr('items', "Expected an array but got '{0}'.", items);
                            } else {
                                //Remove already selected items (ex: while searching)
                                //TODO Should add a test
                                ctrl.refreshItems(items);

                                //update the view value with fresh data from items, if there is a valid model value
                                if(angular.isDefined(ctrl.ngModel.$modelValue)) {
                                    ctrl.ngModel.$modelValue = null; //Force scope model value and ngModel value to be out of sync to re-run formatters
                                }
                            }
                        }
                    });

                };

                var _refreshDelayPromise;

                /**
                 * Typeahead mode: lets the user refresh the collection using his own function.
                 *
                 * See Expose $select.search for external / remote filtering https://github.com/angular-ui/ui-select/pull/31
                 */
                ctrl.refresh = function(refreshAttr) {
                    if (refreshAttr !== undefined) {
                        // Debounce
                        // See https://github.com/angular-ui/bootstrap/blob/0.10.0/src/typeahead/typeahead.js#L155
                        // FYI AngularStrap typeahead does not have debouncing: https://github.com/mgcrea/angular-strap/blob/v2.0.0-rc.4/src/typeahead/typeahead.js#L177
                        if (_refreshDelayPromise) {
                            $timeout.cancel(_refreshDelayPromise);
                        }
                        _refreshDelayPromise = $timeout(function() {
                            var refreshPromise =  $scope.$eval(refreshAttr);
                            if (refreshPromise && angular.isFunction(refreshPromise.then) && !ctrl.refreshing) {
                                ctrl.refreshing = true;
                                refreshPromise.then(function() {
                                    ctrl.refreshing = false;
                                });
                            }}, ctrl.refreshDelay);
                    }
                };

                ctrl.isActive = function(itemScope) {
                    if (!ctrl.open) return false;

                    var itemIndex = ctrl.items.indexOf(itemScope[ctrl.itemProperty]);
                    var isActive = itemIndex == ctrl.activeIndex;

                    return isActive;
                };

                var _isItemSelected = function (item) {
                    return (ctrl.selected && angular.isArray(ctrl.selected) &&
                    ctrl.selected.filter(function (selection) { return angular.equals(selection, item); }).length > 0);
                };

                var disabledItems = [];

                function _updateItemDisabled(item, isDisabled) {
                    var disabledItemIndex = disabledItems.indexOf(item);
                    if (isDisabled && disabledItemIndex === -1) {
                        disabledItems.push(item);
                    }

                    if (!isDisabled && disabledItemIndex > -1) {
                        disabledItems.splice(disabledItemIndex, 1);
                    }
                }

                function _isItemDisabled(item) {
                    return disabledItems.indexOf(item) > -1;
                }

                ctrl.isDisabled = function(itemScope) {

                    if (!ctrl.open) return;

                    var item = itemScope[ctrl.itemProperty];
                    var itemIndex = ctrl.items.indexOf(item);
                    var isDisabled = false;

                    if (itemIndex >= 0 && (angular.isDefined(ctrl.disableChoiceExpression) || ctrl.multiple)) {

                        if (item.isTag) return false;

                        if (ctrl.multiple) {
                            isDisabled = _isItemSelected(item);
                        }

                        if (!isDisabled && angular.isDefined(ctrl.disableChoiceExpression)) {
                            isDisabled = !!(itemScope.$eval(ctrl.disableChoiceExpression));
                        }

                        _updateItemDisabled(item, isDisabled);
                    }

                    return isDisabled;
                };

                ctrl.select = function(item, skipFocusser, $event) {
                    if (item === undefined || !_isItemDisabled(item)) {

                        if ( (!ctrl.items || !ctrl.items.length) && ! ctrl.search && ! ctrl.tagging.isActivated) return;

                        if (!item || !_isItemDisabled(item)) {
                            // if click is made on existing item, prevent from tagging, ctrl.search does not matter
                            ctrl.clickTriggeredSelect = false;
                            if($event && ($event.type === 'click' || $event.type === 'touchend') && item)
                                ctrl.clickTriggeredSelect = true;

                            if(ctrl.tagging.isActivated && ctrl.clickTriggeredSelect === false) {
                                // if taggingLabel is disabled and item is undefined we pull from ctrl.search
                                if ( ctrl.taggingLabel === false ) {
                                    if ( ctrl.activeIndex < 0 ) {
                                        if (item === undefined) {
                                            item = ctrl.tagging.fct !== undefined ? ctrl.tagging.fct(ctrl.search) : ctrl.search;
                                        }
                                        if (!item || angular.equals( ctrl.items[0], item ) ) {
                                            return;
                                        }
                                    } else {
                                        // keyboard nav happened first, user selected from dropdown
                                        item = ctrl.items[ctrl.activeIndex];
                                    }
                                } else {
                                    // tagging always operates at index zero, taggingLabel === false pushes
                                    // the ctrl.search value without having it injected
                                    if ( ctrl.activeIndex === 0 ) {
                                        // ctrl.tagging pushes items to ctrl.items, so we only have empty val
                                        // for `item` if it is a detected duplicate
                                        if ( item === undefined ) return;

                                        // create new item on the fly if we don't already have one;
                                        // use tagging function if we have one
                                        if ( ctrl.tagging.fct !== undefined && typeof item === 'string' ) {
                                            item = ctrl.tagging.fct(item);
                                            if (!item) return;
                                            // if item type is 'string', apply the tagging label
                                        } else if ( typeof item === 'string' ) {
                                            // trim the trailing space
                                            item = item.replace(ctrl.taggingLabel,'').trim();
                                        }
                                    }
                                }
                                // search ctrl.selected for dupes potentially caused by tagging and return early if found
                                if (_isItemSelected(item)) {
                                    ctrl.close(skipFocusser);
                                    return;
                                }
                            }
                            _resetSearchInput();
                            $scope.$broadcast('mc:select', item);

                            var locals = {};
                            if(ctrl.parserResult){
                                locals[ctrl.parserResult.itemName] = item;
                            }

                            $timeout(function(){
                                ctrl.onSelectCallback($scope, {
                                    $code: $parse('code.code')($scope, locals)
                                });
                            });

                            if (ctrl.closeOnSelect) {
                                ctrl.close(skipFocusser);
                            }
                        }
                    }
                };

                ctrl.close = function(skipFocusser) {
                    if (!ctrl.open) return;

                    ctrl.open = false;
                };

                ctrl.setFocus = function(){
                    if (!ctrl.focus) ctrl.focusInput[0].focus();
                };

                ctrl.clear = function($event) {
                    ctrl.select(undefined);
                    $event.stopPropagation();
                    $timeout(function() {
                        ctrl.focusser[0].focus();
                    }, 0, false);
                };

                ctrl.toggle = function(e) {
                    if (ctrl.open) {
                        ctrl.close();
                        e.preventDefault();
                        e.stopPropagation();
                    }else{
                        ctrl.activate();
                    }
                };

                // Set default function for locked choices - avoids unnecessary
                // logic if functionality is not being used
                ctrl.isLocked = function () {
                    return false;
                };

                $scope.$watch(function () {
                    return angular.isDefined(ctrl.lockChoiceExpression) && ctrl.lockChoiceExpression !== "";
                }, _initaliseLockedChoices);

                function _initaliseLockedChoices(doInitalise) {
                    if(!doInitalise) return;

                    var lockedItems = [];

                    function _updateItemLocked(item, isLocked) {
                        var lockedItemIndex = lockedItems.indexOf(item);
                        if (isLocked && lockedItemIndex === -1) {
                            lockedItems.push(item);
                        }

                        if (!isLocked && lockedItemIndex > -1) {
                            lockedItems.splice(lockedItemIndex, 0);
                        }
                    }

                    function _isItemlocked(item) {
                        return lockedItems.indexOf(item) > -1;
                    }

                    ctrl.isLocked = function (itemScope, itemIndex) {
                        var isLocked = false,
                            item = ctrl.selected[itemIndex];

                        if(item) {
                            if (itemScope) {
                                isLocked = !!(itemScope.$eval(ctrl.lockChoiceExpression));
                                _updateItemLocked(item, isLocked);
                            } else {
                                isLocked = _isItemlocked(item);
                            }
                        }

                        return isLocked;
                    };
                }

                var sizeWatch = null;
                var updaterScheduled = false;
                ctrl.sizeSearchInput = function() {

                    var input = ctrl.searchInput[0],
                        // container = ctrl.searchInput.parent().parent()[0],
                        container = ctrl.searchInput.parent()[0],
                        calculateContainerWidth = function() {
                            // Return the container width only if the search input is visible
                            return container.clientWidth * !!input.offsetParent;
                        },
                        updateIfVisible = function(containerWidth) {
                            if (containerWidth === 0) {
                                return false;
                            }
                            var inputWidth = containerWidth - input.offsetLeft;
                            if (inputWidth < 50) inputWidth = containerWidth;
                            ctrl.searchInput.css('width', inputWidth+'px');
                            return true;
                        };

                    ctrl.searchInput.css('width', '10px');
                    $timeout(function() { //Give tags time to render correctly
                        if (sizeWatch === null && !updateIfVisible(calculateContainerWidth())) {
                            sizeWatch = $scope.$watch(function() {
                                if (!updaterScheduled) {
                                    updaterScheduled = true;
                                    $scope.$$postDigest(function() {
                                        updaterScheduled = false;
                                        if (updateIfVisible(calculateContainerWidth())) {
                                            sizeWatch();
                                            sizeWatch = null;
                                        }
                                    });
                                }
                            }, angular.noop);
                        }
                    },50);
                };

                function _handleDropDownSelection(key) {
                    var processed = true;
                    switch (key) {
                        case KEY.DOWN:
                            if (!ctrl.open && ctrl.multiple) ctrl.activate(false, true); //In case its the search input in 'multiple' mode
                            else if (ctrl.activeIndex < ctrl.items.length - 1) { ctrl.activeIndex++; }
                            break;
                        case KEY.UP:
                            if (!ctrl.open && ctrl.multiple) ctrl.activate(false, true); //In case its the search input in 'multiple' mode
                            else if (ctrl.activeIndex > 0 || (ctrl.search.length === 0 && ctrl.tagging.isActivated && ctrl.activeIndex > -1)) { ctrl.activeIndex--; }
                            break;
                        case KEY.TAB:
                            if (!ctrl.multiple || ctrl.open) ctrl.select(ctrl.items[ctrl.activeIndex], true);
                            break;
                        case KEY.ENTER:
                            if(ctrl.open && (ctrl.tagging.isActivated || ctrl.activeIndex >= 0)){
                                ctrl.select(ctrl.items[ctrl.activeIndex], ctrl.skipFocusser); // Make sure at least one dropdown item is highlighted before adding if not in tagging mode
                            } else {
                                ctrl.activate(false, true); //In case its the search input in 'multiple' mode
                            }
                            break;
                        case KEY.ESC:
                            ctrl.close();
                            break;
                        default:
                            processed = false;
                    }
                    return processed;
                }

                // Bind to keyboard shortcuts
                ctrl.searchInput.on('keydown', function(e) {

                    var key = e.which;

                    if (~[KEY.ENTER,KEY.ESC].indexOf(key)){
                        e.preventDefault();
                        e.stopPropagation();
                    }

                    $scope.$apply(function() {

                        var tagged = false;

                        if (ctrl.codes.length > 0 || ctrl.tagging.isActivated) {
                            _handleDropDownSelection(key);
                            if ( ctrl.taggingTokens.isActivated ) {
                                for (var i = 0; i < ctrl.taggingTokens.tokens.length; i++) {
                                    if ( ctrl.taggingTokens.tokens[i] === KEY.MAP[e.keyCode] ) {
                                        // make sure there is a new value to push via tagging
                                        if ( ctrl.search.length > 0 ) {
                                            tagged = true;
                                        }
                                    }
                                }
                                if ( tagged ) {
                                    $timeout(function() {
                                        ctrl.searchInput.triggerHandler('tagged');
                                        var newItem = ctrl.search.replace(KEY.MAP[e.keyCode],'').trim();
                                        if ( ctrl.tagging.fct ) {
                                            newItem = ctrl.tagging.fct( newItem );
                                        }
                                        if (newItem) ctrl.select(newItem, true);
                                    });
                                }
                            }
                        }else{
                            e.preventDefault();
                            e.stopPropagation();
                        }

                    });

                    if(KEY.isVerticalMovement(key) && ctrl.items.length > 0){
                        _ensureHighlightVisible();
                    }

                    if (key === KEY.ENTER || key === KEY.ESC) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                });

                ctrl.searchInput.on('paste', function (e) {
                    var data;

                    if (window.clipboardData && window.clipboardData.getData) { // IE
                        data = window.clipboardData.getData('Text');
                    } else {
                        data = (e.originalEvent || e).clipboardData.getData('text/plain');
                    }

                    // Prepend the current input field text to the paste buffer.
                    data = ctrl.search + data;

                    if (data && data.length > 0) {
                        // If tagging try to split by tokens and add items
                        if (ctrl.taggingTokens.isActivated) {
                            var items = [];
                            for (var i = 0; i < ctrl.taggingTokens.tokens.length; i++) {  // split by first token that is contained in data
                                var separator = KEY.toSeparator(ctrl.taggingTokens.tokens[i]) || ctrl.taggingTokens.tokens[i];
                                if (data.indexOf(separator) > -1) {
                                    items = data.split(separator);
                                    break;  // only split by one token
                                }
                            }
                            if (items.length === 0) {
                                items = [data];
                            }
                            var oldsearch = ctrl.search;
                            angular.forEach(items, function (item) {
                                var newItem = ctrl.tagging.fct ? ctrl.tagging.fct(item) : item;
                                if (newItem) {
                                    ctrl.select(newItem, true);
                                }
                            });
                            ctrl.search = oldsearch || mcCodeSelectConfig.EMPTY_SEARCH;
                            e.preventDefault();
                            e.stopPropagation();
                        } else if (ctrl.paste) {
                            ctrl.paste(data);
                            ctrl.search = mcCodeSelectConfig.EMPTY_SEARCH;
                            e.preventDefault();
                            e.stopPropagation();
                        }
                    }
                });

                ctrl.searchInput.on('tagged', function() {
                    $timeout(function() {
                        _resetSearchInput();
                    });
                });

                function _ensureHighlightVisible() {
                    var container = $element.querySelectorAll('.ui-select-choices-content');
                    var choices = container.querySelectorAll('.ui-select-choices-row');
                    if (choices.length < 1) {
                        // throw uiSelectMinErr('choices', "Expected multiple .ui-select-choices-row but got '{0}'.", choices.length);
                    }

                    if (ctrl.activeIndex < 0) {
                        return;
                    }

                    var highlighted = choices[ctrl.activeIndex];
                    var posY = highlighted.offsetTop + highlighted.clientHeight - container[0].scrollTop;
                    var height = container[0].offsetHeight;

                    if (posY > height) {
                        container[0].scrollTop += posY - height;
                    } else if (posY < highlighted.clientHeight) {
                        if (ctrl.isGrouped && ctrl.activeIndex === 0)
                            container[0].scrollTop = 0; //To make group header visible when going all the way up
                        else
                            container[0].scrollTop -= highlighted.clientHeight - posY;
                    }
                }

                var onResize = $$mcDebounce(function() {
                    ctrl.sizeSearchInput();
                }, 50);

                angular.element($window).bind('resize', onResize);

                $scope.$on('$destroy', function() {
                    ctrl.searchInput.off('keyup keydown tagged blur paste');
                    angular.element($window).off('resize', onResize);
                });

                $scope.$watch('$select.activeIndex', function(activeIndex) {
                    if (activeIndex)
                        $element.find('input').attr(
                            'aria-activedescendant',
                            'ui-select-choices-row-' + ctrl.generatedId + '-' + activeIndex);
                });

                $scope.$watch('$select.open', function(open) {
                    if (!open)
                        $element.find('input').removeAttr('aria-activedescendant');
                });

            }])
        .directive('mcCodeSelect', ['mcCodeSelectConfig', 'mcCodeSelectMinErr', 'mcOffset', '$$code', '$compile', '$parse', '$timeout', '$document',
            function (mcCodeSelectConfig, mcCodeSelectMinErr, mcOffset, $$code, $compile, $parse, $timeout, $document) {
                return {
                    restrict: 'EA',
                    templateUrl: function(tElement, tAttrs) {
                        return 'template/mc/code/' + (angular.isDefined(tAttrs.multiple) ? 'mc-code-select-multiple.tpl.html' : 'mc-code-select.tpl.html');
                    },
                    replace: true,
                    require: ['mcCodeSelect', '^ngModel'],
                    // transclude: true,
                    scope: true,
                    controller: 'mcCodeSelectCtrl',
                    controllerAs: '$select',
                    compile:function(tElement, tAttrs) {

                        // Allow setting ngClass on uiSelect
                        var match = /{(.*)}\s*{(.*)}/.exec(tAttrs.ngClass);
                        if(match) {
                            var combined = '{'+ match[1] +', '+ match[2] +'}';
                            tAttrs.ngClass = combined;
                            tElement.attr('ng-class', combined);
                        }

                        //Multiple or Single depending if multiple attribute presence
                        if (angular.isDefined(tAttrs.multiple))
                            tElement.append('<div mc-code-select-multiple/>').removeAttr('multiple');
                        else
                            tElement.append('<div mc-code-select-single/>');

                        if (tAttrs.inputId)
                            tElement.querySelectorAll('input.ui-select-search')[0].id = tAttrs.inputId;

                        return function link(scope, element, attrs, ctrls) {

                            var $select = ctrls[0];
                            var ngModel = ctrls[1];

                            // add by zw （处理级联bug）
                            ngModel.$viewChangeListeners.push(function(){
                                $parse(attrs.ngModel).assign(scope, ngModel.$viewValue.code);
                            });

                            $select.generatedId = mcCodeSelectConfig.generateId();
                            $select.baseTitle = attrs.title || '选择';
                            $select.focusserTitle = $select.baseTitle + ' focus';
                            $select.focusserId = 'focusser-' + $select.generatedId;
                            $select.allowClear = attrs.allowClear ? attrs.allowClear : true;//删除按钮开关 add by zw

                            //数据字典数据类型
                            $select.code = attrs.code;
                            $select.codes = codes[attrs.code];
                            $select.items = angular.copy($select.codes);

                            $select.closeOnSelect = function() {
                                if (angular.isDefined(attrs.closeonSelect)) {
                                    return $parse(attrs.closeonSelect)();
                                } else {
                                    return mcCodeSelectConfig.closeOnSelect;
                                }
                            }();

                            scope.$watch('skipFocusser', function() {
                                var skipFocusser = scope.$eval(attrs.skipFocusser);
                                $select.skipFocusser = skipFocusser !== undefined ? skipFocusser : mcCodeSelectConfig.skipFocusser;
                            });

                            $select.onSelectCallback = $parse(attrs.onSelect);
                            $select.onRemoveCallback = $parse(attrs.onRemove);

                            //Set reference to ngModel from uiSelectCtrl
                            $select.ngModel = ngModel;

                            $select.choiceGrouped = function(group){
                                return $select.isGrouped && group && group.name;
                            };

                            // if(attrs.tabindex){
                            //     attrs.$observe('tabindex', function(value) {
                            //         $select.focusInput.attr('tabindex', value);
                            //         element.removeAttr('tabindex');
                            //     });
                            // }

                            scope.$watch(function () { return scope.$eval(attrs.searchEnabled); }, function(newVal) {
                                $select.searchEnabled = newVal !== undefined ? newVal : mcCodeSelectConfig.searchEnabled;
                            });

                            scope.$watch('sortable', function() {
                                var sortable = scope.$eval(attrs.sortable);
                                $select.sortable = sortable !== undefined ? sortable : mcCodeSelectConfig.sortable;
                            });

                            attrs.$observe('limit', function() {
                                //Limit the number of selections allowed
                                $select.limit = (angular.isDefined(attrs.limit)) ? parseInt(attrs.limit, 10) : undefined;
                            });

                            scope.$watch('removeSelected', function() {
                                var removeSelected = scope.$eval(attrs.removeSelected);
                                $select.removeSelected = removeSelected !== undefined ? removeSelected : mcCodeSelectConfig.removeSelected;
                            });

                            attrs.$observe('disabled', function() {
                                // No need to use $eval() (thanks to ng-disabled) since we already get a boolean instead of a string
                                $select.disabled = attrs.disabled !== undefined ? attrs.disabled : false;
                            });

                            //是否显示Code值  yangweichao
                            attrs.$observe('showCode', function() {
                                // $eval() is needed otherwise we get a string instead of a boolean
                                var showCode = scope.$eval(attrs.showCode);
                                $select.showCode = showCode !== undefined ? showCode : false;
                            });

                            //是否显示下拉框边框  yangweichao
                            attrs.$observe('boderStyle', function() {
                                // $eval() is needed otherwise we get a string instead of a boolean
                                var boderStyle = attrs.boderStyle;
                                $select.boderStyle = boderStyle !== undefined ? boderStyle : '1px solid #dfdfdf';
                            });

                            attrs.$observe('resetSearchInput', function() {
                                // $eval() is needed otherwise we get a string instead of a boolean
                                var resetSearchInput = scope.$eval(attrs.resetSearchInput);
                                $select.resetSearchInput = resetSearchInput !== undefined ? resetSearchInput : true;
                            });

                            attrs.$observe('paste', function() {
                                $select.paste = scope.$eval(attrs.paste);
                            });

                            attrs.$observe('tagging', function() {
                                if(attrs.tagging !== undefined)
                                {
                                    // $eval() is needed otherwise we get a string instead of a boolean
                                    var taggingEval = scope.$eval(attrs.tagging);
                                    $select.tagging = {isActivated: true, fct: taggingEval !== true ? taggingEval : undefined};
                                }
                                else
                                {
                                    $select.tagging = {isActivated: false, fct: undefined};
                                }
                            });

                            attrs.$observe('taggingLabel', function() {
                                if(attrs.tagging !== undefined )
                                {
                                    // check eval for FALSE, in this case, we disable the labels
                                    // associated with tagging
                                    if ( attrs.taggingLabel === 'false' ) {
                                        $select.taggingLabel = false;
                                    }
                                    else
                                    {
                                        $select.taggingLabel = attrs.taggingLabel !== undefined ? attrs.taggingLabel : '(new)';
                                    }
                                }
                            });

                            attrs.$observe('taggingTokens', function() {
                                if (attrs.tagging !== undefined) {
                                    var tokens = attrs.taggingTokens !== undefined ? attrs.taggingTokens.split('|') : [',','ENTER'];
                                    $select.taggingTokens = {isActivated: true, tokens: tokens };
                                }
                            });

                            attrs.$observe('spinnerEnabled', function() {
                                // $eval() is needed otherwise we get a string instead of a boolean
                                var spinnerEnabled = scope.$eval(attrs.spinnerEnabled);
                                $select.spinnerEnabled = spinnerEnabled !== undefined ? spinnerEnabled : mcCodeSelectConfig.spinnerEnabled;
                            });

                            attrs.$observe('spinnerClass', function() {
                                var spinnerClass = attrs.spinnerClass;
                                $select.spinnerClass = spinnerClass !== undefined ? attrs.spinnerClass : mcCodeSelectConfig.spinnerClass;
                            });

                            //Automatically gets focus when loaded
                            if (angular.isDefined(attrs.autofocus)){
                                $timeout(function(){
                                    $select.setFocus();
                                });
                            }

                            //Gets focus based on scope event name (e.g. focus-on='SomeEventName')
                            if (angular.isDefined(attrs.focusOn)){
                                scope.$on(attrs.focusOn, function() {
                                    $timeout(function(){
                                        $select.setFocus();
                                    });
                                });
                            }

                            if(attrs.parent) {
                                $select.parentSource = $parse(attrs.parent);

                                scope.$watch($select.parentSource, function(parent) {

                                    if(parent) {

                                        // if($select.parent == parent)
                                            // return;

                                        $select.parent = parent;

                                        $$code.getCodes($select.code, {
                                            success: function(codes) {
                                                $select.codes = codes;
                                                $select.items = angular.copy($select.codes);
                                                $select.search = mcCodeSelectConfig.EMPTY_SEARCH;
                                                // scope.$broadcast('mc:clear');
                                                $select.activeIndex = -1;

                                                $timeout(function(){
                                                    if($parse(attrs.ngModel)){

                                                        var viewModel=scope.$eval(attrs.ngModel);
                                                        if(viewModel){
                                                            //如果有对应的值则选择上
                                                            var isHasModel=false;
                                                            $.each($select.items,function(index,target){
                                                                if(target.code==viewModel){
                                                                    isHasModel=true;
                                                                    if($select.selected)
                                                                        $select.selected = target;
                                                                }
                                                            });
                                                            if(!isHasModel&&$select.codes[0]){
                                                                //如果没有默认选择第一个
                                                                $select.selected = $select.codes[0];
                                                                $parse(attrs['ngModel']).assign(scope, $select.codes[0].code);
                                                            }
                                                        }else{
                                                            if($select.codes[0]){
                                                                $select.selected = $select.codes[0];
                                                                $parse(attrs['ngModel']).assign(scope, $select.codes[0].code);
                                                            }
                                                        }
                                                    }else {
                                                        if($select.codes[0]){
                                                            $select.selected = $select.codes[0];
                                                            $parse(attrs['ngModel']).assign(scope, $select.codes[0].code);
                                                        }
                                                    }
                                                })
                                            },
                                            forceRemote:true,
                                            code: parent
                                        });
                                    }
                                });
                            }

                            //手动绑定下拉数据 add by Martin
                            if(attrs.data){
                                scope.$watch($parse(attrs.data), function(newValue,oldValue) {
                                    if(newValue) {
                                        $select.codes = newValue;
                                        $select.items = angular.copy($select.codes);
                                        $select.search = mcCodeSelectConfig.EMPTY_SEARCH;
                                        $select.activeIndex = -1;

                                        $timeout(function(){
                                            if($parse(attrs.ngModel)){

                                                var viewModel=scope.$eval(attrs.ngModel);
                                                if(viewModel){
                                                    //如果有对应的值则选择上
                                                    $.each($select.items,function(index,target){
                                                        if(target.code==viewModel){
                                                            if($select.selected)
                                                                $select.selected = target;
                                                        }
                                                    })
                                                }
                                            }
                                        });
                                    }
                                });

                            }

                            function onDocumentClick(e) {
                                if (!$select.open) return; //Skip it if dropdown is close

                                var contains = false;

                                if (window.jQuery) {
                                    // Firefox 3.6 does not support element.contains()
                                    // See Node.contains https://developer.mozilla.org/en-US/docs/Web/API/Node.contains
                                    contains = window.jQuery.contains(element[0], e.target);
                                } else {
                                    contains = element[0].contains(e.target);
                                }

                                if (!contains && !$select.clickTriggeredSelect) {
                                    var skipFocusser;
                                    if (!$select.skipFocusser) {
                                        //Will lose focus only with certain targets
                                        var focusableControls = ['input','button','textarea','select'];
                                        var targetController = angular.element(e.target).controller('mcCodeSelect'); //To check if target is other ui-select
                                        skipFocusser = targetController && targetController !== $select; //To check if target is other ui-select
                                        if (!skipFocusser) skipFocusser =  ~focusableControls.indexOf(e.target.tagName.toLowerCase()); //Check if target is input, button or textarea
                                    } else {
                                        skipFocusser = true;
                                    }
                                    $select.close(skipFocusser);
                                    scope.$digest();
                                }
                                $select.clickTriggeredSelect = false;
                            }

                            // See Click everywhere but here event http://stackoverflow.com/questions/12931369
                            $document.on('click', onDocumentClick);

                            scope.$on('$destroy', function() {
                                $document.off('click', onDocumentClick);
                            });

                            // Support for appending the select field to the body when its open
                            var appendToBody = scope.$eval(attrs.appendToBody);
                            if (appendToBody !== undefined ? appendToBody : mcCodeSelectConfig.appendToBody) {
                                scope.$watch('$select.open', function(isOpen) {
                                    if (isOpen) {
                                        positionDropdown();
                                    } else {
                                        resetDropdown();
                                    }
                                });

                                // Move the dropdown back to its original location when the scope is destroyed. Otherwise
                                // it might stick around when the user routes away or the select field is otherwise removed
                                scope.$on('$destroy', function() {
                                    resetDropdown();
                                });
                            }

                            // Hold on to a reference to the .ui-select-container element for appendToBody support
                            var placeholder = null,
                                originalWidth = '';

                            function positionDropdown() {
                                // Remember the absolute position of the element
                                var offset = mcOffset(element);

                                // Clone the element into a placeholder element to take its original place in the DOM
                                placeholder = angular.element('<div class="ui-select-placeholder"></div>');
                                placeholder[0].style.width = offset.width + 'px';
                                placeholder[0].style.height = offset.height + 'px';
                                element.after(placeholder);

                                // Remember the original value of the element width inline style, so it can be restored
                                // when the dropdown is closed
                                originalWidth = element[0].style.width;

                                // Now move the actual dropdown element to the end of the body
                                $document.find('body').append(element);

                                element[0].style.position = 'absolute';
                                element[0].style.left = offset.left + 'px';
                                element[0].style.top = offset.top + 'px';
                                element[0].style.width = offset.width + 'px';
                            }

                            function resetDropdown() {
                                if (placeholder === null) {
                                    // The dropdown has not actually been display yet, so there's nothing to reset
                                    return;
                                }

                                // Move the dropdown element back to its original location in the DOM
                                placeholder.replaceWith(element);
                                placeholder = null;

                                element[0].style.position = '';
                                element[0].style.left = '';
                                element[0].style.top = '';
                                element[0].style.width = originalWidth;

                                // Set focus back on to the moved element
                                $select.setFocus();
                            }

                            // Hold on to a reference to the .ui-select-dropdown element for direction support.
                            var dropdown = null,
                                directionUpClassName = 'direction-up';

                            // Support changing the direction of the dropdown if there isn't enough space to render it.
                            scope.$watch('$select.open', function() {

                                if ($select.dropdownPosition === 'auto' || $select.dropdownPosition === 'up'){
                                    scope.calculateDropdownPos();
                                }

                            });

                            var setDropdownPosUp = function(offset, offsetDropdown){

                                offset = offset || mcOffset(element);
                                offsetDropdown = offsetDropdown || mcOffset(dropdown);

                                dropdown[0].style.position = 'absolute';
                                dropdown[0].style.top = (offsetDropdown.height * -1) + 'px';
                                element.addClass(directionUpClassName);

                            };

                            var setDropdownPosDown = function(offset, offsetDropdown){

                                element.removeClass(directionUpClassName);

                                offset = offset || mcOffset(element);
                                offsetDropdown = offsetDropdown || mcOffset(dropdown);

                                dropdown[0].style.position = '';
                                dropdown[0].style.top = '';

                            };

                            var calculateDropdownPosAfterAnimation = function() {
                                // Delay positioning the dropdown until all choices have been added so its height is correct.
                                $timeout(function() {
                                    if ($select.dropdownPosition === 'up') {
                                        //Go UP
                                        setDropdownPosUp();
                                    } else {
                                        //AUTO
                                        element.removeClass(directionUpClassName);

                                        var offset = mcOffset(element);
                                        var offsetDropdown = mcOffset(dropdown);

                                        //https://code.google.com/p/chromium/issues/detail?id=342307#c4
                                        var scrollTop = $document[0].documentElement.scrollTop || $document[0].body.scrollTop; //To make it cross browser (blink, webkit, IE, Firefox).

                                        // Determine if the direction of the dropdown needs to be changed.
                                        if (offset.top + offset.height + offsetDropdown.height > scrollTop + $document[0].documentElement.clientHeight) {
                                            //Go UP
                                            setDropdownPosUp(offset, offsetDropdown);
                                        }else{
                                            //Go DOWN
                                            setDropdownPosDown(offset, offsetDropdown);
                                        }
                                    }

                                    // Display the dropdown once it has been positioned.
                                    dropdown[0].style.opacity = 1;
                                });
                            };

                            var opened = false;

                            scope.calculateDropdownPos = function() {
                                if ($select.open) {
                                    dropdown = angular.element(element).querySelectorAll('.ui-select-dropdown');

                                    if (dropdown.length === 0) {
                                        return;
                                    }

                                    // Hide the dropdown so there is no flicker until $timeout is done executing.
                                    if ($select.search === '' && !opened) {
                                        dropdown[0].style.opacity = 0;
                                        opened = true;
                                    }

                                    if (!mcOffset(dropdown).height && $select.$animate && $select.$animate.on && $select.$animate.enabled(dropdown)) {
                                        var needsCalculated = true;

                                        $select.$animate.on('enter', dropdown, function (elem, phase) {
                                            if (phase === 'close' && needsCalculated) {
                                                calculateDropdownPosAfterAnimation();
                                                needsCalculated = false;
                                            }
                                        });
                                    } else {
                                        calculateDropdownPosAfterAnimation();
                                    }
                                } else {
                                    if (dropdown === null || dropdown.length === 0) {
                                        return;
                                    }

                                    // Reset the position of the dropdown.
                                    dropdown[0].style.opacity = 0;
                                    dropdown[0].style.position = '';
                                    dropdown[0].style.top = '';
                                    element.removeClass(directionUpClassName);
                                }
                            };

                            // 默认选中第一个选项 add by zw
                            // $timeout(function(){
                            //     if(!$select.selected&&$select.codes){
                            //         $select.selected = $select.codes[0];
                            //         $parse(attrs['ngModel']).assign(scope, $select.codes[0].code);
                            //     }
                            // },500);

                        }
                    }
                }
            }])
        .directive('mcCodeSelectMatch', ['mcCodeSelectConfig', function(mcCodeSelectConfig) {
            return {
                restrict: 'EA',
                require: '^mcCodeSelect',
                replace: true,
                transclude: true,
                templateUrl: function(tElement) {
                    // Gets multiple attribute from parent (mc-code-select)
                    var multiple = tElement.parent().attr('multiple');
                    var p = tElement.parent();

                    return 'template/mc/code/' + (multiple ? 'match-multiple.tpl.html' : 'match.tpl.html');
                },
                link: function(scope, element, attrs, $select) {
                    $select.lockChoiceExpression = attrs.uiLockChoice;
                    attrs.$observe('placeholder', function(placeholder) {
                        $select.placeholder = placeholder !== undefined ? placeholder : mcCodeSelectConfig.placeholder;
                    });

                    $select.allowClear=angular.isUndefined($select.allowClear) || $select.allowClear =='true' || $select.allowClear ==='' ? true : false; //modified by zw

                    // function setAllowClear(allow) {
                    //     $select.allowClear = (angular.isDefined(allow)) ? (allow === '') ? true : (allow.toLowerCase() === 'true') : false;
                    // }
                    //
                    // attrs.$observe('allowClear', setAllowClear);
                    // setAllowClear(attrs.allowClear);

                    if($select.multiple){
                        $select.sizeSearchInput();
                    }

                }
            }}])
        .directive('mcCodeSelectSingle', ['$timeout', '$compile', function($timeout, $compile) {
            return {
                restrict: 'EA',
                require: ['^mcCodeSelect', '^ngModel'],
                link: function(scope, element, attrs, ctrls) {

                    var $select = ctrls[0];
                    var ngModel = ctrls[1];


                    //From view --> model
                    ngModel.$parsers.unshift(function (inputValue) {
                        var locals = {},
                            result = '';

                        if($select.parserResult) {
                            locals[$select.parserResult.itemName] = inputValue;
                            result = $select.parserResult.modelMapper(scope, locals);
                        }

                        return result;
                    });

                    //From model --> view
                    ngModel.$formatters.unshift(function (inputValue) {

                        if(inputValue == '') return '';

                        var data = $select.items;

                        if (data){
                            var checkFnSingle = function(d){
                                return d.code === inputValue;
                            };
                            //If possible pass same object stored in $select.selected
                            // if ($select.selected && checkFnSingle($select.selected)) {
                            //     return $select.selected;
                            // }
                            for (var i = data.length - 1; i >= 0; i--) {
                                if (checkFnSingle(data[i])) {
                                    $select.activeIndex = i;
                                    $select.selected = data[i];
                                    return data[i];
                                }
                            }
                        }
                        return inputValue;
                    });

                    ngModel.$render = function() {
                        $select.selected = ngModel.$viewValue;
                    };

                    //Update viewValue if model change
                    scope.$watch('$select.selected', function(newValue) {
                        if (ngModel.$viewValue !== newValue && newValue) {
                            ngModel.$setViewValue(newValue);
                        }else{
                            if($select.selected){
                                if($select.selected.code)
                                    $select.selected = ngModel.$viewValue;
                                // ngModel.$render();
                            }
                        }
                    });

                    scope.$on('mc:select', function (event, item) {

                        $select.selected = item ? item: {};
                    });

                    scope.$on('mc:clear', function (event) {
                        $select.selected = {};
                    });

                    //Idea from: https://github.com/ivaynberg/select2/blob/79b5bf6db918d7560bdd959109b7bcfb47edaf43/select2.js#L1954
                    var focusser = angular.element("<input ng-disabled='$select.disabled' class='ui-select-focusser ui-select-offscreen' type='text' id='{{ $select.focusserId }}' aria-label='{{ $select.focusserTitle }}' aria-haspopup='true' role='button' />");
                    $compile(focusser)(scope);
                    $select.focusser = focusser;

                    //Input that will handle focus
                    $select.focusInput = focusser;

                    element.parent().append(focusser);
                    focusser.bind("focus", function(){
                        scope.$evalAsync(function(){
                            $select.focus = true;
                        });
                    });
                    focusser.bind("blur", function(){
                        scope.$evalAsync(function(){
                            $select.focus = false;
                        });
                    });
                    focusser.bind("keydown", function(e){

                        if (e.which === KEY.BACKSPACE) {
                            e.preventDefault();
                            e.stopPropagation();
                            $select.select(undefined);
                            scope.$apply();
                            return;
                        }

                        if (e.which === KEY.TAB || KEY.isControl(e) || KEY.isFunctionKey(e) || e.which === KEY.ESC) {
                            return;
                        }

                        if (e.which == KEY.DOWN  || e.which == KEY.UP || e.which == KEY.ENTER || e.which == KEY.SPACE){
                            e.preventDefault();
                            e.stopPropagation();
                            $select.activate();
                        }

                        scope.$digest();
                    });

                    focusser.bind("keyup input", function(e){

                        if (e.which === KEY.TAB || KEY.isControl(e) || KEY.isFunctionKey(e) || e.which === KEY.ESC || e.which == KEY.ENTER || e.which === KEY.BACKSPACE) {
                            return;
                        }

                        $select.activate(focusser.val()); //User pressed some regular key, so we pass it to the search input
                        focusser.val('');
                        scope.$digest();

                    });

                }
            }
        }])

        .directive('mcCodeSelectMultiple', ['mcCodeSelectMinErr','$timeout', '$parse', function(mcCodeSelectMinErr, $timeout, $parse) {
            return {
                restrict: 'EA',
                require: ['^mcCodeSelect', '^ngModel'],

                controller: ['$scope','$timeout', function($scope, $timeout){

                    var ctrl = this,
                        $select = $scope.$select,
                        ngModel;

                    if (angular.isUndefined($select.selected))
                        $select.selected = [];

                    //Wait for link fn to inject it
                    $scope.$evalAsync(function(){ ngModel = $scope.ngModel; });

                    ctrl.activeMatchIndex = -1;

                    ctrl.updateModel = function(){
                        ngModel.$setViewValue(Date.now()); //Set timestamp as a unique string to force changes
                        ctrl.refreshComponent();
                    };

                    ctrl.refreshComponent = function(){
                        //Remove already selected items
                        //e.g. When user clicks on a selection, the selected array changes and
                        //the dropdown should remove that item
                        if($select.refreshItems){
                            $select.refreshItems();
                        }
                        if($select.sizeSearchInput){
                            $select.sizeSearchInput();
                        }
                    };

                    // Remove item from multiple select
                    ctrl.removeChoice = function(index){

                        // if the choice is locked, don't remove it
                        if($select.isLocked(null, index)) return false;

                        var removedChoice = $select.selected[index];

                        var locals = {};
                        locals['code'] = removedChoice;

                        $select.selected.splice(index, 1);
                        ctrl.activeMatchIndex = -1;
                        $select.sizeSearchInput();

                        // Give some time for scope propagation.
                        $timeout(function(){
                            $select.onRemoveCallback($scope, {
                                $item: removedChoice,
                                $model: $parse('code.code')($scope, locals)
                            });
                        });

                        ctrl.updateModel();

                        return true;
                    };

                    ctrl.getPlaceholder = function(){
                        //Refactor single?
                        if($select.selected && $select.selected.length) return;
                        return $select.placeholder;
                    };


                }],
                controllerAs: '$selectMultiple',

                link: function(scope, element, attrs, ctrls) {

                    var $select = ctrls[0];
                    var ngModel = scope.ngModel = ctrls[1];
                    var $selectMultiple = scope.$selectMultiple;

                    //$select.selected = raw selected objects (ignoring any property binding)

                    $select.multiple = true;

                    //Input that will handle focus
                    $select.focusInput = $select.searchInput;

                    //Properly check for empty if set to multiple
                    ngModel.$isEmpty = function(value) {
                        return !value || value.length === 0;
                    };

                    //From view --> model
                    ngModel.$parsers.unshift(function () {
                        var locals = {},
                            result,
                            resultMultiple = [];
                        for (var j = $select.selected.length - 1; j >= 0; j--) {
                            locals = {};
                            locals['code'] = $select.selected[j];
                            result = $parse('code.code')(scope, locals);
                            resultMultiple.unshift(result);
                        }
                        return resultMultiple;
                    });

                    // From model --> view
                    ngModel.$formatters.unshift(function (inputValue) {
                        var data = $select.codes, //Overwrite $search
                            locals = {},
                            result;
                        if (!data) return inputValue;
                        var resultMultiple = [];
                        var checkFnMultiple = function(list, value){
                            if (!list || !list.length) return;
                            for (var p = list.length - 1; p >= 0; p--) {
                                locals['code'] = list[p];
                                result = $parse('code.code')(scope, locals);
                                // if($select.parserResult.trackByExp){
                                //     var propsItemNameMatches = /(\w*)\./.exec($select.parserResult.trackByExp);
                                //     var matches = /\.([^\s]+)/.exec($select.parserResult.trackByExp);
                                //     if(propsItemNameMatches && propsItemNameMatches.length > 0 && propsItemNameMatches[1] == 'code'){
                                //         if(matches && matches.length>0 && result[matches[1]] == value[matches[1]]){
                                //             resultMultiple.unshift(list[p]);
                                //             return true;
                                //         }
                                //     }
                                // }
                                if (angular.equals(result,value)){
                                    resultMultiple.unshift(list[p]);
                                    return true;
                                }
                            }
                            return false;
                        };
                        if (!inputValue) return resultMultiple; //If ngModel was undefined
                        for (var k = inputValue.length - 1; k >= 0; k--) {
                            //Check model array of currently selected items
                            if (!checkFnMultiple($select.selected, inputValue[k])){
                                //Check model array of all items available
                                if (!checkFnMultiple(data, inputValue[k])){
                                    //If not found on previous lists, just add it directly to resultMultiple
                                    resultMultiple.unshift(inputValue[k]);
                                }
                            }
                        }
                        return resultMultiple;
                    });

                    //Watch for external model changes
                    scope.$watchCollection(function(){ return ngModel.$modelValue; }, function(newValue, oldValue) {
                        if (oldValue != newValue){
                            //update the view value with fresh data from items, if there is a valid model value
                            if(angular.isDefined(ngModel.$modelValue)) {
                                ngModel.$modelValue = null; //Force scope model value and ngModel value to be out of sync to re-run formatters
                            }
                            $selectMultiple.refreshComponent();
                        }
                    });

                    ngModel.$render = function() {
                        // Make sure that model value is array
                        if(!angular.isArray(ngModel.$viewValue)){
                            // Have tolerance for null or undefined values
                            if(angular.isUndefined(ngModel.$viewValue) || ngModel.$viewValue === null){
                                ngModel.$viewValue = [];
                            } else {
                                // throw uiSelectMinErr('multiarr', "Expected model value to be array but got '{0}'", ngModel.$viewValue);
                            }
                        }
                        $select.selected = ngModel.$viewValue;
                        $selectMultiple.refreshComponent();
                        scope.$evalAsync(); //To force $digest
                    };

                    scope.$on('mc:select', function (event, item) {
                        if($select.selected.length >= $select.limit) {
                            return;
                        }
                        $select.selected.push(item);
                        $selectMultiple.updateModel();
                    });

                    scope.$on('mc:activate', function () {
                        $selectMultiple.activeMatchIndex = -1;
                    });

                    scope.$watch('$select.disabled', function(newValue, oldValue) {
                        // As the search input field may now become visible, it may be necessary to recompute its size
                        if (oldValue && !newValue) $select.sizeSearchInput();
                    });

                    $select.searchInput.on('keydown', function(e) {
                        var key = e.which;
                        scope.$apply(function() {
                            var processed = false;
                            // var tagged = false; //Checkme
                            if(KEY.isHorizontalMovement(key)){
                                processed = _handleMatchSelection(key);
                            }
                            if (processed  && key != KEY.TAB) {
                                //TODO Check si el tab selecciona aun correctamente
                                //Crear test
                                e.preventDefault();
                                e.stopPropagation();
                            }
                        });
                    });
                    function _getCaretPosition(el) {
                        if(angular.isNumber(el.selectionStart)) return el.selectionStart;
                        // selectionStart is not supported in IE8 and we don't want hacky workarounds so we compromise
                        else return el.value.length;
                    }
                    // Handles selected options in "multiple" mode
                    function _handleMatchSelection(key){
                        var caretPosition = _getCaretPosition($select.searchInput[0]),
                            length = $select.selected.length,
                            // none  = -1,
                            first = 0,
                            last  = length-1,
                            curr  = $selectMultiple.activeMatchIndex,
                            next  = $selectMultiple.activeMatchIndex+1,
                            prev  = $selectMultiple.activeMatchIndex-1,
                            newIndex = curr;

                        if(caretPosition > 0 || ($select.search.length && key == KEY.RIGHT)) return false;

                        $select.close();

                        function getNewActiveMatchIndex(){
                            switch(key){
                                case KEY.LEFT:
                                    // Select previous/first item
                                    if(~$selectMultiple.activeMatchIndex) return prev;
                                    // Select last item
                                    else return last;
                                    break;
                                case KEY.RIGHT:
                                    // Open drop-down
                                    if(!~$selectMultiple.activeMatchIndex || curr === last){
                                        $select.activate();
                                        return false;
                                    }
                                    // Select next/last item
                                    else return next;
                                    break;
                                case KEY.BACKSPACE:
                                    // Remove selected item and select previous/first
                                    if(~$selectMultiple.activeMatchIndex){
                                        if($selectMultiple.removeChoice(curr)) {
                                            return prev;
                                        } else {
                                            return curr;
                                        }

                                    } else {
                                        // If nothing yet selected, select last item
                                        return last;
                                    }
                                    break;
                                case KEY.DELETE:
                                    // Remove selected item and select next item
                                    if(~$selectMultiple.activeMatchIndex){
                                        $selectMultiple.removeChoice($selectMultiple.activeMatchIndex);
                                        return curr;
                                    }
                                    else return false;
                            }
                        }

                        newIndex = getNewActiveMatchIndex();

                        if(!$select.selected.length || newIndex === false) $selectMultiple.activeMatchIndex = -1;
                        else $selectMultiple.activeMatchIndex = Math.min(last,Math.max(first,newIndex));

                        return true;
                    }

                    $select.searchInput.on('keyup', function(e) {

                        if ( ! KEY.isVerticalMovement(e.which) ) {
                            scope.$evalAsync( function () {
                                $select.activeIndex = $select.taggingLabel === false ? -1 : 0;
                            });
                        }
                        // Push a "create new" item into array if there is a search string
                        if ( $select.tagging.isActivated && $select.search.length > 0 ) {

                            // return early with these keys
                            if (e.which === KEY.TAB || KEY.isControl(e) || KEY.isFunctionKey(e) || e.which === KEY.ESC || KEY.isVerticalMovement(e.which) ) {
                                return;
                            }
                            // always reset the activeIndex to the first item when tagging
                            $select.activeIndex = $select.taggingLabel === false ? -1 : 0;
                            // taggingLabel === false bypasses all of this
                            if ($select.taggingLabel === false) return;

                            var items = angular.copy( $select.items );
                            var stashArr = angular.copy( $select.items );
                            var newItem;
                            var item;
                            var hasTag = false;
                            var dupeIndex = -1;
                            var tagItems;
                            var tagItem;

                            // case for object tagging via transform `$select.tagging.fct` function
                            if ( $select.tagging.fct !== undefined) {
                                tagItems = $select.$filter('filter')(items,{'isTag': true});
                                if ( tagItems.length > 0 ) {
                                    tagItem = tagItems[0];
                                }
                                // remove the first element, if it has the `isTag` prop we generate a new one with each keyup, shaving the previous
                                if ( items.length > 0 && tagItem ) {
                                    hasTag = true;
                                    items = items.slice(1,items.length);
                                    stashArr = stashArr.slice(1,stashArr.length);
                                }
                                newItem = $select.tagging.fct($select.search);
                                // verify the new tag doesn't match the value of a possible selection choice or an already selected item.
                                if (
                                    stashArr.some(function (origItem) {
                                        return angular.equals(origItem, newItem);
                                    }) ||
                                    $select.selected.some(function (origItem) {
                                        return angular.equals(origItem, newItem);
                                    })
                                ) {
                                    scope.$evalAsync(function () {
                                        $select.activeIndex = 0;
                                        $select.items = items;
                                    });
                                    return;
                                }
                                if (newItem) newItem.isTag = true;
                                // handle newItem string and stripping dupes in tagging string context
                            } else {
                                // find any tagging items already in the $select.items array and store them
                                tagItems = $select.$filter('filter')(items,function (item) {
                                    return item.match($select.taggingLabel);
                                });
                                if ( tagItems.length > 0 ) {
                                    tagItem = tagItems[0];
                                }
                                item = items[0];
                                // remove existing tag item if found (should only ever be one tag item)
                                if ( item !== undefined && items.length > 0 && tagItem ) {
                                    hasTag = true;
                                    items = items.slice(1,items.length);
                                    stashArr = stashArr.slice(1,stashArr.length);
                                }
                                newItem = $select.search+' '+$select.taggingLabel;
                                if ( _findApproxDupe($select.selected, $select.search) > -1 ) {
                                    return;
                                }
                                // verify the the tag doesn't match the value of an existing item from
                                // the searched data set or the items already selected
                                if ( _findCaseInsensitiveDupe(stashArr.concat($select.selected)) ) {
                                    // if there is a tag from prev iteration, strip it / queue the change
                                    // and return early
                                    if ( hasTag ) {
                                        items = stashArr;
                                        scope.$evalAsync( function () {
                                            $select.activeIndex = 0;
                                            $select.items = items;
                                        });
                                    }
                                    return;
                                }
                                if ( _findCaseInsensitiveDupe(stashArr) ) {
                                    // if there is a tag from prev iteration, strip it
                                    if ( hasTag ) {
                                        $select.items = stashArr.slice(1,stashArr.length);
                                    }
                                    return;
                                }
                            }
                            if ( hasTag ) dupeIndex = _findApproxDupe($select.selected, newItem);
                            // dupe found, shave the first item
                            if ( dupeIndex > -1 ) {
                                items = items.slice(dupeIndex+1,items.length-1);
                            } else {
                                items = [];
                                if (newItem) items.push(newItem);
                                items = items.concat(stashArr);
                            }
                            scope.$evalAsync( function () {
                                $select.activeIndex = 0;
                                $select.items = items;

                                if ($select.isGrouped) {
                                    // update item references in groups, so that indexOf will work after angular.copy
                                    var itemsWithoutTag = newItem ? items.slice(1) : items;
                                    $select.setItemsFn(itemsWithoutTag);
                                    if (newItem) {
                                        // add tag item as a new group
                                        $select.items.unshift(newItem);
                                        $select.groups.unshift({name: '', items: [newItem], tagging: true});
                                    }
                                }
                            });
                        }
                    });
                    function _findCaseInsensitiveDupe(arr) {
                        if ( arr === undefined || $select.search === undefined ) {
                            return false;
                        }
                        var hasDupe = arr.filter( function (origItem) {
                                if ( $select.search.toUpperCase() === undefined || origItem === undefined ) {
                                    return false;
                                }
                                return origItem.toUpperCase() === $select.search.toUpperCase();
                            }).length > 0;

                        return hasDupe;
                    }
                    function _findApproxDupe(haystack, needle) {
                        var dupeIndex = -1;
                        if(angular.isArray(haystack)) {
                            var tempArr = angular.copy(haystack);
                            for (var i = 0; i <tempArr.length; i++) {
                                // handle the simple string version of tagging
                                if ( $select.tagging.fct === undefined ) {
                                    // search the array for the match
                                    if ( tempArr[i]+' '+$select.taggingLabel === needle ) {
                                        dupeIndex = i;
                                    }
                                    // handle the object tagging implementation
                                } else {
                                    var mockObj = tempArr[i];
                                    if (angular.isObject(mockObj)) {
                                        mockObj.isTag = true;
                                    }
                                    if ( angular.equals(mockObj, needle) ) {
                                        dupeIndex = i;
                                    }
                                }
                            }
                        }
                        return dupeIndex;
                    }

                    $select.searchInput.on('blur', function() {
                        $timeout(function() {
                            $selectMultiple.activeMatchIndex = -1;
                        });
                    });

                }
            };
        }])

        .factory('$$code',['$http','$q', '$$adapter', 'ApiPath',
            function ($http,$q, $$adapter,ApiPath){
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
                var getRemoteCodes = function(codetype, options) {

                    var deferred = $q.defer();

                    //给codeType 单独赋值
                    var codeType = codetype.codeType;
                    var upperCode = codetype.upperCode || '';

                    //判断如果是级联有options.code，给codeType重新赋值
                    if(options){
                        if(options.code){
                            codeType = codetype;
                            var upperCode = options.code;
                        }
                    }

                    //涉及险别下拉域入参特殊处理（小额快赔）
                    if(codeType=='itemKindCode'||codeType=='thirdKindCode'||codeType=='personKindCode'||codeType=='propKindCode'||codeType=='adjustKindCode'){
                        var keywords = [{
                            "codeType":codeType, //代码类型
                            "codeName":"",
                            "codeCode":"",
                            "codeParam":upperCode
                        }];
                    }else{
                        var keywords = [{
                            "codeType":codeType, //代码类型
                            "codeName":"",
                            "codeCode":upperCode
                        }];
                    }

                    //请求地址
                    config.httpPackage.url = ApiPath.api.getCodeTypeList;
                    //后端入参适配
                    config.httpPackage.data = $$adapter.exports('getCodeTypeList', keywords);
                    //请求网络
                    $http(config.httpPackage).then(
                        function (data) {
                            //后端回参适配
                            data = $$adapter.imports('getCodeTypeList', data);
                            if (!data) {
                                options.error("适配器验证不通过");
                            } else {
                                // localCodes[codetype.codeType] = data; //modify by zw
                                localCodes[codetype] = data;

                                if (options && options.success)
                                    options.success(data);
                                deferred.resolve(data);
                            }
                        },
                        function (error) {

                        }
                    );
                    return deferred.promise;
                };

                //获取数据字典
                var getCodes = function (codetype, options) {
                    //只要forceCodeRemote、options.forceRemote中任意一项为true则强制获取后台数据
                    if(options && options.forceRemote)
                        return getRemoteCodes(codetype, options);

                    var deffered = $q.defer();

                    if(localCodes[codetype]) {
                        deffered.resolve(getLocalCodes(codetype, options));
                    }else{
                        //如果本地没有，尝试从远程获取
                        return getRemoteCodes(codetype, options);
                    }
                    return deffered.promise;
                };

                //获取code所对应codeName
                var getCodeName = function(code, codetype){

                    codetype = codetype || '';

                    var result = getLocalCode(code, codetype);

                    if(result==='')
                        result = code;

                    return result;
                };


                return {
                    //获取本地代码值
                    getLocalCode: function (code, codetype) {
                        return getLocalCode(code, codetype);
                    },

                    //获取代码数组
                    getCodes: function (codetype, options) {
                        return getCodes(codetype, options);
                    },

                    //获取codeName
                    getCodeName: function(code, codetype){
                        return getCodeName(code, codetype)
                    },

                    //确保数据字典装入本地
                    preloadCodes: function(codetypes, options) {
                        var deffered = $q.defer();

                        if(!codetypes || !angular.isArray(codetypes))
                            deffered.reject();

                        var tasks = [];

                        $.each(codetypes, function(index, codetype){
                            tasks.push(getCodes(codetype, options));
                        });

                        $q.all(tasks).then(
                            function () {
                                deffered.resolve();
                            }
                        );

                        return deffered.promise;
                    }
                };
            }])
        .filter("mcCode", ['$$code', function($$code) {

            return function(code, codetype) {

                codetype = codetype || '';

                var result = $$code.getLocalCode(code, codetype);

                if(result==='')
                    result = code;

                return result;
            }
        }]);
});