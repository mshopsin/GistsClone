GC.Routers.Gist = Backbone.Router.extend({
  routes: {
    "": "newSession",
    "users/:id": "userShow",
    "fav/:id" : "createFav",
    "fav_destroy/:id" : "destroyFav"
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

          that.fetchFavs();
        }
      });

     });

  },

  fetchFavs: function() {
    GC.Store.UserGists.fetch({
      success: function() {
        GC.Store.UserFavs = new GC.Collections.UserFavs([],{
          user_id: window.sessionToken
        });

        GC.Store.UserFavs.fetch({
          success: function() {
            Backbone.history.navigate("#/users/" + window.sessionToken);
          }
        });
      }
    });
  },

  userShow: function() {
    var that = this;
    if(typeof window.sessionToken == 'undefined'){
      Backbone.history.navigate("#/");
    } else {
      var user = GC.Store.Users.get(window.sessionToken);
      var userView = new GC.Views.UserShow(user);
      that.$rootEl.html(userView.render().$el);
    }
  },

  createFav: function(id) {
    var that = this;
    var newFav = new GC.Models.Fav({
      user_id: window.sessionToken,
      gist_id: id
    });
    newFav.save([],{
      success: function() {
         that.fetchFavs();
         $('.fav-buttons[data-fav=\''+newFav.get("gist_id") + '\']').hide();
         $('.hate-buttons[data-hate=\''+newFav.get("gist_id") + '\']').show();
       }
    });

    Backbone.history.navigate("#/users/" + window.sessionToken);
  },

  destroyFav: function(id) {
    console.log(id);
   // this.removal_id = id;
    console.log(GC.Store.UserFavs);
    var favModel = GC.Store.UserFavs.where({gist_id: id})[0].destroy();
    // console.log(favModel);
 //    favModel[0].destroy( {
 //      success: function(model, response) {
 //        console.log(GC.Store.UserFavs);
 //        $('.fav-buttons[data-fav=\''+newFav.get("gist_id") + '\']').show();
 //        $('.hate-buttons[data-fav=\''+newFav.get("gist_id") + '\']').hide();
 //      }
 //    });

  }
});