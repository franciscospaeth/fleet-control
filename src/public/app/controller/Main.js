Ext.define('FleetControl.controller.Main', {
    extend: 'Ext.app.Controller',
    stores: ['History','User'],
    model: ['History','User'],
    views: ['main.Main','main.Login'],

    init: function() {
        this.control({
        	"#refreshToolButton": {
        		click: this.reloadStore
        	},
        	"#login" : {
        		click: this.performLogin
        	}
        });
    },
    
    reloadStore: function () {
    	Ext.data.StoreManager.get("History").load();
    },
    
    performLogin: function () {
    	var password = Ext.getCmp("password");
    	var username = Ext.getCmp("username");
    	
    	if (username.getValue() == password.getValue()) {
    		this.showMain();
    	}
    },
    
    showMain: function () {
    	var main = Ext.getCmp("mainView");
    	var login = Ext.getCmp("loginView");
    	
    	login.setVisible(false);
    	main.setVisible(true);
    }

});
