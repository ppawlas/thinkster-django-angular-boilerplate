/**
 * Created by piotr on 23.04.16.
 */

(function () {
    'use strict';

    angular
        .module('thinkster.posts', [
            'thinkster.posts.controller',
            'thinkster.posts.directives',
            'thinkster.posts.services'
        ]);

    angular
        .module('thinkster.posts.controller', []);

    angular
        .module('thinkster.posts.directives', ['ngDialog']);

    angular
        .module('thinkster.posts.services', []);
})();