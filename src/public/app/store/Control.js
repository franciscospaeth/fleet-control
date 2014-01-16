Ext.define('FleetControl.store.Control', {
	extend: 'Ext.data.Store',
    autoSync: true,
    autoLoad: true,
    model: 'FleetControl.model.Control',
    proxy: {
        type: 'rest',
        url: 'api/listcontrol',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});