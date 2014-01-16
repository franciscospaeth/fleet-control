Ext.define('FleetControl.store.User', {
	extend: 'Ext.data.Store',
	model: 'FleetControl.model.User',
	autoLoad: true,
	 
	proxy: {
	    type: 'ajax',
	    url: 'api/listlogin',
	    method: 'GET',
	    reader: {
	        type: 'json',
	        root: 'model',
	        successProperty: 'model.success'
	    }
	}
});