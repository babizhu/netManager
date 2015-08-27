Ext.Loader.setConfig({enabled: true});

Ext.require([
    'Ext.grid.*',
    'Ext.grid.plugin.CellEditing',
    'Ext.data.*'
]);
Ext.define('netManager.Form', {
    extend: 'Ext.form.Panel',
    alias: 'widget.netform',

    requires: ['Ext.form.field.Text'],

    initComponent: function () {
        Ext.apply(this, {
            activeRecord: null,
            iconCls: 'icon-user',
            frame: true,
            title: 'User -- All fields are required',
            defaultType: 'textfield',
            bodyPadding: 5,
            fieldDefaults: {
                anchor: '100%',
                labelAlign: 'right'
            },
            items: [{
                fieldLabel: 'Device',
                name: 'device',
                allowBlank: false
                //vtype: 'device'
            }, {
                fieldLabel: 'Ip',
                name: 'Ip',
                allowBlank: false
            }, {
                fieldLabel: 'Mac',
                name: 'mac',
                allowBlank: false
            }],
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                items: ['->', {
                    iconCls: 'icon-save',
                    itemId: 'save',
                    text: 'Save',
                    disabled: true,
                    scope: this,
                    handler: this.onSave
                }, {
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
            this.fireEvent('create', this, form.getValues());
            form.reset();
        }

    },

    onReset: function () {
        this.setActiveRecord(null);
        this.getForm().reset();
    }
});

Ext.define('MacInfo', {
    extend: 'Ext.data.Model',
    idProperty: 'taskId',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'uname', type: 'string'},
        {name: 'mac', type: 'string'},
        {name: 'ip', type: 'string'},
        //{name: 'description', type: 'string'},
        {name: 'device', type: 'string'}
    ]
});

Ext.onReady(function () {
    var store = Ext.create('Ext.data.Store', {
        model: 'MacInfo',
        autoLoad: true,
        remoteSort: true,
        proxy: {
            type: 'ajax',
            url: '/mac/read',
            reader: {
                type: 'json',
                rootProperty: 'data'
            }
        },
        sorters: {property: 'uname', direction: 'ASC'},
        groupField: 'uname'
    });

    var grid = Ext.create('Ext.grid.Panel', {
        //width: 800,
        //height: 450,
        title: 'Mac-Ip',
        renderTo: Ext.getBody(),
        store: store,
        viewConfig: {
            stripeRows: false
        },
        forceFit: true,
        dockedItems: [{
            dock: 'top',
            xtype: 'toolbar',
            items: [
                {
                    forceFit:true,
                    margin: '0,0,0,0',
                    itemId: 'form',
                    xtype: 'netform'

                }]
        }],
        initComponent:function(){
          this.editing = Ext.create('Ext.grid.plugin.CellEditing');
        },
        features: [{
            id: 'group',
            ftype: 'groupingsummary',
            groupHeaderTpl: '{name}',
            hideGroupedHeader: true,
            enableGroupingMenu: false,
            remoteRoot: 'summaryData'
        }],
        columns: [
            {
                header: 'device',

                sortable: true,
                dataIndex: 'device'
                //renderer: function(value, metaData, record, rowIdx, colIdx, store, view){
                //    return value + ' hours';
                //},
                //summaryRenderer: function(value, summaryData, dataIndex) {
                //    return value + ' hours';
                //}
            }, {
                header: 'Mac',
                width: 195,
                sortable: true,
                //renderer: Ext.util.Format.usMoney,
                //summaryRenderer: Ext.util.Format.usMoney,
                dataIndex: 'mac'
                //summaryType: 'average'
            }, {
                //id: 'Ip',
                text: 'Ip',
                sortable: false,
                //groupable: false,
                //renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                //    return Ext.util.Format.usMoney(record.get('estHours') * record.get('rate'));
                //},
                dataIndex: 'ip',
                summaryType: 'count',
                summaryRenderer: function (value) {
                    return Ext.String.format('{0} record{1}', value, value == 1 ? 's' : '');
                }
            }]
    });
});