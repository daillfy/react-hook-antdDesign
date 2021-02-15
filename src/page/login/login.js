import React, { useState, useEffect } from 'react';
import {withRouter} from 'react-router-dom'
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import './login.less';
import logo from '../../assets/images/logo.png';
import { reqLogin } from '../../api/index'
import memoryUtils from '../../utils/memoryUtils'

const Login =(props)=>{
    const [form] = Form.useForm(); //通过Form.useForm()实现form的注册
    const [, forceUpdate] = useState();
  
    useEffect(() => {
      forceUpdate({});
    }, []);
  
      async function onFinish(value){
        const {username, password} = value
        const res = await reqLogin(username, password) 
       if(res.status===0){
        const user=res.data
        //保存用用户信息
         memoryUtils.user = user
          //登录成功
          message.success('登录成功')
          //跳到管理页面,不需要回退回来用replace，push的话原页面还存在，可以回退回来
         props.history.replace('/admin')
       }else{
        message.error(res.msg)
    }
    };
  
        return (
            <div className='login'>
               <div className='login-header'>
                   <img src={logo} alt='logo'/>
                   <h1>react项目--后台管理系统</h1>
               </div>
               <div className='login-content'>
                   <h1>用户登录</h1> 
                   <Form
                form={form}
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                >
                <Form.Item
                    name="username"
                    rules={[
                        //声明式验证,直接使用别人声明好的验证规则
                        { required: true, message: 'Please input your Username!', whitespace:true},
                        {min:4, message:'用户名最少4位'},
                        {max:12,message:'用户名最长12位'},
                        {pattern:/^[a-zA-Z0-9_]+$/, message:'必须是英文，数字或者下划线'}
                    ]}  
                    initialValue='admin' //设置初始值
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        { required: true, message: 'Please input your Password!' },
                        {min:4,message:'密码长度大于等于6'},
                       {max:9,message:'密码不能长于9为'},
                       {pattern:/^[a-zA-Z0-9_]+$/ ,message:'密码必须包括数字和英文字母'}
                       ]}
                >
                    <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                    </Button>
                </Form.Item>
                </Form>
               </div>
            </div>
        )
}
//前台数据验证
export default withRouter(Login) ;

// 高阶函数，接受函数类型的参数，返回值是函数，
//setInterval, setTimeout, promise,
//数组遍历相关的find, map, reduce,foreach, filter
// bind()，

// 高阶组件：
// 本质是一个函数，接受一个组件(被包装主键)，返回一个组件(包装组件)

// async和await
// 作用：简化promise对象的使用：不用再使用》then()来指定成功失败的回调函数
// 以同步编码方式实现异步流程
// 哪里写async：函数定义的左侧
// 哪里写await：再promise的左侧写await