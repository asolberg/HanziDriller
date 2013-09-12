window.StatsView = Backbone.View.extend({

    initialize:function () {
        this.render();
    },
    
    buildStats: function () {
        
        var statsDict ={"key": "Series1",
                      "color": "#d62728",
                      "values":[]};
        
        var userMissedChars = this.model.get("missedchars");
        
        for (var key in userMissedChars){
           var pushDict = {"label":key,"value":userMissedChars[key]};
           statsDict.values.push(pushDict); 
        }
        
        statsDict.values =    statsDict.values.sort(function(a,b) {
            return b.value - a.value;
        });

        return statsDict;
        
        },

    render:function () {
      var statsDict = this.buildStats();
      var arrayWrapper = [];
      arrayWrapper.push(statsDict);
      var dictWrapper = {};
      dictWrapper.data = arrayWrapper;
        $(this.el).html(this.template(dictWrapper));
        return this;
    }
});
