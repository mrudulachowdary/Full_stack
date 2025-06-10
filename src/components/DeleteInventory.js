import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux'; 
import { withRouter } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Row, Col, Button, Modal  } from 'antd';
import InventoryTable from './InventoryTable';
import {getInventory} from '../actions/readInventoryAction';
import {deleteInventoryData, deleteInventoryRes} from '../actions/deleteInventoryAction';

var _= require('lodash');
const isEmpty = require('is-empty');

class DeleteInventory extends Component{
    constructor(){
        super();
        this.state = {
            selectedRowKeys: [],
            selectedRecord: {}
        }
    }

    callBackFunc = (callBackData) => {
        this.setState({ selectedRecord: callBackData.selectedRecord, selectedRowKeys: callBackData.selectedRowKeys });
    }

    // Dispatch action to delete inventory using API call
    onDeleteClick = (selectedRecord) => {
        this.props.deleteInventoryData(selectedRecord)
                .then(res => {
                    let deleteInventoryResponse = 'FAILURE';
                    if (!_.isNil(this.props.deleteInventoryResList) && !_.isNil(this.props.deleteInventoryResList.deleteInventoryResList) &&
                        this.props.deleteInventoryResList.deleteInventoryResList === 'SUCCESS'){
                            deleteInventoryResponse = 'SUCCESS';
                        }
                        Modal.info({
                            title: deleteInventoryResponse === 'SUCCESS'?'Successfully deleted the record':'Unable to delete a record'
                        });
                        this.props.deleteInventoryRes(null);
                        this.props.getInventory();
                });
    }

    render(){
        let dataDisplay = {};
        const { selectedRowKeys, selectedRecord } = this.state;
        if (!_.isNil(this.props) && !_.isNil(this.props.getInventoryList) && !_.isNil(this.props.getInventoryList.getInventoryList) &&
            !_.isNil(this.props.getInventoryList.getInventoryList.inventory) && !isEmpty(!_.isNil(this.props.getInventoryList.getInventoryList.inventory))){
            dataDisplay = this.props.getInventoryList.getInventoryList.inventory;
        }
        return(
            <div>
                <Row>
                    {/* Display Inventory list for the user to select an inventory and the delete the selcted inventory */}
                    <Col span={24}>
                    {
                        !isEmpty(dataDisplay) && 
                        <InventoryTable 
                            selectedRecordFunction = {this.callBackFunc}
                            selectedRowKeys = {selectedRowKeys}
                            dataDisplay = {dataDisplay}/>
                    }
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        {
                            !isEmpty(dataDisplay) && !isEmpty(selectedRecord) &&
                            <div>
                                <Row>
                                    <Col>
                                        <Button
                                            type='primary'
                                            htmlType='submit'
                                            size='large'
                                            onClick={() => this.onDeleteClick(selectedRecord)}>
                                            DELETE
                                        </Button>
                                    </Col>
                                </Row>
                            </div>
                        }
                    </Col>
                </Row>
            </div>
        )
    }
}; 

function mapStateToProps(state){
    return{
        getInventoryList: state.getInventoryList,
        deleteInventoryResList: state.deleteInventoryResList
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ getInventory, deleteInventoryData, deleteInventoryRes }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DeleteInventory));