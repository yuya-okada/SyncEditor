/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var editor =  null;

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        // app.receivedEvent('deviceready');
        $("#editor").height($(window).height());
        editor = ace.edit("editor");


        {  // event

            // on window resized
            $(window).on("load resize", function() {
                $("#main-menu").outerWidth($(window).width() - 40)
                    .outerHeight($(window).height() - headerHeight - 40);

                $(".menu-cell").children().each(function(i, e) {
                    $(e).height($(e).width());
                })
            });

            // Account
            // OAuth.initialize('aXfNpOcXQZoaJ0EMcs4Hzedx4g8')
            // OAuth.popup('google_drive').done(function(result) {
            //     console.log(result);
            //     result.me()
            //     .done(function (response) {
            //         console.log(response);
            //     })
            //     .fail(function (err) {
            //         //handle error with err
            //     });
            //     // do some stuff with result
            // })


            // Undo & Redo
            var undoManager = editor.getSession().getUndoManager();
            $("#undo").onTouch(function() {
                undoManager.undo();
            });
            $("#redo").onTouch(function() {
                undoManager.redo();
            });


            // Preferences
            $("#preferences").onTouch(function() {

            });


            // Main Menu
            var headerHeight = $("header").height();
            $("#main-menu-button").onTouch(function(e) {
                e.stopPropagation();

                $("#main-menu").addClass("menuIn").css({
                    top: headerHeight + 20,
                    left: 20,
                }).removeClass("menuOut")

            });

            $("body").onTouch(function() {
                hideMainMenu();
            });


            $("#main-menu").onTouch(function(e) {
                e.stopPropagation();
            })


            // Menu Cell
            $(".menu-cell").onTouch(function() {
                var text = $(this).children("p").html().trim();
                menuItems[text]();
            });

            // Find Menu
            {
                $("#button-find").onTouch(function() {
                    editor.find($("#input-find").val(), {
                        backwords: true
                    });
                    editor.focus();
                });

                $("#button-find-all").onTouch(function() {
                    editor.findAll();
                    editor.focus();
                });

                $("#button-find-done").onTouch(function() {
                    $("#find-window").css({
                        transform: ""
                    });
                });
            }

            // Replace Menu
            {
                $("#button-replace").onTouch(function() {
                    editor.find($("#input-replace-keyword").val(), {
                        backwords: true
                    });
                    editor.replace($("#input-replace-with").val())
                    editor.focus();
                });

                $("#button-replace-all").onTouch(function() {
                    editor.findAll($("#input-replace-keyword").val());
                    editor.replaceAll($("#input-replace-with").val())
                    editor.focus();
                });

                $("#button-replace-done").onTouch(function() {
                    $("#replace-window").css({
                        transform: ""
                    });
                });
            }

        }


        var menuItems = {
            "Find": function() {
                hideMainMenu();
                $("#find-window").css({
                    transform: "translateY(-100%)",
                })

                $("#input-find").focus();

            },

            "Replace": function() {
                hideMainMenu();
                $("#replace-window").css({
                    transform: "translateY(-100%)",
                })

                $("#input-replace-keyword").focus();

            },

            "Select All": function() {
                editor.selectAll();
                hideMainMenu();
            }
        };


    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
    }
};




function hideMainMenu() {
    $("#main-menu").removeClass("menuIn").addClass("menuOut")
};


$(function() {
    app.onDeviceReady();
});

$.prototype.onTouch = function(fnc) {
    $(this).on("tap", function(e) {
        fnc.call(this, e);
        return false; // click eventが300ms後に発生するのをキャンセル
    });
};

app.initialize();




var delay = 0;
$.fn.translate = function(translations, speed, easing, complete) {
    var opt = $.speed(speed, easing, complete);
    opt.easing = opt.easing || 'ease';
    translations = $.extend({x: 0, y: 0, z: 0}, translations);

    return this.each(function() {
        var $this = $(this);

        var ar = Object.keys(translations);
        for (var i = 0; i < ar.length; i++) {
            if ($.isNumeric(translations[ar])) {
                translations[ar] += "px";
            }
        }

        $this.css({
            transitionDuration: opt.duration + 'ms',
            transitionTimingFunction: opt.easing,
            transform: 'translate(' + translations.x + ', ' + translations.y + ')'
        });

        setTimeout(function() {
            $this.css({
                transitionDuration: '0s',
                transitionTimingFunction: 'ease'
            });

            opt.complete.call($this);
        }, opt.duration + (delay || 0));
    });
};

$.fn.scale = function(scale, speed, easing, complete) {
    var opt = $.speed(speed, easing, complete);
    opt.easing = opt.easing || 'ease';

    return this.each(function() {
        var $this = $(this);



        $this.css({
            transitionDuration: opt.duration + 'ms',
            transitionTimingFunction: opt.easing,
            transform: 'scale(' + scale + ')'
        });

        setTimeout(function() {
            $this.css({
                transitionDuration: '0s',
                transitionTimingFunction: 'ease'
            });

            opt.complete();
        }, opt.duration + (delay || 0));
    });
};
