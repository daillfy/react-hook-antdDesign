import React from 'react';
import { withRouter,Route,Switch,Redirect} from 'react-router-dom';
import memoryUtils from '../../utils/memoryUtils';

import Header from '../../components/header/header'
import LeftNav from '../../components/left-nav/letf-nav'
import Home from '../home/home'
import Role from '../role/role'
import Product from '../product/product'
import User from '../user/user'
import Category from '../category/category'
import Bar from '../chars/bar'
import Line from '../chars/line'
import Pie from '../chars/pie'
import Order from '../order/order'


import { Layout } from 'antd';
const { Footer, Sider, Content } = Layout;

const Admin = () => {
    // const [user, ] = useState(memoryUtils.user)
    //如果类型中没有user，说明当前没有登录
    const user=memoryUtils.user
    console.log(user)
    return (
          <Layout style={{ minHeight: '100vh' }}>
            <Sider>
                <LeftNav/>
            </Sider>
            <Layout>
                <Header>Header</Header>
                <Content style={{margin:'20px',backgroundColor:'#fff'}}>
                <Switch>
                    <Redirect from='/admin' exact to='/admin/home'/>
                    <Route path='/admin/home' component={Home}/>
                    <Route path='/admin/products/category' component={Category}/>
                    <Route path='/admin/products/product' component={Product}/>
                    <Route path='/admin/user' component={User}/>
                    <Route path='/admin/role' component={Role}/>
                    <Route path="/admin/charts/bar" component={Bar}/>
                    <Route path="/admin/charts/pie" component={Pie}/>
                    <Route path="/admin/charts/line" component={Line}/>
                    <Route path="/admin/order" component={Order}/>
                </Switch>
                </Content>
                <Footer style={{textAlign:'center',fontSize:'18px',color:'#ccc'}}>
                    推荐使用谷歌浏览器，可以获得更佳的页面操作体验
                </Footer>
            </Layout>
        </Layout>     
    )
}
export default withRouter(Admin)