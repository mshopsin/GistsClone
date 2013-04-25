window.GC = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Store: {},
  initialize: function() {
    var $rootEl = $('#content');
    $('#logout-button').on('click', this.logout);

    GC.Store.Users = new GC.Collections.Users();
    GC.Store.Gists = new GC.Collections.Gists();
    GC.Store.Gists.fetch();

    GC.Store.Users.fetch({
      success: function(){
        console.log(GC.Store.Users);

        var router = new GC.Routers.Gist($rootEl);
        Backbone.history.start();
      }
    });
  },

  logout: function() {
    Backbone.history.navigate("#/");
  }
};

$(document).ready(function(){
  GC.initialize();
});
