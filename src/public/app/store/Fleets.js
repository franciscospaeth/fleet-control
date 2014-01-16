Ext.define('FleetControl.store.Fleets', {
	extend: 'Ext.data.Store',
    autoSync: true,
    autoLoad: true,
    model: 'FleetControl.model.Fleet',
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
            create  : 'api/fleet/save',
            read    : 'api/fleet/read',
            update  : 'api/fleet/save',
            destroy : 'api/fleet/delete'
        }
    }
});