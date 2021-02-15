import React,{useState, useEffect,useRef} from 'react';
import {withRouter} from 'react-router-dom';
import './style.less';

import { Modal} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import {InitTime } from '../../utils/dataInit';
import memoryUtils from '../../utils/memoryUtils'
import menuList from '../../config/menueConfig'
import {ButtonLink} from "../Linkbutton/index";

const { confirm } = Modal;

const Header =(props)=>{
    const username =memoryUtils.user?.username
    console.log(memoryUtils.user)
    const [time, setTime] = useState()
    const timeRef = useRef(time)
    
    function getTitle(){//获取标题
        const path=props.history.location.pathname;
        let title;
      menuList.forEach(item=>{
          if(item.key===path){
              title=item.title
          }
         else if(item.children){
             const citem = item.children.find(citem=>citem.key===path)
             if(citem) title=citem.title
         }
      })
      return title
    }

    function showConfirm() {
        confirm({
          title: '确定退出吗?',
          icon: <ExclamationCircleOutlined />,
          content: 'are you sure to logout',
          onOk() {
           //删除保存的suer数据，
           memoryUtils.user={}
           //跳转到登录页面
          props.history.replace('/login')
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      }

    useEffect(() => {
       timeRef.current = time
    })
    useEffect(() => {
        let timer
        timer = setInterval(()=>{
            setTime(InitTime(Date.now()))
        },2000)
        return () => {
           clearInterval(timer)
        }
    }, [])

    const title = getTitle()
    return(
       <div className='header'>
           <div className='header-top'>
           <span>欢迎，{username}</span>
            <ButtonLink onClick={showConfirm}>退出</ButtonLink>
           </div>
           <div className='header-bottom'>
              <div className='header-bottom-left'>{title}</div>
              <div className='header-bottom-right'>
                  <span>{timeRef.current}</span>
                  <img src='http://api.map.baidu.com/images/weather/day/duoyun.png' alt=''></img>
                <span>多云转阴</span>
              </div>
           </div>
       </div>
    )
}
export default withRouter(Header)