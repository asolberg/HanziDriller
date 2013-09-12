window.HanziDrillStartView = Backbone.View.extend({

    initialize: function () {
    this.round_wrong_chars = [];
    this.session_wrong_chars = {};
    this.current_iteration = 0;
    this.render();
    },

    events: {
        "click .nextstage"   : "nextstage",
        "click .reshuffle"   : "render",
        "click .drilldone"   : "drilldone"
    
    },

    drilldone: function() {
      
      var self = this;
      bootbox.confirm("Record Results?", function (result) {
      
        result ? self.saveResults() : alert("canceled") ;
      
      });
    },    
    deactivateTranslation: function() {
      alert("deactivate");
      mandarinspot.showPopups(false);
    },
    activateTranslation: function() {
      alert("activate");
      mandarinspot.showPopups(true);
    },
    saveResults: function () {
      // Update model with new missed character tally
      var toClass = {}.toString // (1)
//      alert('app is: ' + toClass.call(this.session_wrong_chars));
//      alert('value is: ' + JSON.stringify(this.session_wrong_chars));
      var user_wrong_chars = this.model.get("missedchars");
//      alert('user is: ' +toClass.call(user_wrong_chars));
//      alert('value is: ' + JSON.stringify(user_wrong_chars));

      for(var key in this.session_wrong_chars) {
        if (key in user_wrong_chars) {
          user_wrong_chars[key] = user_wrong_chars[key] + this.session_wrong_chars[key];
        } else {
          user_wrong_chars[key] = this.session_wrong_chars[key];
        }
      }
//      alert('final user is: ' +toClass.call(user_wrong_chars));
//      alert('final value is: ' + JSON.stringify(user_wrong_chars));
      this.model.set("missedchars", user_wrong_chars);
     
      //alert(JSON.stringify(this.model.get("name"), null, 4));
      //alert(JSON.stringify(this.model.get("listname"), null, 4));
      //alert(JSON.stringify(this.model.get("missedchars"), null, 4));
      // Save Model
      
      this.model.save(null, {
          success: function (model) {
                app.navigate('hanzidrills/' + model.id, true);
                utils.showAlert('Success!', 'HanziDrill saved successfully', 'alert-success');
            },  
            error: function () {
                utils.showAlert('Error', 'An error occurred while trying to save.', 'alert-error');
            }   
      }); 
    },
//
    nextstage: function () {
      var wrong_chars_string = $("hanzispan.highlighted").text();
      this.round_wrong_chars = [];      
      //alert(this.round_wrong_chars);
      for(var i = 0, len = wrong_chars_string.length; i < len; i++){
       this.session_wrong_chars[wrong_chars_string[i]] = (this.session_wrong_chars[wrong_chars_string[i]] || 0) + 1; 
        this.round_wrong_chars.push(wrong_chars_string[i]);
      };
      this.current_iteration += 1;
      this.render();
    },
    
    render: function () {
//      this.round_wrong_chars = _.shuffle(this.round_wrong_chars);
      var extended_options = {"round_wrong_chars": this.round_wrong_chars, "current_iteration": this.current_iteration,"start":this.options.start,"stop":this.options.stop};
     var self = this; 
      
     for(var i=1; i<10; i++){
        setTimeout(function(){
          self.$el.html(self.template(jQuery.extend(self.model.toJSON(), extended_options)));  
        }, i*200)
      };
      return this;
    }
});

