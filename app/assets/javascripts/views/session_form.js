GC.Views.SessionForm = Backbone.Form.extend({
  schema: {
    name: 'Text',
    password: 'Password'
  },

  data: {
    name: 'cat',
    password: 'Insecure'
  }
});