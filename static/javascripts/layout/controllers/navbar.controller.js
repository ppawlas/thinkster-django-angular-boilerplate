/**
 * Created by piotr on 18.04.16.
 */

/**
 * NavbarController
 * @namespace thinkster.layout.controllers
 */
(function () {
    'use strict';

    angular
        .module('thinkster.layout.controllers')
        .controller('NavbarController', NavbarController);

    NavbarController.$inject = ['$scope', 'Authentication'];

    /**
     * @namespace NavbarController
     */
    function NavbarController($scope, Authentication) {
        var vm = this;

        vm.isAuthenticated = Authentication.isAuthenticated();
        vm.user = Authentication.getAuthenticatedAccount();
        vm.logout = logout;

        /**
         * @name logout
         * @desc Log the user out
         * @memberOf thinkster.layout.controllers.NavbarController
         */
        function logout() {
            Authentication.logout();
        }
    }
})();