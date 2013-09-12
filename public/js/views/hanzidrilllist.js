window.HanziDrillListView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        var hanzidrills = this.model.models;
var hanziNumberArray=['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];        
        $(this.el).html('<ul class="thumbnails"></ul>');
        for (var i = 0; i < hanzidrills.length; i++) {
          $('.thumbnails', this.el).append(new HanziDrillListItemView({model: hanzidrills[i],hanziNumber: hanziNumberArray[i]}).render().el);
        }
 //           $('.thumbnails', this.el).append(new HanziDrillListItemView({model: hanzidrills[i]}).render().el);

 //       $(this.el).append(new Paginator({model: this.model, page: this.options.page}).render().el);

        return this;
    }
});

window.HanziDrillListItemView = Backbone.View.extend({

    tagName: "li",

    initialize: function () {
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },
    render: function () {
      var numberDict = {'currentNumber':this.options.hanziNumber};
          var data = jQuery.extend(this.model.toJSON(),numberDict);
        $(this.el).html(this.template(data));
        return this;
    }

});
