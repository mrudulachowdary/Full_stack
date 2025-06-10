import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Table } from 'antd';

var _= require('lodash');
const isEmpty = require('is-empty');

// Component to display the Inventory list in a table
const InventoryTable = (props) => {

    const columnNames = [
        {
            title: <span style={{fontWeight: 'bold'}}>Type</span>,
            key: 'type',
            dataIndex: 'type'
        },
        {
          title: <span style={{fontWeight: 'bold'}}>Manufacturer</span>,
          key:'manufacturer',
          dataIndex: 'manufacturer'
        },
        {
            title: <span style={{fontWeight: 'bold'}}>Model</span>,
            key:'model',
            dataIndex: 'model'
        },
        {
            title: <span style={{fontWeight: 'bold'}}>Serial Number</span>,
            key:'serial_number',
            dataIndex: 'serial_number'
        },
        {
            title: <span style={{fontWeight: 'bold'}}>Vendor</span>,
            key:'vendor',
            dataIndex: 'vendor'
        }, 
        {
            title: <span style={{fontWeight: 'bold'}}>Cost</span>,
            key:'cost',
            dataIndex: 'cost',
            sorter: (a, b) => a.cost - b.cost
        }, 
        {
            title: <span style={{fontWeight: 'bold'}}>Purchased Date</span>,
            key:'date_purchased',
            dataIndex: 'date_purchased'
        },
        {
            title: <span style={{fontWeight: 'bold'}}>Purchased By</span>,
            key:'purchased_by',
            dataIndex: 'purchased_by'
        },
        {
            title: <span style={{fontWeight: 'bold'}}>Count</span>,
            key:'count',
            dataIndex: 'count',
            sorter: (a, b) => a.count - b.count
        },
        {
            title: <span style={{fontWeight: 'bold'}}>Location</span>,
            key:'location',
            dataIndex: 'location'
        } 
    ];

        // Get the Inventory List
        let dataDisplay = {};
        const   [selectionType] = useState('radio')

        return(
            <div>
                <Table
                    tableLayout='fixed'
                    columns = {columnNames}
                    dataSource = {props.dataDisplay}
                    rowKey='id'
                    rowSelection={{
                        selectedRowKeys: props.selectedRowKeys,
                        type: selectionType,
                        onChange: (selectedRowKeys, selectedRows) => {
                            if (!isEmpty(selectedRows)) 
                                props.selectedRecordFunction({ selectedRecord: selectedRows[0],
                                                                selectedRowKeys: selectedRowKeys });
                            else
                                props.selectedRecordFunction({ selectedRecord: {}, selectedRowKeys: [] });
                        }
                    }}
                    scroll={{ x: 'max-content' }}
                />
            </div>
        )
};

export default InventoryTable;