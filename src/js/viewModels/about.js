/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your about ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery'],
    function(oj, ko, $) {

        function AboutViewModel() {
            var self = this;
            var CALENDAR = function() {
                var wrap, label,
                    months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

                function init(newWrap) {
                    wrap = $(newWrap || "#cal");
                    label = wrap.find("#label");

                    wrap.find("#prev").bind("click.calender", function() { switchMonth(false); });
                    wrap.find("#next").bind("click.calender", function() { switchMonth(true); });
                    switchMonth(null, new Date().getMonth(), new Date().getFullYear());
                }

                function switchMonth(next, month, year) {
                    var curr = label.text().trim().split(" "),
                        calendar, tempYear = parseInt(curr[1], 10);

                    month = month || ((next) ? ((curr[0] === "December") ? 0 : months.indexOf(curr[0]) + 1) : ((curr[0] === "January") ? 11 : months.indexOf(curr[0]) - 1));
                    year = year || ((next && month === 0) ? tempYear + 1 : (!next && month === 11) ? tempYear - 1 : tempYear);

                    console.profile("createCal");
                    calendar = createCal(year, month);
                    console.profileEnd("createCal");

                    $("#cal-frame", wrap)
                        .find(".curr")
                        .removeClass("curr")
                        .addClass("temp")
                        .end()
                        .prepend(calendar.calendar())
                        .find(".temp")
                        .fadeOut("slow", function() { $(this).remove(); });
                    label.text(calendar.label);
                }

                function createCal(year, month) {
                    var day = 1,
                        i, j, haveDays = true,
                        startDay = new Date(year, month, day).getDay(),
                        daysInMonth = [31, (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
                        calendar = [];
                    if (createCal.cache[year]) {
                        if (createCal.cache[year][month]) {
                            return createCal.cache[year][month];
                        }
                    } else {
                        createCal.cache[year] = {};
                    }
                    i = 0;
                    while (haveDays) {
                        calendar[i] = [];
                        for (j = 0; j < 7; j++) {
                            if (i === 0) {
                                if (j === startDay) {
                                    calendar[i][j] = day++;
                                    startDay++;
                                }
                            } else if (day <= daysInMonth[month]) {
                                calendar[i][j] = day++;
                            } else {
                                calendar[i][j] = "";
                                haveDays = false;
                            }
                            if (day > daysInMonth[month]) {
                                haveDays = false;
                            }
                        }
                        i++;
                    }

                    if (calendar[5]) {
                        for (i = 0; i < calendar[5].length; i++) {
                            if (calendar[5][i] !== "") {
                                calendar[4][i] = "<span>" + calendar[4][i] + "</span><span>" + calendar[5][i] + "</span>";
                            }
                        }
                        calendar = calendar.slice(0, 5);
                    }

                    for (i = 0; i < calendar.length; i++) {
                        calendar[i] = "<tr><td>" + calendar[i].join("</td><td>") + "</td></tr>";
                    }

                    calendar = $("<table>" + calendar.join("") + "</table").addClass("curr");

                    $("td:empty", calendar).addClass("nil");
                    if (month === new Date().getMonth()) {
                        $('td', calendar).filter(function() {
                            return $(this).text() === new Date().getDate().toString(); }).addClass("today");
                    }

                    createCal.cache[year][month] = { calendar: function() {
                            return calendar.clone(); }, label: months[month] + " " + year };

                    return createCal.cache[year][month];
                }
                createCal.cache = {};

                return {
                    init: init,
                    switchMonth: switchMonth,
                    createCal: createCal
                };

            };

            self.cal = CALENDAR();
            self.cal.init();
            // Below are a subset of the ViewModel methods invoked by the ojModule binding
            // Please reference the ojModule jsDoc for additionaly available methods.

            /**
             * Optional ViewModel method invoked when this ViewModel is about to be
             * used for the View transition.  The application can put data fetch logic
             * here that can return a Promise which will delay the handleAttached function
             * call below until the Promise is resolved.
             * @param {Object} info - An object with the following key-value pairs:
             * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
             * @param {Function} info.valueAccessor - The binding's value accessor.
             * @return {Promise|undefined} - If the callback returns a Promise, the next phase (attaching DOM) will be delayed until
             * the promise is resolved
             */
            self.handleActivated = function(info) {
                // Implement if needed
            };

            /**
             * Optional ViewModel method invoked after the View is inserted into the
             * document DOM.  The application can put logic that requires the DOM being
             * attached here.
             * @param {Object} info - An object with the following key-value pairs:
             * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
             * @param {Function} info.valueAccessor - The binding's value accessor.
             * @param {boolean} info.fromCache - A boolean indicating whether the module was retrieved from cache.
             */
            self.handleAttached = function(info) {
                // Implement if needed
            };


            /**
             * Optional ViewModel method invoked after the bindings are applied on this View. 
             * If the current View is retrieved from cache, the bindings will not be re-applied
             * and this callback will not be invoked.
             * @param {Object} info - An object with the following key-value pairs:
             * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
             * @param {Function} info.valueAccessor - The binding's value accessor.
             */
            self.handleBindingsApplied = function(info) {
                // Implement if needed
            };

            /*
             * Optional ViewModel method invoked after the View is removed from the
             * document DOM.
             * @param {Object} info - An object with the following key-value pairs:
             * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
             * @param {Function} info.valueAccessor - The binding's value accessor.
             * @param {Array} info.cachedNodes - An Array containing cached nodes for the View if the cache is enabled.
             */
            self.handleDetached = function(info) {
                // Implement if needed
            };
        }

        /*
         * Returns a constructor for the ViewModel so that the ViewModel is constrcuted
         * each time the view is displayed.  Return an instance of the ViewModel if
         * only one instance of the ViewModel is needed.
         */
        return new AboutViewModel();
    }
);
