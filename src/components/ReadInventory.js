import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux'; 
import { withRouter } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Row, Col, Table } from 'antd';
import {getInventory} from '../actions/readInventoryAction';

var _= require('lodash');
const isEmpty = require('is-empty');

// Display Inventory list in  a table
class ReadInventory extends Component{
    columnNames = [
        {
            title: <span style={{fontWeight: 'bold'}}>Type</span>,
            key: 'type',
            dataIndex: 'type',
            sorter: (a,b) => a.type - b.type
        },
        {
          title: <span style={{fontWeight: 'bold'}}>Manufacturer</span>,
          key:'manufacturer',
          dataIndex: 'manufacturer',
          sorter: (a,b) => a.manufacturer - b.manufacturer
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

    componentDidMount(){
        this.props.getInventory();
    }

    render(){
        // Get the Inventory List
        let dataDisplay = {};
        if (!_.isNil(this.props) && !_.isNil(this.props.getInventoryList) && !_.isNil(this.props.getInventoryList.getInventoryList) &&
            !_.isNil(this.props.getInventoryList.getInventoryList.inventory) && !isEmpty(!_.isNil(this.props.getInventoryList.getInventoryList.inventory))){
            dataDisplay = this.props.getInventoryList.getInventoryList.inventory;
        }
        return(
            <div>
                <Row>
                    <Col>
                    {
                        !isEmpty(dataDisplay) && 
                        <Table
                            tableLayout='fixed'
                            columns = {this.columnNames}
                            dataSource = {dataDisplay}
                        />
                    }
                    </Col>
                </Row>
            </div>
        )
    }
};

function mapStateToProps(state){
    return{
        getInventoryList: state.getInventoryList
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ getInventory }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReadInventory));