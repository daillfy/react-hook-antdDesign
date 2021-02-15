import React,{useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import {Card, List} from 'antd';
import { ArrowLeftOutlined} from '@ant-design/icons';
import {reqCategory} from '../../api'

// import './style.less'
const  Item=List.Item 
const ProductDetail =(props)=>{

    const [cnameI, setCnameI] = useState()
    // eslint-disable-next-line 
    const [cnameE, setCnameE] = useState()

    const title=(
        <span>
            <ArrowLeftOutlined onClick={()=>props.history.goBack()}style={{color:'green',marginRight:"15px"}}/>
            <span>商品详情</span>
        </span>
    )
    //读取传递过滤的state数据
    const { name, categoryId, desc, detail, imgs, price, pCategory} = props.history.location.state;
    async function getCategory(){
        let res
        if(pCategory==='0'){ //一级分类下的商品
             res=await reqCategory(categoryId)
             res.map(item=>
                 item? setCnameI(item.data.name):''
             )
             console.log(res)
        }else{ //二级分类下的商品
             res = await Promise.all([reqCategory(pCategory), reqCategory(categoryId)])
            // res[0].map(item=>item?setCnameI(item.data.name):'')
            // res[1].map(item=>item?setCnameE(item.data.name):'')
            console.log(res)
        }
        }
        useEffect(()=>{
            getCategory()
             // eslint-disable-next-line
        },[])
    return(
      <Card title={title} className='product-list'>
        <List>
            <Item>
                <span className='left'>商品名称</span>
                <span className=''>{name}</span>
            </Item>
            <Item>
                <span className='left'>商品描述</span>
                <span className=''>{desc}</span>
            </Item>
            <Item>
                <span className='left'>商品类别</span>
                <span className=''>
                   {cnameI}{cnameE?'--->'+cnameE:''}
                </span>
            </Item>
            <Item>
                <span className='left'>商品价格</span>
                <span className=''>{price}</span>
            </Item>
            <Item>
                <span className='left'>商品图片</span>
               <span>
                   {
                       imgs.map((item)=>{
                          return(
                            <img src={item} alt='' key={item} className='product-img'/>
                          ) 
                       })
                   }
               </span>
            </Item>
            <Item>
                <span className='left'>商品描述</span>
                <span className=''>{desc}</span>
            </Item>
            <Item>
                <span className='left'>商品详情</span>
                <span dangerouslySetInnerHTML={{__html:detail}}></span>
            </Item>
        </List>
      </Card>
    )
}
export default withRouter(ProductDetail)