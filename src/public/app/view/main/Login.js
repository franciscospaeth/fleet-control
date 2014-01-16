Ext.define('FleetControl.view.main.Login', {
	extend : 'Ext.form.FormPanel',
	alias : 'widget.loginform',
	items : [ {
		xtype : 'panel',
		name : 'loginform',
		icon : 'resources/icons/exclamation.png',
		title : 'Identificação Necessária',
		width : 400,
		height: 275,
		style : 'margin:auto;top:50%;margin-top:-137',
		layout : 'border',
		items : [ {
			border : 0,
			region : 'west',
			html : '<img src="resources/login.jpg" />',
			height : 300,
			width : 119
		}, {
			border : 0,
			region : 'center',
			bodyPadding : 10,
			items : [ {
				border:0,
				bodyPadding: "0 0 20 0",
				html:"Você está acessando um serviço disponível para assinantes. Para identificar-se digite seu usuário e senha nos campos indicados abaixo.",
			}, {
				border: 0,
				bodyPadding: "0 0 0 20",
				defaults : {
					labelAlign : 'top',
				},
				items:[{
					xtype: 'textfield',
					id : 'username',
					fieldLabel : 'Username',
					name : 'username',
					id : 'username',
					width : 200
				}, {height:10, border:0}, {
					xtype: 'textfield',
					fieldLabel : 'Password',
					name : 'password',
					id : 'password',
					inputType : 'password',
					width : 200
				}, {height:40, border:0}, {
					xtype: 'button',
					style: 'float:right',
					text: 'Login',
					icon: 'resources/icons/lock_open.png',
					id: 'login'
			}]} ]
		} ]
	} ]
});