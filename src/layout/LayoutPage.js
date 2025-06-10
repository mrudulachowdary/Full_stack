import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Layout, Row, Col, Space, Typography, Divider } from 'antd';
import NavBar from './NavBar';
import './LayoutPage.css';

const { Content, Footer } = Layout;
const { Title } = Typography;

class LayoutPage extends Component{
render(){
    let { children } = this.props;

    const titlePosition = {
        xs: {span: 24},
        sm: {span: 24},
        md: {span: 20, offset: 2},
        lg: {span: 20, offset: 2}
    }

    const tabSectionPosition = {
        xs: {span: 24},
        sm: {span: 24},
        md: {span: 20, offset: 2},
        lg: {span: 20, offset: 2}
    }

    return(
        <Layout className='layout'>
            <NavBar />
            <Content className='content'
                style={{ minHeight: 'calc(100vh - 150px', backgroundColor: '#f0f0f0' }}>
                <Row>
                    <Col {...titlePosition}>
                        <div className='header'>
                            <Space direction='vertical'>
                                <Title level={4}>Inventory</Title>
                            </Space>
                        </div>
                    </Col>
                </Row>
                <Divider style={{margin: "4px 0 24px"}} />
                <Row>
                    <Col {...tabSectionPosition} style={{ backgroundColor: 'white' }}>
                        { children }
                    </Col>
                </Row>
                
            </Content>
            <Footer style={{ textAlign: 'center' }}>&reg; Mercury Wireless</Footer>
      </Layout>
    )
}
}

export default LayoutPage;