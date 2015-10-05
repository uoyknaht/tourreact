import React from 'react';
import Router from 'react-router';  
import routes from './routes';

(function () {

    'use strict';

    // Router.run(routes, Router.HistoryLocation, function (Handler, state) {
    Router.run(routes, function (Handler, state) {
        var params = state.params;
        React.render(<Handler params={params}/>, document.body);
    });    

})();