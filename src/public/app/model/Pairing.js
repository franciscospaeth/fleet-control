Ext.define('FleetControl.model.Pairing', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'id', type: 'int'}, 
        { name: 'name', type: 'string'}, 
        { name: 'email', type:'string'}, 
        { name: 'recordStatus', type:'string'}, 
        { name: 'signalStatus', type:'string'}, 
        { name: 'paredDate', type: 'date', dateFormat: 'Y-m-d H:i'},
        { name: 'releasedDate', type: 'date', dateFormat: 'Y-m-d H:i'},
        { name: 'lastPing', type: 'date', dateFormat: 'Y-m-d H:i'},
        { name: 'attachedTo', type:'int'},
        { name: 'description', type:'string'}
    ]
});