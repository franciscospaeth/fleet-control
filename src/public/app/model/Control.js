Ext.define('FleetControl.model.Control', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'id', type: 'int'}, 
        { name: 'name', type: 'string'}, 
        { name: 'email', type:'string'}, 
        { name: 'ping', type:'string'},
        { name: 'status', type:'string'},
        { name: 'attachedTo', type:'string'},
        { name: 'description', type:'string'},
        { name: 'position', type:'string' }
    ]
});