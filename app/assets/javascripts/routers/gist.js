GC.Routers.Gist = Backbone.Router.extend({
  routes: {
    "": "newSession",
    "users/:id": "userShow",
    "fav/:id" : "createFav"
  },

  initialize: function($rootEl) {
    this.$rootEl = $rootEl;
  },

  newSession: function() {
    var that = this;
    var sessionForm = new GC.Views.SessionForm();
    window.sessionToken = undefined;

    that.$rootEl.html(sessionForm.render().$el);
    sessionForm.$el
      .find('#password')
      .after('<br><button id="submit">Log On</button>');

    $("#submit").click(function(event ){
      event.preventDefault();
      var name = sessionForm.$el.find('#name').val();

      $.ajax({
        type: "POST",
        url: "/sessions",
        data: { user: { name: name}},
        success: function(rsp){
          window.sessionToken = rsp;
          GC.Store.UserGists = new GC.Collections.UserGists([],{
            user_id: window.sessionToken
          });

          GC.Store.UserGists.fetch({
            success: function() {
              GC.Store.UserFavs = new GC.Collections.UserFavs([],{
                user_id: window.sessionToken
              });

              GC.Store.UserFavs.fetch({
                success: function() {
                  Backbone.history.navigate("#/users/" + rsp);
                }
              });
            }
          });
        }
      });

     });

  },

  userShow: function() {
    var that = this;
    console.log(typeof window.sessionToken);
    if(typeof window.sessionToken == 'undefined'){
      Backbone.history.navigate("#/");
    } else {
      var user = GC.Store.Users.get(window.sessionToken);
      var userView = new GC.Views.UserShow(user);
      that.$rootEl.html(userView.render().$el);
    }
  },

  createFav: function(id) {
    console.log(id);
  }


});