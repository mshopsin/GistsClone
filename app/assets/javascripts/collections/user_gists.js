GC.Collections.UserGists = Backbone.Collection.extend({
  model: GC.Models.Gist,

  initialize: function(models, options) {
    this.user_id = options.user_id;
  },

  url: function() {
    return "/users/0/gists";
  }

});