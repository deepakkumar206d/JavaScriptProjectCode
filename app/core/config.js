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
        login: "#login",
        // register: "#register"
    };

    /**
     *object for storing all the routes of each page
     */

    routes = {
        // headerUnauth: "shared/components/header/header-unauth/header-unauth.route",
        // headerLogged: "shared/components/header/header-logged/header-logged.route",
        // footer: "shared/components/footer/footer.route",
        login: "modules/login/login.route",
        // register: "modules/register/register.route"
    };

    /**
     *object for storing various path all .js files
     */

    js = {
        // routerService: "core/services/router.service",
        // sessionStorage: "core/services/session-storage",
        // util: "core/util",
        // validation: "util/validation",
        login: "modules/login/login.module",
        // register: "modules/register/register.module",
        // config: "core/config"
    };

    /**
     *object for storing all the path for various templates
     */

    template = {
        login: "modules/login/login.template.html",
        // pendingFeedbackRequest: "modules/pending-feedback-request/pending-feedback-request.template.html",
        // register: "modules/register/register.template.html"
    };

    /**
     *object for storing path of all the css files
     */

    css = {
        // editProfile: "modules/edit-profile/edit-profile.style.css",
        login: "modules/login/login.style.css",
        // register: "modules/register/register.style.css"
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
