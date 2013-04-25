GC.Views.UserGists = Backbone.View.extend({
  className: "user-gists",

  initialize: function(gists, options) {
    var that = this;

    if(options){
      that.className = options.className;
    }
  },

  render: function() {
    var that = this;
    console.log(that.collection);
    var renderedContent = JST["gists/user_gists"]({
      gists: that.collection
    });
    that.$el.html(renderedContent);
    return that;
  }
});