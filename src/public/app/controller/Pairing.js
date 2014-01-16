Ext.define('FleetControl.controller.Pairing', {
    extend: 'Ext.app.Controller',
    stores: ['Pairings','PairingFilters','Fleets'],
    models: ['Pairing'],
    views: ['pairing.Pairing'],

    init: function() {
        this.control({
            '#pairingGrid' : {
            	selectionchange: this.onGridSelectionChange,
            	itemdblclick: this.onGridDoubleClick
            },
            '#savePairingButton' : {
            	click: this.onSave
            },
            '#refreshPairingButton' : {
            	click: this.reloadStore
            },
            '#pairingFilterCombo' : {
            	change: this.reloadStore
            },
            'actioncolumn' : {
            	click: this.onActionClick
            },
        });
        this.getStore('Pairings').on({
        	beforeload: this.setFilterParameters,
        });
    },

    setFilterParameters: function (store, operation) {
    	Ext.apply(operation, {
    		params: {
    			filterName: Ext.getCmp('pairingFilterCombo').getValue()
			}
    	});
    },

    onGridDoubleClick: function(view, record, item, index, e, eOpts) {
        if (record) {
        	Ext.getCmp('pairingForm').loadRecord(record);
        	this.readOnlyForm(false);
        }

        // workaround to recalculate layout in case of scroolbars introduced
        Ext.getCmp('pairingFormContainer').doLayout();
    },
    
    onGridSelectionChange: function(model, records) {
        if (!records[0]) {
        	Ext.getCmp('pairingForm').getForm().reset();
        	this.readOnlyForm(true);
        }
    },
    
    onSave: function() {
    	var form = Ext.getCmp('pairingForm').getForm();
    	if (form.isValid()) {
    		form.updateRecord(form.getRecord());
    	}
    },
    
    readOnlyForm: function(readOnly) {
    	Ext.getCmp('savePairingButton').setDisabled(readOnly);
    	Ext.getCmp('pairingFormContainer').setDisabled(readOnly);
    },
    
    reloadStore: function() {
    	Ext.data.StoreManager.get("Pairings").load();
    },

    onActionClick: function(view,cell,row,col,e) {
    	var m = e.getTarget().className.match(/\action-name-(\w+)\b/)
    	if(m){
    		switch(m[1]){
				case 'pare':
					alert('pairing');
					break;
				case 'release':
					alert('release');
					break;
	    		}
    	}
    }
    
});