import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'antd/dist/antd.less'; //引入antd的样式
//入口文件, 要渲染必须映入reactDom
ReactDOM.render(
    <App />,
  document.getElementById('root')
);
