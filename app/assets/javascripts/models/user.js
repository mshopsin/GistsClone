GC.Models.User = Backbone.RelationalModel.extend({
  urlRoot: "/users",
  relations: [{
    type: Backbone.HasMany,
    key: 'gists',
    relatedModel: "GC.Models.Gist",
    collectionType: 'GC.Collections.UserGists',
    collectionOptions: function(user) {
      return {user: user};
    },
    reverseRelation: {
      key: "user",
      keySource: "user_id",
      includeInJSON: "id"
    }
  },

  {
    type: Backbone.HasMany,
    key: 'favs',
    relatedModel: "GC.Models.Fav",
    collectionType: 'GC.Collections.UserFavs',
    collectionOptions: function(user) {
      return {user: user};
    },
    reverseRelation: {
      key: "user",
      keySource: "user_id",
      includeInJSON: "id"
    }
  }]
});