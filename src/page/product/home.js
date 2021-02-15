import React,{useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
// import './style.less'
import {Select, Card, Input, Button, Table,message} from 'antd';
import {ButtonLink} from '../../components/Linkbutton'
 // eslint-disable-next-line
import {reqProducts,reqSearchProducts,reqUpdateStatus} from '../../api'

const { Option } = Select;
const extra=(
    <Button type='primary'>
        添加商品
    </Button>
)

const ProductHome =(props)=>{
    const columns =[
        {
            title: '商品名称',
            dataIndex: 'name',
          },
          {
            title: '商品描述',
            dataIndex: 'desc',
          },
          {
            title: '价格',
            dataIndex: 'price',
            render: (price) => '¥' + price  // 当前指定了对应的属性, 传入的是对应的属性值
          },
          {         
              title:"状态",
              width:'150px',
              dataIndex:"status",
              render:(product)=>{
                  const {status, _id} = product
                  const newStateus = status===1?2:1
                  return(
                    <span>
                    <Button
                     type='primary' style={{marginRight:'10px'}}
                     onClick={()=>{updateStatus(_id,newStateus)}}
                     >下架</Button>
                   <span>{status===1?'在售':'已下架'}</span>
                 </span>
                  ) 
              }
          },
          {
            title:"操作",
            width:'120px',
            render:(record)=>{
                return(
                <span style={{display:'flex'}}>
                    <ButtonLink onClick={()=>props.history.push('/admin/products/product/detail',record)}>详情</ButtonLink>
                    <ButtonLink onClick={()=>{}}>修改</ButtonLink>
               </span>
                ) 
            } 
          }
    ]


    const [products, setProduct] = useState([])
    const [total,setTotal] = useState(0)
    const [searchName, setSearchName] = useState()
    const [searchType, setSearchType] = useState('按名称搜索')
    console.log(searchType,searchName)
    const title=(
        <span>
            <Select value={searchType} defaultValue={searchType} style={{width:"150px"}} onChange={(value)=>{setSearchType(value)}}>
                <Option value='productName'>按名称搜索</Option>
                <Option value='ProductDesc'>按描述搜索</Option>
            </Select>
            <Input placeholder='关键字' defaultValue={searchName} onChange={(event)=>{setSearchName(event.target.value)}} style={{width:"200px",margin:'0px 15px'}}/>
            <Button type='primary' onClick={()=>getProducts(1)}>搜索</Button>
        </span>
    )
      /*
  更新指定商品的状态
   */
  async function updateStatus(productId, status){
    const result = await reqUpdateStatus(productId, status)
    if(result.status===0) {
      message.success('更新商品成功')
      getProducts(1)
    }
  }

    // 获取指定页码的参数
   async function getProducts(pageNum){
       let res
       if(searchName){
           //如果searchname有值是搜索分页
            res = await reqSearchProducts({pageNum, pageSize: 3, searchName, searchType})
       }
       else{
        res = await reqProducts(pageNum,3)
       }
        if(res.status===0){
            const {total, list} = res.data
            setProduct(list)
            setTotal(total)
        }
        console.log(res)
    }
   useEffect( ()=> {
         getProducts(3)
         // eslint-disable-next-line 
   },[])
    return(
       <Card title={title} extra={extra}>
            <Table
                rowKey='_id'
                columns={columns}
                dataSource={products}
                bordered
               pagination={{
                   showQuickJumper:true,
                    defaultPageSize:3,
                    total:total,
                    onChange:(pageNum)=>{getProducts(pageNum)}
                    }}
            />
       </Card>
    )
}
export default withRouter(ProductHome)