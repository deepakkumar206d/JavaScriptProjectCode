"use strict";

loader(["modules/routes",
	"core/services/router.service",
	"core/services/session-storage"
	],
	function(routes, router, sessionStorage) {

		function onReload() {
			// router.loadHeader();
			// router.loadFooter();
			router.router();
		}

		function reRoute() {
			if(sessionStorage.getData('oracleId')){
				router.router();
			}else if(location.hash === "#register" || location.hash === "#login") {
				router.router();
			} else {
				// location.hash = "#login";
			}
		}

		window.addEventListener('hashchange', reRoute);
		window.addEventListener('load', onReload);
	});
