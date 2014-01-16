Ext.define('FleetControl.view.pairing.Pairing', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pairing',
    layout: 'border',
    border: 0,
    items: [{
        xtype: 'toolbar',
        region: 'north',
        items: [{
            text: 'Salvar',
            id: 'savePairingButton',
            disabled: true
        }, {
            text: 'Atualizar',
            id: 'refreshPairingButton'
        }, {
            xtype: 'label',
            text: 'Visão:'
        }, {
            xtype: 'combobox',
            id: 'pairingFilterCombo',
            store: 'PairingFilters',
            displayField:'caption',
            valueField:'key',
            queryMode: 'local',
            forceSelection: true,
            value: 'pared-not-pared'
        }]
    }, {
        region: 'center',
        layout: 'border',
        bodyPadding: 5,
        items: [{
            xtype: "grid",
            //columnWidth: 1 / 2,
            //height: '100%',
            region: 'west',
            width: '50%',
            id: 'pairingGrid',
            store: 'Pairings',
            columns: [{
                width: 28, // estado de pareado (último sinal, icone de sinal forte médio e fraco), não pareado, solto
                dataIndex: 'signalStatus',
                renderer: function(val) {
                	var img = null;
                	switch (val) {
            		case 'STRONG': img = 'weather_sun.png'; break; 
            		case 'MEDIUM_STRONG': img = 'weather_cloudy.png'; break; 
            		case 'MEDIUM': img = 'weather_clouds.png'; break; 
            		case 'MEDIUM_WEAK': img = 'weather_rain.png'; break; 
            		case 'WEAK': img = 'weather_lightning.png'; break; 
                	} 
                	
                	if (img == null) return '';
                	
                	return "<img src='resources/icons/" + img + "' />";
                } 
            }, {
                header: 'Nome',
                dataIndex: 'name',
                width: 200
            }, {
                header: 'E-mail',
                dataIndex: 'email',
                flex: 1
            }, {
                header: 'Anexo',
                dataIndex: 'attachedTo',
                width: 150
            }, {
                xtype: 'actioncolumn',
                header: 'Opções',
                width: 50,
                align:'center',
                items: [{
                    icon: 'resources/icons/control_eject_blue.png',
                    tooltip: 'Soltar',
                    getClass: function() {return 'action-name-release';},
                }, {
                    icon: 'resources/icons/control_equalizer_blue.png',
                    tooltip: 'Parear',
                    getClass: function() {return 'action-name-pare';},
                }]
            }],
            dockedItems: [{
                xtype: 'pagingtoolbar',
                store: 'Pairings',
                dock: 'bottom',
                width: '100%',
                displayInfo: false
            }],
        }, {
        	id: 'pairingFormContainer',
        	disabled: true,
        	region: 'center',
            autoScroll: true,
            border: 0,
            bodyPadding:10,
            items: [{
                xtype: 'form',
                id: 'pairingForm',
                autoHeight: true,
                width: '100%',
                border: 0,
                fieldDefaults: {
                    labelAlign: 'top',
                    anchor: '100%'
                },
                items: [{
                	xtype: 'displayfield',
                    name: 'name',
                    fieldLabel: 'Nome',
                }, {
                	xtype: 'displayfield',
                    name: 'email',
                    fieldLabel: 'E-mail',
                }, {
                	xtype: 'displayfield',
                    name: 'paredDate',
                    fieldLabel: 'Pareado em',
                    renderer: Ext.util.Format.dateRenderer('Y-m-d H:i'),
                }, {
                	xtype: 'displayfield',
                    name: 'releasedDate',
                    fieldLabel: 'Solto em',
                    renderer: Ext.util.Format.dateRenderer('Y-m-d H:i'),
                }, {
                    xtype: 'displayfield',
                    name: 'lastPing',
                    fieldLabel: 'Último Ping',
                    renderer: Ext.util.Format.dateRenderer('Y-m-d H:i'),
                }, {
                    xtype: 'combobox',
                    name: 'attachedTo',
                    fieldLabel: 'Anexo a',
                    store: 'Fleets',
                    displayField:'name',
                    valueField:'id',
                    forceSelection: true,
                    anchor: '100%',
                    minwidth: 200,
                }, {
                    xtype: 'textarea',
                    name: 'description',
                    fieldLabel: 'Descrição',
                }]
            }]
        }]
    }]
});
