Ext.define('FleetControl.view.main.Main', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.main',
  layout: 'border',
  items: [{
	  xtype: 'panel',
      region: 'north',
      height: 75,
      header: false,
      bodyStyle: "padding-top:45;padding-right:7px;background-image: url('resources/header.jpg')",
      items: [{
          xtype: 'button',
          style: 'float:right',
          text: 'Logout',
      }]
  }, {
      region: 'center',
      xtype: 'tabpanel',
      id: 'mainTabpanel',
      items: [{
          title: 'Frota',
          xtype: 'fleet',
          id: 'fleetPanel'
      }, {
    	  xtype: 'pairing',
          title: 'Pareados',
          id: 'pairingPanel'
      }, {
    	  xtype: 'control',
    	  title: 'Controle',
    	  id: 'controlPanel'
      }]
  }, {
      title: 'Histórico',
      region: 'south',
      height: 150,
      layout: 'fit',
      items: [{
          xtype: 'grid',
          store: 'History',
          columns: [{
              header: '',
              dataIndex: 'type',
              width: 28,
              renderer: function(val) {
              	var img = null;
              	switch (val) {
          		case 'CONTROL-PING': img = 'bell_error.png'; break; 
          		case 'PAIRING': img = 'bell.png'; break; 
              	} 
              	
              	if (img == null) return '';
              	
              	return "<img src='resources/icons/" + img + "' />";
              } 
          }, {
              header: 'Data/Hora',
              dataIndex: 'date',
              renderer: Ext.util.Format.dateRenderer('Y-m-d H:i'),
              width: 150
          }, {
              header: 'De',
              dataIndex: 'from',
              width: 200
          }, {
              header: 'Descrição',
              dataIndex: 'description',
              flex: 1
          }]
      }],
      tools: [{
          type: 'refresh',
          tooltip: 'Refresh form Data',
          id: 'refreshToolButton'
      }]
  }]
});
