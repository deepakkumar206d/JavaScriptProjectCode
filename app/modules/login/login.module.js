'use strict';

loader(["core/util",
      "core/services/router.service",
      "core/services/session-storage"
      ], function(util, router, sessionStorage, config) {

        function render() {
            console.log('hey');
    }

    return {
        render: render
    };
});
