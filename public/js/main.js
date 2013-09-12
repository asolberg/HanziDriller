var AppRouter = Backbone.Router.extend({

    routes: {
        ""                        : "home",
        "hanzidrills"             : "list",
        "hanzidrills/add"         : "addHanziDrill",
        "hanzidrills/:id"         : "hanzidrillDetails",
  //    "hanzidrillstart/:id"     : "hanzidrillStart",
        "about"             : "about",
        "stats"             : "stats"
    },

    initialize: function () {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.el);
    },

    home: function (id) {
        if (!this.homeView) {
            this.homeView = new HomeView();
        }
        $('#content').html(this.homeView.el);
        this.headerView.selectMenuItem('home-menu');
    },

        
  list: function(page) {
        var hanzidrillList = new HanziDrillCollection();
        hanzidrillList.fetch({success: function(){
          $("#content").html(new HanziDrillListView({model:hanzidrillList}).el);
        }});
        this.headerView.selectMenuItem('home-menu');
    },

    hanzidrillDetails: function (id) {
        var hanzidrill = new HanziDrill({_id: id});
        hanzidrill.fetch({success: function(){
            $("#content").html(new HanziDrillView({model: hanzidrill}).el);
        }});
        this.headerView.selectMenuItem();
    },

	addHanziDrill: function() {
        var hanzidrill = new HanziDrill();
        $('#content').html(new HanziDrillView({model: hanzidrill}).el);
        this.headerView.selectMenuItem('add-menu');
	},

    about: function () {
        if (!this.aboutView) {
            this.aboutView = new AboutView();
        }
        $('#content').html(this.aboutView.el);
        this.headerView.selectMenuItem('about-menu');
    },
    stats: function () {
        var hanzidrillList = new HanziDrillCollection();
        hanzidrillList.fetch({success: function(){
        $('#content').html(new StatsView({model: hanzidrillList.models[0]}).el);
        }});
        this.headerView.selectMenuItem('stat-menu');
    }
});

utils.loadTemplate(['HomeView', 'StatsView','HeaderView', 'HanziDrillView', 'HanziDrillListItemView', 'HanziDrillStartView','AboutView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});
