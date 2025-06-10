import React, { Component } from 'react';
import { Tabs } from 'antd';
import CreateInventory from './CreateInventory';
import ReadInventory from './ReadInventory';
import UpdateInventory from './UpdateInventory';
import DeleteInventory from './DeleteInventory';

const TabPane = Tabs.TabPane;

// Inventory class to display tabs
class Inventory extends Component{
    render(){
        return(
            <div style={{padding: '32px 4px'}}>
                <Tabs defaultActiveKey='1' tabPosition='left'>
                    <TabPane tab='Read Inventory' key='1'>
                        <ReadInventory />
                    </TabPane>
                    <TabPane tab='Create Inventory' key='2'>
                        <CreateInventory />
                    </TabPane>
                    <TabPane tab='Update Inventory' key='3'>
                        <UpdateInventory />
                    </TabPane>
                    <TabPane tab='Delete Inventory' key='4'>
                        <DeleteInventory />
                    </TabPane>
                </Tabs>
            </div>
        )
    }
};

export default Inventory;