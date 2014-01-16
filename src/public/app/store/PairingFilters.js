Ext.define('FleetControl.store.PairingFilters', {
	extend: 'Ext.data.ArrayStore',
    fields: ['key','caption'],
    data: [['pared-not-pared','Pareados ou Não'],['not-pared','Não Pareados'],['pared','Pareados'],['released','Soltos']]
});