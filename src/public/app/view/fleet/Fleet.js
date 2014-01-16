Ext.define('FleetControl.view.fleet.Fleet', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.fleet',
    layout: 'border',
    border: 0,
    items: [{
        xtype: 'toolbar',
        region: 'north',
        items: [{
            text: 'Salvar',
            disabled: true,
            id: 'saveFleetButton'
        },{
            text: 'Atualizar',
            id: 'refreshFleetButton'
        }]
    }, {
        region: 'center',
        layout: 'border',
        bodyPadding: 5,
        items: [{
        	//columnWidth: 1 / 2,
        	//height: '100%',
            xtype: "grid",
            id: 'fleetsGrid',
            width: '50%',
            region: 'west',
            store: 'Fleets',
            columns: [{
                width: 28,
                dataIndex: 'status',
                renderer: function(val) {
                	var img = val == 'IN_USE' ? "package_green.png" : "package.png";
                	return "<img src='resources/icons/" + img + "' />";
                } 
            }, {
                header: 'Nome',
                dataIndex: 'name',
                width: 200
            }, {
                header: 'Descrição',
                dataIndex: 'description',
                flex: 1
            }, {
                header: 'Ativo',
                dataIndex: 'active',
                width: 50
            }, {
                xtype: 'actioncolumn',
                align: 'center',
                header: 'Opções',
                width: 50,
                items: [{
                    icon: 'resources/icons/application_form_delete.png',
                    tooltip: 'Delete',
                    getClass: function() {return 'action-name-delete';},
                }]
            }],
            dockedItems: [{
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                width: '100%',
                displayInfo: false,
                store: 'Fleets'
            }],
        }, {
        	id: 'fleetFormContainer',
        	region: 'center',
            autoScroll: true,
            border: 0,
            disabled: true,
            bodyPadding:10,
            items: [{
                xtype: 'form',
                id: 'fleetForm',
                autoHeight: true,
                width: '100%',
                border: 0,
                fieldDefaults: {
                    labelAlign: 'top',
                    anchor: '100%'
                },
                items: [{
                    xtype: 'checkbox',
                    name: 'active',
                    fieldLabel: 'Ativo',
                }, {
                    xtype: 'textfield',
                    name: 'name',
                    fieldLabel: 'Nome',
                }, {
                    xtype: 'textarea',
                    name: 'description',
                    fieldLabel: 'Descrição',
                }]
            }]
        }]
    }]
});
