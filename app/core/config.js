'use strict';

/**
 *@module Config
 *@description Used for storing various routes of pages and paths for getting data.
 */

loader(function() {

    var jsonObj,
        path,
        template,
        css,
        js,
        routes;

    /**
     *object for storing the URLs of various jsons.
     */

    jsonObj = {
        // employees: "json/employees.json"
    };

    /**
     *object for various path of page
     */

    path = {
        login: "#login"
    };

    /**
     *object for storing all the routes of each page
     */

    routes = {
        login: "modules/login/login.route"
    };

    /**
     *object for storing various path all .js files
     */

    js = {
        login: "modules/login/login.module"
    };

    /**
     *object for storing all the path for various templates
     */

    template = {
        login: "modules/login/login.template.html"
    };

    /**
     *object for storing path of all the css files
     */

    css = {
        login: "modules/login/login.style.css"
    };

    /**
     *returning the interface to each object
     */

    return {
        jsonObj: jsonObj,
        path: path,
        routes: routes,
        js: js,
        template: template,
        css: css
    };
});
