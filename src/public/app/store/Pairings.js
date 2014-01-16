Ext.define('FleetControl.store.Pairings', {
	extend: 'Ext.data.Store',
    autoSync: true,
    autoLoad: true,
    model: 'FleetControl.model.Pairing',
    proxy: {
        type: 'rest',
        reader: {
            type: 'json',
            root: 'data'
        },
        writer: {
        	type: 'json',
        },
        api: {
            create  : 'api/pairing/save',
            read    : 'api/pairing/read',
            update  : 'api/pairing/save',
            destroy : 'api/pairing/delete'
        }
    }
});