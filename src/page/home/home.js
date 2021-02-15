import React from 'react';
import {withRouter} from 'react-router-dom';
import './home.less'
const Home =()=>{
    return(
       <div className='home'>
          欢迎使用硅谷
       </div>
    )
}
export default withRouter(Home)