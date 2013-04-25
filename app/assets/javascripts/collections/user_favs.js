GC.Collections.UserFavs = Backbone.Collection.extend({
  model: GC.Models.Fav,

  initialize: function(models, options) {
    this.user_id = options.user_id;
  },

  url: function() {
    return "/users/" + this.user_id + "/favorites";
  }

});