Ext.define('FleetControl.model.Fleet', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'id', type: 'int'}, 
        { name: 'name', type: 'string'}, 
        { name: 'status', type: 'string'}, 
        { name: 'description', type:'string'}, 
        { name: 'active', type:'boolean'}
    ]
});