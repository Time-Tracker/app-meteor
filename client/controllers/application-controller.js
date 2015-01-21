ApplicationController = RouteController.extend({
    layoutTemplate: 'AppLayout',

    onBeforeAction: function () {
        console.log('app before hook!');
        this.next();
    },

    action: function () {
        console.log('this should be overridden!');
    }
});