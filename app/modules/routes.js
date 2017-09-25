
"use strict";

loader(["modules/login/login.route"], function (loginRoute) {
    var routes = [loginRoute];
    router.addRoutes(routes);
});