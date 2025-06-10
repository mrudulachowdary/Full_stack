import React, { Component } from "react";
import { Col, Layout, Row } from "antd";
import './LayoutPage.css';
import 'antd/dist/antd.css';

const { Header } = Layout;

class NavBar extends Component {
    render() {
        return (
            <div>
                <Header className="headerSection">
                    <Row>
                        <Col span={6} className='navBarCol'>
                            <span className='navBarTitle'>Mercury Wireless</span>
                        </Col>
                    </Row>
                </Header>
            </div>
        )
    }
}

export default NavBar;