"use strict";

loader(function() {

    /**
     * @module Session Storage
     * @description Used to retrieve,send and delete key and value from session storage
     */


    /**
     *@method addData
     *@description to add data to session storage
     *@param {string} key is the key of the session storage
     *@param {string} val is the value of the key to be stored
     *@return none
     */

    function addData(key, val) {
        if (!key || !val) {
            return false;
        }
        localStorage.setItem(key, val);
    }

    /**
     *@method getData
     *@description retrieves the data from the session sessionStorage.
     *@param {string} key is the key whose value is to be retrieved.
     *@return the retrieved value from session storage.
     */

    function getData(key) {
        if (!key) {
            return false;
        }
        return localStorage.getItem(key);
    }

    /**
     *@method removeData
     *@description clears the session storage
     *@return none
     */

    function removeData() {
        localStorage.clear();
    }
    return {
        addData: addData,
        getData: getData,
        removeData: removeData
    };
});
