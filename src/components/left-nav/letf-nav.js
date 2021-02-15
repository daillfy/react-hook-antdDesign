import React,{useEffect,useState} from 'react';
import {withRouter,Link} from 'react-router-dom';
import './style.less'
import logo from '../../assets/images/logo.png';

import menueList from '../../config/menueConfig'

import {Menu} from 'antd';

import  * as Icon from '@ant-design/icons';

const { SubMenu } = Menu;


const LeftNav =(props)=>{
// 使用map+递归调用
// 必须有return返回，否则不能渲染在页面上
    // function getMunuNode(menuList){
    //  return menuList.map((item)=>{
    //     if(!item.children){
    //       return(
    //         <Menu.Item key={item.key}>
    //             {React.createElement(Icon[item.icon])}
    //             <Link to={item.key}>{item.title}</Link>
    //         </Menu.Item>
    //       )
    //     }else{
    //       return(
    //         <SubMenu key={item.key} icon={React.createElement(Icon[item.icon])} title={
    //           <span>
    //           <span>{item.title}</span>
    //           </span>
    //         }>
    //         {
    //           getMunuNode(item.children)
    //           //使用map+递归调用
    //         }
    //       </SubMenu>
    //       )
    //       }
    //   })
    // }

  const [menuNode,setMenuNode] = useState([])
  function getMenuReducer(menueList){
    return menueList.reduce((pre,item)=>{
      if(!item.children){
        pre.push(
          <Menu.Item key={item.key}>
            {React.createElement(Icon[item.icon])}
            <Link to={item.key}>{item.title}</Link>
          </Menu.Item>
        )
      }
      else{
        pre.push(
          // 子组件的默认打开,查找一个于当前路径匹配的子item
          <SubMenu key={item.key} icon={React.createElement(Icon[item.icon])} title={
            <span>
            <span>{item.title}</span>
            </span>
          }>
          {
            getMenuReducer(item.children)
            //使用map+递归调用
          }
        </SubMenu>
        )
      }
      return pre
    }, [])
  }

  useEffect(() => {
    setMenuNode(getMenuReducer(menueList)) 
    // eslint-disable-next-line
  }, []) 

  //当前请求的路由路径
  const path=props.history.location.pathname
    return(
        <div className='left-nav'>
            <Link className='left-nav-header' to='/home'>
                <img src={logo} alt=''/>
                <h1>硅谷后台</h1>
            </Link>
            <Menu theme="dark" selectedKeys={[path]} mode="inline">
            {/* {
              getMunuNode(menueList)通过map的方式获取数据
              selectedKeys当前选中的菜单
              defalutKyes默认选中的菜单
            } */}
            {
              menuNode
            }
          </Menu>
        </div>
    )
}
export default withRouter(LeftNav)
// withRouter高阶组件，包装非路由组件，返回一个新的组件，新的组件想非路由组件传递3个参数，history, location,pathname