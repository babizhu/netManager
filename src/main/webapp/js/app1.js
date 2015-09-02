Ext.define('Writer.Form', {
    extend: 'Ext.form.Panel',
    alias: 'widget.writerform',

    requires: ['Ext.form.field.Text', 'Ext.Viewport'/**,'Ext.ux.form.SearchField'**/],

    initComponent: function () {
        Ext.apply(this, {
            activeRecord: null,
            iconCls: 'icon-user',
            frame: true,
            title: 'Device -- All fields are required',
            defaultType: 'textfield',
            bodyPadding: 5,
            fieldDefaults: {
                anchor: '100%',
                labelAlign: 'right'
            },
            items: [{
                fieldLabel: 'User',
                name: 'uname',
                allowBlank: false
                //vtype: 'email'
            }, {
                fieldLabel: 'Device',
                name: 'device',
                allowBlank: false
            }, {
                fieldLabel: 'Mac address',
                name: 'mac',
                allowBlank: false
            }, {
                fieldLabel: 'Ip',
                name: 'ip',
                allowBlank: false
            }, {
                fieldLabel: 'Description',
                name: 'description',
                allowBlank: true
            }],
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                items: ['->', {
                    iconCls: 'icon-user-add',
                    text: 'Create',
                    scope: this,
                    handler: this.onCreate
                }, {
                    iconCls: 'icon-reset',
                    text: 'Reset',
                    scope: this,
                    handler: this.onReset
                }]
            }]
        });
        this.callParent();
    },

    setActiveRecord: function (record) {
        this.activeRecord = record;
        if (record) {
            this.down('#save').enable();
            this.getForm().loadRecord(record);
        } else {
            this.down('#save').disable();
            this.getForm().reset();
        }
    },

    onSave: function () {
        var active = this.activeRecord,
            form = this.getForm();

        if (!active) {
            return;
        }
        if (form.isValid()) {
            form.updateRecord(active);
            this.onReset();
        }
    },

    onCreate: function () {
        var form = this.getForm();

        if (form.isValid()) {
            //store.insert(0, form.getValues());
            this.fireEvent('create', this, form.getValues());
            form.reset();
        }

    },

    onReset: function () {
        this.setActiveRecord(null);
        this.getForm().reset();
    }
});

Ext.define('Writer.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.writergrid',

    requires: [
        'Ext.grid.plugin.CellEditing',
        'Ext.form.field.Text',
        'Ext.toolbar.TextItem'
    ],

    initComponent: function () {

        this.editing = Ext.create('Ext.grid.plugin.CellEditing');

        Ext.apply(this, {
            iconCls: 'icon-grid',
            //frame: true,
            features: [{
                id: 'group',
                ftype: 'groupingsummary',
                groupHeaderTpl: '{name}',
                hideGroupedHeader: true,
                enableGroupingMenu: false,
                remoteRoot: 'summaryData'
            }],
            plugins: [this.editing],
            dockedItems: [{
                //xtype: 'toolbar',
                //items: [{
                //    iconCls: 'icon-add',
                //    text: 'Add',
                //    scope: this,
                //    handler: this.onAddClick
                //}, {
                //    iconCls: 'icon-delete',
                //    text: 'Delete',
                //    disabled: true,
                //    itemId: 'delete',
                //    scope: this,
                //    handler: this.onDeleteClick
                //}]
            }, {
                weight: 2,
                xtype: 'toolbar',
                dock: 'bottom',
                items: [
                    //    {
                    //    xtype: 'tbtext',
                    //    text: '<b>@cfg</b>'
                    //}, '|', {
                    //    text: 'autoSync',
                    //    enableToggle: true,
                    //    pressed: true,
                    //    tooltip: 'When enabled, Store will execute Ajax requests as soon as a Record becomes dirty.',
                    //    scope: this,
                    //    toggleHandler: function(btn, pressed){
                    //        this.store.autoSync = pressed;
                    //    }
                    //}, {
                    //    text: 'batch',
                    //    enableToggle: true,
                    //    pressed: true,
                    //    tooltip: 'When enabled, Store will batch all records for each type of CRUD verb into a single Ajax request.',
                    //    scope: this,
                    //    toggleHandler: function(btn, pressed){
                    //        this.store.getProxy().batchActions = pressed;
                    //    }
                    //}, {
                    //    text: 'writeAllFields',
                    //    enableToggle: true,
                    //    pressed: false,
                    //    tooltip: 'When enabled, Writer will write *all* fields to the server -- not just those that changed.',
                    //    scope: this,
                    //    toggleHandler: function(btn, pressed){
                    //        this.store.getProxy().getWriter().writeAllFields = pressed;
                    //    }
                ]
            }, {
                weight: 1,
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                items: ['->', {
                    iconCls: 'icon-add',
                    text: 'Add',
                    //disabled: true,
                    itemId: 'add',
                    scope: this,
                    handler: this.onAddClick

                }, {
                    iconCls: 'icon-delete',
                    text: 'Delete',
                    disabled: true,
                    itemId: 'delete',
                    scope: this,
                    handler: this.onDeleteClick

                }, {
                    iconCls: 'icon-save',
                    text: 'Sync',
                    scope: this,
                    handler: this.onSync
                }
                //    ,{
                //    width : 300,
                //    fieldLabel : '搜索',
                //    labelWidth : 50,
                //    xtype : 'searchfield',
                //    store : this.store
                //}
                ]

            }],
            forceFix: true,
            columns: [{
                text: 'ID',
                sortable: true,
                resizable: false,
                draggable: false,
                hideable: false,
                menuDisabled: true,
                dataIndex: 'id',
                renderer: function (value) {
                    return Ext.isNumber(value) ? value : '&nbsp;';
                }
            }, {
                header: 'User',
                flex: 1,
                sortable: true,
                dataIndex: 'uname',
                field: {
                    type: 'textfield'
                }
            }, {
                header: 'Device',
                flex: 1,
                sortable: true,
                dataIndex: 'device',
                field: {
                    type: 'textfield'
                }
            }, {
                header: 'Mac',
                flex: 1,
                sortable: true,
                dataIndex: 'mac',
                field: {
                    type: 'textfield'
                }
            }, {
                header: 'Ip',
                flex: 1,
                sortable: true,
                dataIndex: 'ip',
                field: {
                    type: 'textfield'
                }
            }, {
                header: 'Description',
                flex: 1,
                sortable: false,
                dataIndex: 'description',
                field: {
                    type: 'textfield'
                }
            }]
        });
        this.callParent();
        this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
    },

    onSelectChange: function (selModel, selections) {
        this.down('#delete').setDisabled(selections.length === 0);
    },

    onSync: function () {
        this.store.sync();

    },

    onDeleteClick: function () {
        var selection = this.getView().getSelectionModel().getSelection()[0];
        if (selection) {
            this.store.remove(selection);
        }
        this.store.sync();
    },

    onAddClick: function () {
        //if (this.window == null) {
        this.window = new Ext.Window({
            items: [{
                xtype: 'writerform',

                //manageHeight: false,
                margin: '0 0 10 0',
                listeners: {
                    create: function (form, data) {
                        this.store.insert(0, data);
                        //this.store.sync();
                    },
                    scope: this
                }
            }]
        })
        //}
        this.window.show();
    }
});

//Ext.define('Writer.Person', {
//    extend: 'Ext.data.Model',
//    fields: [{
//        name: 'id',
//        type: 'int',
//        useNull: true
//    }, 'email', 'first', 'last'],
//    validators: {
//        email: {
//            type: 'length',
//            min: 1
//        },
//        first: {
//            type: 'length',
//            min: 1
//        },
//        last: {
//            type: 'length',
//            min: 1
//        }
//    }
//});
Ext.define('MacInfo', {
    extend: 'Ext.data.Model',
    idProperty: 'taskId',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'uname', type: 'string'},
        {name: 'mac', type: 'string'},
        {name: 'ip', type: 'string'},
        //{name: 'description', type: 'string'},
        {name: 'device', type: 'string'},
        {name: 'description', type: 'string'}
    ]
});

Ext.require([
    'Ext.data.*',
    'Ext.tip.QuickTipManager',
    'Ext.window.MessageBox'
]);

Ext.onReady(function () {
    //Ext.tip.QuickTipManager.init();

    //Ext.create('Ext.button.Button', {
    //    margin: '0 0 20 20',
    //    text: 'Reset sample database back to initial state',
    //    renderTo: document.body,
    //    tooltip: 'The sample database is stored in the session, including any changes you make. Click this button to reset the sample database to the initial state',
    //    handler: function(){
    //        Ext.getBody().mask('Resetting...');
    //        Ext.Ajax.request({
    //            url: 'app.php/example/reset',
    //            callback: function(options, success, response) {
    //                Ext.getBody().unmask();
    //
    //                var didReset = true,
    //                    o;
    //
    //                if (success) {
    //                    try {
    //                        o = Ext.decode(response.responseText);
    //                        didReset = o.success === true;
    //                    } catch (e) {
    //                        didReset = false;
    //                    }
    //                } else {
    //                    didReset = false;
    //                }
    //
    //                if (didReset) {
    //                    store.load();
    //                    main.down('#form').setActiveRecord(null);
    //                    Ext.example.msg('Reset', 'Reset successful');
    //                } else {
    //                    Ext.MessageBox.alert('Error', 'Unable to reset example database');
    //                }
    //
    //            }
    //        });
    //    }
    //});

    var store = Ext.create('Ext.data.Store', {
        model: 'MacInfo',
        autoLoad: true,
        autoSync: true,
        proxy: {
            type: 'ajax',
            api: {
                read: '/NetManager/mac/read',
                create: '/NetManager/mac/create',
                update: '/NetManager/mac/update',
                destroy: '/NetManager/mac/destroy'
            },
            reader: {
                ttype: 'json',
                rootProperty: 'data'
            },
            writer: {
                type: 'json',
                writeAllFields: true,
                clientIdProperty: 'clientid',
                rootProperty: 'data'
            },
            listeners: {
                exception: function (proxy, response, operation) {
                    Ext.MessageBox.show({
                        title: 'REMOTE EXCEPTION',
                        msg: operation.getError(),
                        icon: Ext.MessageBox.ERROR,
                        buttons: Ext.Msg.OK
                    });
                }
            }
        },
        sorters: {property: 'uname', direction: 'ASC'},
        groupField: 'uname',
        listeners: {
            write: function (proxy, operation) {
                if (operation.action == 'destroy') {
                    main.child('#form').setActiveRecord(null);
                }
                //Ext.example.msg(operation.action, operation.getResultSet().message);
            }
        }
    });


    //var main = Ext.create('Ext.container.Container', {
    //    padding: '0 0 0 0',
    //    //height: Ext.themeName === 'neptune' ? 700 : 650,
    //    renderTo: document.body,
    //    layout: 'fit',
    //    items: [
    //
    //        {
    //        itemId: 'grid',
    //        xtype: 'writergrid',
    //        title: 'Devices List',
    //        store: store,
    //        listeners: {
    //            selectionchange: function(selModel, selected) {
    //                main.child('#form').setActiveRecord(selected[0] || null);
    //            }
    //        }
    //    }]
    //});
    new Ext.Viewport({
        layout: 'border',
        items: [{
            region: 'center',
            layout: 'fit',
            items: [
                {
                    itemId: 'grid',
                    xtype: 'writergrid',
                    title: 'Devices List[双击单元格可进行编辑]',
                    store: store,
                    listeners: {
                        selectionchange: function (selModel, selected) {
                            //main.child('#form').setActiveRecord(selected[0] || null);
                        }
                    }
                }]
        }]
    });
});