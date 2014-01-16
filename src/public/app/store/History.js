Ext.define('FleetControl.store.History', {
	extend: 'Ext.data.Store',
    autoSync: true,
    autoLoad: true,
    model: 'FleetControl.model.History',
    proxy: {
        type: 'rest',
        url: 'api/listhistory',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});