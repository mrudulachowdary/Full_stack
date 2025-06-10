import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux'; 
import { withRouter } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Row, Col, Form, Input, Select, InputNumber, DatePicker, Button, Modal  } from 'antd';
import {getInventory} from '../actions/readInventoryAction';
import {updateInventoryData, updateInventoryRes} from '../actions/updateInventoryAction';
import moment from 'moment';
import InventoryTable from './InventoryTable';

var _= require('lodash');
const isEmpty = require('is-empty');
const { Option } = Select;

// Display Inventory list in a table and then select an inventory and update that inventory.
class UpdateInventory extends Component{
    constructor(){
        super();
        this.state = {
            selectedRowKeys: [],
            selectedRecord: {}
        }
    }

    formRef = React.createRef();

    formControlPosition = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 24 },
            md: { span: 6 },
            lg: { span: 5 }
        },
        wrapperCol:{
            xs: { span: 24 },
            sm: { span: 24 },
            md: { span: 8 },
            lg: { span: 5 }
        }
    };
    formControlButtonPosition = {
        wrapperCol:{
            xs: { offset: 0, span: 24 },
            sm: { offset: 0, span: 24 },
            md: { offset: 6, span: 19 },
            lg: { offset: 5, span: 20 }
        }
    }

    purchasedByData = ["Amith", "Amanda", "Kevin"];

    callBackFunc = (callBackData) => {
        // set the form values
        if (!isEmpty(callBackData.selectedRecord) && !_.isNil(this.formRef.current)){
            this.formRef.current.setFieldsValue({
                type: !_.isNil(callBackData.selectedRecord.type)?callBackData.selectedRecord.type:'',
                manufacturer: !_.isNil(callBackData.selectedRecord.manufacturer)?callBackData.selectedRecord.manufacturer:'',
                model: !_.isNil(callBackData.selectedRecord.model)?callBackData.selectedRecord.model:'',
                serial_number: !_.isNil(callBackData.selectedRecord.serial_number)?callBackData.selectedRecord.serial_number:'',
                vendor: !_.isNil(callBackData.selectedRecord.vendor)?callBackData.selectedRecord.vendor:'',
                cost: !_.isNil(callBackData.selectedRecord.cost)?callBackData.selectedRecord.cost:'',
                date_purchased: !_.isNil(callBackData.selectedRecord.date_purchased)?moment(callBackData.selectedRecord.date_purchased):'',
                purchased_by: !_.isNil(callBackData.selectedRecord.purchased_by)?callBackData.selectedRecord.purchased_by:'',
                count: !_.isNil(callBackData.selectedRecord.count)?callBackData.selectedRecord.count:'',
                location: !_.isNil(callBackData.selectedRecord.location)?callBackData.selectedRecord.location:''
            })
        }
        this.setState({ selectedRecord: callBackData.selectedRecord, selectedRowKeys: callBackData.selectedRowKeys });
    }

    onUpdateClick = (values) => {
        let apiInput = {};
        apiInput['id'] = this.state.selectedRecord.id;
        apiInput['type'] = values.type;
        apiInput['manufacturer'] = values.manufacturer;
        apiInput['model'] = values.model;
        apiInput['serial_number'] = values.serial_number;
        apiInput['vendor'] = values.vendor;
        apiInput['cost'] = values.cost;
        apiInput['date_purchased'] = values.date_purchased;
        apiInput['purchased_by'] = values.purchased_by;
        apiInput['count'] = values.count;
        apiInput['location'] = values.location;
        this.props.updateInventoryData(apiInput)
            .then(res => {
                let updateInventoryResponse = 'FAILURE';
                if (!_.isNil(this.props.updateInventoryResList) && !_.isNil(this.props.updateInventoryResList.updateInventoryResList) &&
                    this.props.updateInventoryResList.updateInventoryResList === 'SUCCESS')
                    updateInventoryResponse = 'SUCCESS';

                Modal.info({
                    title: updateInventoryResponse === 'SUCCESS'?'Successfully updated the record':'Unable to update the record'
                });
                this.props.updateInventoryRes(null);
                this.props.getInventory();
            })
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
                    {/* Display inventory list in a table */}
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
                    {/* Update the selected inventory */}
                    <Col span={24}>
                        {
                            !isEmpty(dataDisplay) && !isEmpty(selectedRecord)?(
                            <div>
                                <Form
                                    {...this.formControlPosition}
                                    ref={this.formRef}
                                    name='control-ref'
                                    initialValues={{    
                                        type: '',
                                        manufacturer: '',
                                        model: '',
                                        serial_number: '',
                                        vendor: '',
                                        cost: '',
                                        date_purchased: '',
                                        purchased_by: '',
                                        count: '',
                                        location: ''
                                    }}
                                    onFinish={(values) => this.onUpdateClick(values)}
                                >
                                    <Form.Item
                                        label='Type'
                                        name='type'
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input Type'
                                            }
                                        ]}>
                                                <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label='Manufacturer'
                                        name='manufacturer'
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input Manufacturer'
                                            }
                                        ]}>
                                                <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label='Model'
                                        name='model'
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input Model'
                                            }
                                        ]}>
                                                <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label='Serial Number'
                                        name='serial_number'
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input Serial Number'
                                            }
                                        ]}>
                                                <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label='Vendor'
                                        name='vendor'
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input Vendor'
                                            }
                                        ]}>
                                                <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label='Cost'
                                        name='cost'
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input cost'
                                            }
                                        ]}>
                                                <InputNumber
                                                    max={100000}
                                                    min={1}
                                                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                    parser={value => value.replace(/\$\s?|(,*)/g, '')} />
                                    </Form.Item>
                                    <Form.Item
                                        label='Purchased Date'
                                        name='date_purchased'
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input Purchased Date'
                                            }
                                        ]}>
                                                <DatePicker
                                                    format='YYYY-MM-DD'
                                                    inputReadOnly
                                                />
                                    </Form.Item>
                                    <Form.Item
                                        label='Purchased By'
                                        name='purchased_by'
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input Purchased By'
                                            }
                                        ]}>
                                                    <Select
                                                        placeholder='Select User'
                                                        >
                                                        {
                                                            this.purchasedByData.map(user => {
                                                                return(
                                                                    <Option key={user} value={user}>{user}</Option>
                                                                )
                                                            })
                                                        }
                                                    </Select>   
                                    </Form.Item>
                                    <Form.Item
                                        label='Count'
                                        name='count'
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input Count'
                                            }
                                        ]}>
                                                <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label='Location'
                                        name='location'
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input Location'
                                            }
                                        ]}>
                                                <Input />
                                    </Form.Item>
                                    <Form.Item {...this.formControlButtonPosition}>
                                        <Button
                                            type='primary'
                                            htmlType='submit'
                                            size='large'>
                                            UPDATE
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>
                            ):(
                                <div>
                                    <Form
                                        ref={this.formRef}
                                        name='control-ref'>

                                    </Form>
                                </div>
                            )
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
        updateInventoryResList: state.updateInventoryResList
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ getInventory, updateInventoryData, updateInventoryRes }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UpdateInventory));