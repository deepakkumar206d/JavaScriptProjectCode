'use strict';
loader(["core/services/session-storage"], function(sessionStorage) {
    /**
     *@object router for all pages in application
     *@return provide addroutes interface
     */

    var routes = {},
        main = null,
        footer = null,
        header = null,
        head = null,
        link = null;

    /**
     *@method Route
     *@description Initialize Route for every page
     *@param route of a particular page
     *@return none
     */
    function Route(route) {
        this.path = route.path;
        this.templateURL = route.template;
        this.js = route.js;
        this.css = route.css;
        this.isJSLoaded = false;
        this.isTemplatedLoaded = false;
    }

    /**
     *@method loadXMLDoc
     *@description make ajax request to fetch js files
     *@param url,success, error
     *@return none
     */
    function loadXMLDoc(url, success) {
        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState === XMLHttpRequest.DONE) {
                if (xmlhttp.status === 200) {
                    success(xmlhttp.response);
                } else if (xmlhttp.status === 400) {
                    console.log('There was an error 400');
                } else {
                    console.log('something else other than 200 was returned');
                }
            }
        };

        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }

    /**
     *@method loadJsFiles
     *@description load js file for a particular route in routes
     *@param none
     *@return none
     */
    Route.prototype.loadJSFiles = function() {
        var route = this;
        loader(this.js, function(module) {
            route.isJSLoaded = true;
            route.render = module && module.render;
            route.afterLoad();
        });
    };

    /**
     *@method loadCSSFiles
     *@description load CSS file for a particular route in routes
     *@param none
     *@return none
     */
    Route.prototype.loadCSSFiles = function() {
        if (link.length > 2) {
            head.removeChild(link[link.length - 1]);
        }
        var css = document.createElement("link");
        css.href = this.css;
        css.rel = "stylesheet";
        head.appendChild(css);
    };


    /**
     *@method loadTemplate
     *@description load html template for a particular route in routes
     *@param element which is to be rendered
     *@return none
     */
    Route.prototype.loadTemplate = function(el) {
        var route = this;
        loadXMLDoc(route.templateURL, function(response) {
            route.html = response;
            while (el.firstChild) {
                el.removeChild(el.firstChild);
            }
            route.parentElement = el;
            route.isTemplatedLoaded = true;
            route.afterLoad();
        });
    };

    /**
     *@method afterLoad
     *@description called after template and js loaded...and call render function of that route
     *@param none
     *@return none
     */
    Route.prototype.afterLoad = function() {
        if (this.isTemplatedLoaded && this.isJSLoaded) {
            this.parentElement.innerHTML = this.html;
            if(this.render && typeof this.render === "function"){
                this.render();
            }
            this.isJSLoaded = false;
            this.isTemplatedLoaded = false;
        }
    };

    /**
     *@method loadRoute
     *@description call load aprticular route in routes
     *@param none
     *@return none
     */
    Route.prototype.loadRoute = function(el) {
        this.loadJSFiles();
        this.loadTemplate(el);
        this.loadCSSFiles();
    };

    /**
     *@method loadHeader
     *@description load header after user login with user details
     *@param none
     *@return none
     */
    function loadHeader() {
        var route;
        if(!sessionStorage.getData('oracleId')){
            route = routes["header-unauth"];
        } else {
            route = routes["header-logged"];
        }

        if (header && route) {
            route.loadRoute(header);
        }
    }

    /**
     *@method loadFooter
     *@description load footer after user login
     *@param none
     *@return none
     */
    function loadFooter() {
        var route = routes.footer;
        if (footer && route) {
            route.loadRoute(footer);
        }
    }


    /**
     *@method initElement
     *@description fetch elements from index.html
     *@param none
     *@return none
     */
    function initElement() {
        main = document.getElementsByTagName('main');
        main = main && main[0];

        footer = document.getElementsByTagName('footer');
        footer = footer && footer[0];

        header = document.getElementsByTagName('header');
        header = header && header[0];

        head = document.getElementsByTagName('head');
        head = head && head[0];

        link = document.getElementsByTagName("link");
    }


    /**
     *@method router
     *@description called on hashchange or page load...render current route in main element of index template
     *@param none
     *@return none
     */
    function router() {
        var url = location
            .hash
            .slice(1) || '/';
        var route = routes[url];
        if (main && route) {
            route.loadRoute(main);
        } else if (main) {
            //route = routes.login;
            //route.loadRoute(main);
            location.hash = "#login";
        }
    }

    /**
     *@method addRoutes
     *@description initialize routes for every route
     *@param none
     *@return none
     */
    function addRoutes(routeList) {
        var route;
        for (var i = 0, l = routeList.length; i < l; i++) {
            route = routeList[i];
            routes[route.path] = new Route(route);
        }
        initElement();

    }

    return {
        addRoutes: addRoutes,
        router: router,
        loadHeader: loadHeader,
        loadFooter: loadFooter
    };
});
