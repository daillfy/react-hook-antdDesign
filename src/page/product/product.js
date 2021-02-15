import React from 'react';
import {withRouter , Redirect} from 'react-router-dom';
import './product.less'
import {Switch, Route} from 'react-router-dom';
import ProductHome from './home';
import AddProduct from './add';
import ProductDetail from './detail'
const Product =()=>{
    return(
      <Switch>
          <Route exact path='/admin/products/product' component={ProductHome}></Route>
          <Route path='/admin/products/product/add' component={AddProduct}></Route>
          <Route path='/admin/products/product/detail' component={ProductDetail}></Route>
          <Redirect to='/admin/products/product'></Redirect>
      </Switch>
    )
}
export default withRouter(Product)