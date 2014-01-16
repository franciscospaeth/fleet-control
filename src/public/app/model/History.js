Ext.define('FleetControl.model.History', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'type', type:'string'}, 
        { name: 'date', type: 'date', dateFormat: 'Y-m-d H:i'}, 
        { name: 'from', type:'string'}, 
        { name: 'description', type:'string'}
    ]
});