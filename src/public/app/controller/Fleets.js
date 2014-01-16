Ext.define('FleetControl.controller.Fleets', {
    extend: 'Ext.app.Controller',
    stores: ['Fleets'],
    models: ['Fleet'],
    views: ['fleet.Fleet'],

    init: function() {
        this.control({
            '#fleetsGrid' : {
            	selectionchange: this.onGridSelectionChange,
            	itemdblclick: this.onGridDoubleClick,
            },
            '#refreshFleetButton' : {
            	click: this.onRefresh
            },
            'actioncolumn' : {
            	click: this.onActionClick
            }
        });
    },

    onGridDoubleClick: function(view, record, item, index, e, eOpts) {
        if (record) {
        	Ext.getCmp('fleetForm').loadRecord(record);
        	this.readOnlyForm(false);
        }
    },
    
    onGridSelectionChange: function(model, records) {
        if (!records[0]) {
        	Ext.getCmp('fleetForm').getForm().reset();
        	this.readOnlyForm(true);
        }
    },
    
    onRefresh: function() {
    	Ext.data.StoreManager.get("Fleets").load();
    },
    
    readOnlyForm: function(readOnly) {
    	Ext.getCmp('saveFleetButton').setDisabled(readOnly);
    	Ext.getCmp('fleetFormContainer').setDisabled(readOnly);
    },
    
    onActionClick: function(view,cell,row,col,e) {
    	var m = e.getTarget().className.match(/\action-name-(\w+)\b/)
    	if(m){
    		switch(m[1]){
    			case 'delete':
    				var record = view.store.getAt(row);
    				Ext.data.StoreManager.get("Fleets").remove([record]);
    				break;
    		}
    	}
    }
    
});