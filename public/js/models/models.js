window.HanziDrill = Backbone.Model.extend({

    urlRoot: "/hanzidrills",

    idAttribute: "_id",

    initialize: function () {
      this.validators = {};    
    },    

    defaults: {
        _id: null,
        listname: null,
        listcontents: null,
        missedchars: null
    }
});

window.HanziDrillCollection = Backbone.Collection.extend({

    model: HanziDrill,

    url: "/hanzidrills"

});

