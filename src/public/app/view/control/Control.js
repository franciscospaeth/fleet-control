Ext.define('FleetControl.view.control.Control', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.control',
    layout: 'border',
    border: 0,
    items: [{
        xtype: 'toolbar',
        region: 'north',
        items: [{
            text: 'Atualizar',
            id: 'refreshControlButton'
        }, {
            xtype: 'label',
            text: 'Visão:'
        }, {
            xtype: 'combobox',
            id: 'controlFilterCombo',
            store: 'ControlFilters',
            displayField:'caption',
            valueField:'key',
            queryMode: 'local',
            forceSelection: true,
            value: 'active',
        }]
    }, {
        layout: 'border',
        region: 'center',
        bodyPadding: 5,
        items: [
        {
            xtype: "grid",
            id: 'controlGrid',
            width: '35%',
            store:'Control',
            region: 'west',
            columns: [{
                width: 28,	
                dataIndex: 'status',
                renderer: function(val) {
                	var img = null;
                	switch (val) {
            		case 'STRONG': img = 'weather_sun.png'; break; 
            		case 'MEDIUM_STRONG': img = 'weather_cloudy.png'; break; 
            		case 'MEDIUM': img = 'weather_clouds.png'; break; 
            		case 'MEDIUM_WEAK': img = 'weather_rain.png'; break; 
            		case 'WEAK': img = 'weather_lightning.png'; break; 
            		case 'NOT_PAIRED': img = 'bell.png'; break; 
            		case 'PAIRED': img = 'bell_link.png'; break; 
            		case 'RELEASED': img = 'bell_delete.png'; break; 
                	} 
                	
                	if (img == null) return '';
                	
                	return "<img src='resources/icons/" + img + "' />";
                } 
            }, {
                header: 'Nome',
                dataIndex: 'name',
                width: 200
            }, {
                header: 'Anexo',
                dataIndex: 'attachedTo',
                flex: 1
            }],
            dockedItems: [{
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                store: 'Control',
                width: '100%',
                displayInfo: false
            }]
        }, {
            xtype: 'gmappanel',
            id:'map',
            zoomLevel: 14,
            region: 'center',
            gmapType: 'map',
            mapConfOpts: ['enableScrollWheelZoom', 'enableDoubleClickZoom', 'enableDragging'],
            mapControls: ['GSmallMapControl', 'GMapTypeControl', 'NonExistantControl'],
            setCenter: {
                geoCodeAddr: 'Rua Guilherme Laubenstain, Rio do Sul - Santa Catarina, República Federativa do Brasil',
            },
//            markers: [{
//                lat: 42.339641,
//                lng: -71.094224,
//                marker: {
//                    title: 'Boston Museum of Fine Arts'
//                },
//                listeners: {
//                    click: function (e) {
//                        Ext.Msg.alert({
//                            title: 'Its fine',
//                            text: 'and its art.'
//                        });
//                    }
//                }
//            }, {
//                lat: 42.339419,
//                lng: -71.09077,
//                marker: {
//                    title: 'Northeastern University'
//                }
//            }]
        }]
    }]
});
