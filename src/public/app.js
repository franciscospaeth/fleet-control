Ext.Loader.setConfig({
	enabled : true
});

Ext.require('*');

Ext.onReady(checkLoggedIn);

function checkLoggedIn() {
	Ext.Ajax.request({
		url : '/api/listlogin',
		method : 'GET',
		params : {},
		success : function(result, request) {
			var jsonData = Ext.JSON.decode(result.responseText);
			
			var component = null;
			var controllers = null;
			
			if (jsonData.totalCount > 0) {
				component = {xtype : 'main', border : 0, id : 'mainView'};
				controllers = [ 'Main', 'Fleets', 'Pairing', 'Control' ];
			} else {
				component = {xtype : 'loginform', border : 0, id : 'loginView'};
				controllers = [ 'Main' ];
			}
			
			Ext.application(getApplication(component, controllers));
		},
		failure : function(result, request) {
			Ext.Msg.alert('Erro', 'Não foi possível confirmar o estado da conexão.');
		}
	});
}

function getApplication(component, controllers) {
	return {
		name : 'FleetControl',
		appFolder : 'app',
		requires : [ 'Ext.container.Viewport', 'FleetControl.ux.GMapPanel' ],
		controllers : controllers,
		launch : function() {
			Ext.create('Ext.container.Viewport', {layout : 'fit', items : [component]});
		}
	};
}