GC.Views.UserShow = Backbone.View.extend({
  events: {

  },

  render: function(){
    var that = this;
    var renderContent = JST["users/show"]({ user: that.model});
    that.$el.html(renderContent);
    var userGists = new GC.Views.UserGists({ collection: GC.Store.UserGists });
    that.$el.append( userGists.render().$el );

    var gists = new GC.Views.UserGists(
      {collection: GC.Store.Gists },
      { className: "gists-list" }
    );

    that.$el.append( gists.render().$el );

    that.hideFavorites(that.$el);
    return that;
  },

  hideFavorites: function(el) {
    GC.Store.UserFavs.each( function(fav) {
      el.find('*[data-fav=\''  + fav.get("gist_id") + '\']' ).hide();
      el.find('*[data-hate=\'' + fav.get("gist_id") + '\']' ).show();

    });
  }
});