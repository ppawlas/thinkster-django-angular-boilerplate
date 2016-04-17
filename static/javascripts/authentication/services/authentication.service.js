/**
 * Created by piotr on 17.04.16.
 */

/**
 * Authentication
 * @namespace thinkster.authentication.services
 */
(function () {
    'use strict';

    angular
        .module('thinkster.authentication.services')
        .factory('Authentication', Authentication);

    Authentication.$inject = ['$cookies', '$http'];

    /**
     * @namespace Authentication
     * @returns {Factory}
     */
    function Authentication($cookies, $http) {
        /**
         * @name Authentication
         * @desc The factory to be returned
         */
        var Authentication = {
            getAuthenticatedAccount: getAuthenticatedAccount,
            isAuthenticated: isAuthenticated,
            setAuthenticatedAccount: setAuthenticatedAccount,
            unauthenticate: unauthenticate,
            login: login,
            register: register
        };

        return Authentication;

        ////////////////////

        /**
         * @name register
         * @desc Try to register a new user
         * @param {string} email The email entered by the user
         * @param {string} password The password entered by the user
         * @param {string} username The username entered by the user
         * @returns {Promise}
         * @memberOf thinkster.authentication.services.Authentication
         */
        function register(email, password, username) {
            return $http.post('/api/v1/accounts/', {
                email: email,
                password: password,
                username: username
            }).then(registerSuccessFn, registerErrorFn);
        }

        /**
         * @name registerSuccessFn
         * @desc Log the new user in
         */
        function registerSuccessFn(data, status, headers, config) {
            Authentication.login(email, password);
        }

        /**
         * @name registerErrorFn
         * @desc Log "Epic failure!" to the console
         */
        function registerErrorFn(data, status, headers, config) {
            console.error('Epic failure!');
        }

        /**
         * @name login
         * @desc Try to log in with email 'email' and password 'password'
         * @param {string} email The email entered by the user
         * @param {string} password The password entered by the user
         * @returns {Promise}
         * @memberOf thinkster.authentication.services.Authentication
         */
        function login(email, password) {
            return $http.post('/api/v1/auth/login/', {
                email: email, password: password
            }).then(loginSuccessFn, loginErrorFn);
        }

        /**
         * @name loginSuccessFn
         * @desc Set the authenticated account and redirect to index
         */
        function loginSuccessFn(data, status, headers, config) {
            Authentication.setAuthenticatedAccount(data.data);

            window.location = '/';
        }

        /**
         * @name loginErrorFn
         * @desc Log "Epic failure!" to the console
         */
        function loginErrorFn(data, status, headers, config) {
            console.error('Epic failure!');
        }

        /**
         * @name getAuthenticatedAccount
         * @desc Return the currently authenticatedAccount account
         * @returns {object|undefined} Account if authenticatedAccount, else 'undefined'
         * @memberOf thinkster.authentication.services.Authentication
         */
        function getAuthenticatedAccount() {
            if(!$cookies.authenticatedAccount) {
                return;
            }

            return JSON.parse($cookies.authenticatedAccount);
        }

        /**
         * @name isAuthenticated
         * @desc Check if the user is authenticated
         * @return {boolean} True if user is authenticated, else false
         * @memberOf thinkster.authentication.services.Authentication
         */
        function isAuthenticated() {
            return !!$cookies.authenticatedAccount;
        }

        /**
         * @name setAuthenticatedAccount
         * @desc Stringify the account object and store it in a cookie
         * @param {Object} account The account object to be stored
         * @returns {undefined}
         * @memberOf thinkster.authentication.services.Authentication
         */
        function setAuthenticatedAccount(account) {
            $cookies.authenticatedAccount = JSON.stringify(account);
        }

        /**
         * @name unauthenticate
         * @desc Delete the cookie where the user object is stored
         * @returns {undefined}
         * @memberOf thinkster.authentication.services.Authentication
         */
        function unauthenticate() {
            delete $cookies.authenticatedAccount;
        }
    }
})();
