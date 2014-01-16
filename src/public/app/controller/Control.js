Ext.define('FleetControl.controller.Control', {
    extend: 'Ext.app.Controller',
    stores: ['Control','ControlFilters'],
    models: ['Control'],
    views: ['control.Control'],

    init: function() {
        this.control({
        	'#refreshControlButton': {
            	click: this.reloadStore
        	},
	        '#controlFilterCombo' : {
	        	change: this.reloadStore,
	        },
	        '#map' : {
	        	afterrender: function () {this.updateMapPointsBasedOnStore(true)},
	        	resize: function () {this.updateMapPointsBasedOnStore(true)}
	        },
	        '#controlGrid' : {
            	itemdblclick: this.onGridItemDoubleClick,
	        }
        });
        this.getStore('Control').on({
        	beforeload: this.setFilterParameters,
        });
    },
    
    setFilterParameters: function (store, operation) {
    	Ext.apply(operation, {
    		params: {
    			filterName: Ext.getCmp('controlFilterCombo').getValue()
			}
    	});
    },

    reloadStore: function() {
    	Ext.data.StoreManager.get("Control").load();
    },
    
    updateMapPointsBasedOnStore: function(recenter) {
    	var store = Ext.data.StoreManager.get("Control");
    	
    	var map = Ext.getCmp('map');
    	
    	if (!map.getMap()) {
    		return;
    	}
    	
    	var clear = true;
    	for (var i = store.getCount()-1; i >= 0; i--) {
    		var record = store.getAt(i);
    		var position = record.get("position").split(" ");
    		var point = new GLatLng(position[0],position[1]);
    		var marker = {title: record.get("name") + " - " + record.get("ping")};
    		
    		var listeners = new Array();
    		listeners["click"] = function(i) {
    			return function() {
	    			var selectionModel = Ext.getCmp("controlGrid").getSelectionModel();
	    			selectionModel.deselectAll();
	    			var record = Ext.data.StoreManager.get("Control").getAt(i);
	    			selectionModel.select([record]);
    			}
    		}(i);
    		listeners["click"].i = i;
    		
    		map.addMarker(point, marker, clear, i == 0 && recenter, listeners);
    		clear = false;
    	}
    },

    onGridItemDoubleClick: function(view, record, item, index, e, eOpts) {
        if (record) {
    		var position = record.get("position").split(" ");
    		Ext.getCmp("map").moveTo(position[0],position[1]);
        }
    },
    
});