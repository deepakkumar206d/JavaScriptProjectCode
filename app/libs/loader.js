"use strict";

window.loader = (function() {
    var map = {},
        url,
        parent,
        loadXMLDoc,
        loadScript,
        createFile;

    function File(dependencies, callback, fileUrl, parent) {
        if (this.constructor === File) {
            this.parent = parent;
            this.callback = callback;
            this.url = fileUrl || "root";
            this.counter = dependencies.length;
            this.dependencies = dependencies;
            this.load(dependencies);
        }
    }

    File.prototype.checkCounter = function() {
        var l = this.dependencies.length,
            params = [];
        if (!--this.counter) {
            for (var i = 0; i < l; i++) {
                params.push(map[this.dependencies[i]]);
            }
            this.returnToParent(params);
        }
    };

    File.prototype.returnToParent = function(params) {
        if (!(this.url in map)) {
            (map[this.url] = this.callback.apply(window, params));
        }
        if (this.parent) {
            this.parent.checkCounter();
        } else {
            delete map.root;
            parent = null;
            url = null;
        }
    };

    File.prototype.load = function(files) {
        var l = files.length;
        if (l) {
            for (var i = 0; i < l; i++) {
                loadXMLDoc(files[i], this.exec.bind(this));
            }
        } else {
            this.returnToParent([]);
        }
    };
    /*jshint ignore: start*/
    File.prototype.exec = function(fileUrl, response) {
        parent = this;
        url = fileUrl;
        eval(response);
    };
    /* jshint ignore: end*/
    createFile = function(dependencies, callback, fileUrl, parent) {
        return new File(dependencies, callback, fileUrl, parent);
    };

    loadScript = function() {
        var dependencies, callback;
        if (typeof arguments[0] === "object") {
            dependencies = arguments[0];
            callback = arguments[1];
        } else if (typeof arguments[0] === "string") {
            dependencies = [arguments[0]];
            callback = arguments[1];
        } else {
            dependencies = [];
            callback = arguments[0];
        }
        createFile(dependencies, callback, url, parent);
    };

    loadXMLDoc = function(fileUrl, success) {
        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState === XMLHttpRequest.DONE) {
                if (xmlhttp.status === 200) {
                    success(fileUrl, xmlhttp.response);
                } else if (xmlhttp.status === 400) {
                    console.log('There was an error 400');
                } else {
                    console.log('something else other than 200 was returned');
                }
            }
        };

        xmlhttp.open("GET", fileUrl + ".js", true);
        xmlhttp.send();
    };

    (function() {
        var dataMain = document.getElementById("loader").attributes["data-main"].value,
            head = document.getElementsByTagName("head")[0],
            script = document.createElement("script");
        script.src = dataMain;
        head.appendChild(script);
    })();

    return loadScript;
})();
