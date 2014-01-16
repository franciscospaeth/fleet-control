Ext.define('FleetControl.store.ControlFilters', {
	extend: 'Ext.data.ArrayStore',
    fields: ['key','caption'],
    data: [['active','Somente Ativos'],['all','Todos Registros']]
});