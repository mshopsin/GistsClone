GC.Views.UserShow = Backbone.View.extend({
  events: {

  },

  initialize: function(user){
    this.user = user;
  },

  render: function(){
    var that = this;
    var renderContent = JST["users/show"]({ user: that.user});
    that.$el.html(renderContent);
    var userGists = new GC.Views.UserGists({ collection: GC.Store.UserGists });
    that.$el.append( userGists.render().$el );

    console.log(GC.Store.UserGists);

    var gists = new GC.Views.UserGists({
      collection: GC.Store.Gists },
      { className: "gists-list" }
    );
    that.$el.append( gists.render().$el );

    that.hideFavorites();
    return that;
  },

  hideFavorites: function() {
    $('')
  }
});