// 商品分类
import React,{useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import { Card, Table, Button, message, Modal} from 'antd';
import { PlusOutlined,ArrowRightOutlined } from '@ant-design/icons';
import { ButtonLink } from '../../components/Linkbutton';
import {reqCategorys ,reqUpdateCategory} from '../../api/index';
import AddForm from './addForm';
// import UpdateForm from './updateForm'
import Demo from '../../store'
// import './style.less'
const Category =(props)=>{
    const [category, setCategory] = useState([])
    const [Subcategory, setSubCategory] = useState([])
    const [loading, setLoading] = useState()
    // 父级列表的id和name
    const [parentId, setParentId] = useState('0')
    const [parentName, setParentName] = useState()

    const [visable, setVisable] = useState() //visable为0都不显示，为1显示添加，为2显示更新
    const [loadingModal, ] = useState()
    // const [categoryName, setCategoryName] = useState()

    // const [, setCategoryName]= useState()

    const title =parentId==='0'?'一级分类列表':(
      <span>
        <ButtonLink onClick={()=>goBack()}>一级分类列表</ButtonLink>
        <ArrowRightOutlined />
        <span>{parentName}</span>
      </span>
    );
    const extra = (
        <Button type='primary' onClick={()=>{showAdd()}}>
             <PlusOutlined />
             添加
        </Button>
    );

    const columns= [
      {
        title: '分类的名称',
        dataIndex: 'name',
        key: 'name',
        width:'70%',
      },
      {
        title: '操作',
        // onclick通过箭头函数的形式实现点击哪一个就渲染哪一个
        render:(record)=>( //饭需要显示的节目的标签
            <span style={{display:'flex',height:'20px',lineHeight:"20px"}}>
              <Demo onClicks={()=>{updateCategorys(record)}} category={record.name}/>
              {
                parentId==='0'?<ButtonLink onClick={()=>{showSubInfo(record)}} style={{height:'23px'}}>查看子分类</ButtonLink>:''
              }
            </span>
        )
      },
    ];
    //回到一级列表
   function goBack(){
    //  将parentId修改成0返回一级列表
    setParentId('0')
   }
    async function getData(){
      //获取一级或者二级列表信息
      // 在发送请求前显示loading
      setLoading(true)
       const res = await reqCategorys(parentId)
      //  请求完成后隐藏loading
      setLoading(false)
       if(res.status===0){
         if(parentId==='0'){
          setCategory(res.data)
         }
        setSubCategory(res.data)
       }else{
         message.error('获取分类列表失败')
       }
    };

    function showSubInfo(record){
      //显示二级子列表的信息

      // 先更新状态
      setParentId(record._id)
      setParentName(record.name)
      // 然后去获取数据
      getData()
      console.log(parentId)
    }; 
  
   const handleCancel = () => {
      setVisable('0');
    };
    const showAdd = () => {
      setVisable('1')
    }
    // const addCategory = (record)=>{
    //   // 保存分类对象
    //   setCategoryName(record.name)
    //   setVisable('2')
    // }
    function addCategory(){
     setVisable('1')
    }

    async function updateCategorys(record){
    //发送请求保存更新分类
      
      //准备数据
      const categoryId = record._id
      const categoryName = record.name
      // setCategoryName
      console.log(categoryId,categoryName)
      const res=await reqUpdateCategory({categoryId,categoryName})
      console.log(res)
      if(res.status===0){
        // 列表重新渲染
        getData()
      }
    }
  
    useEffect(() => {
      getData()
       // eslint-disable-next-line
    }, [])


    return(
       <div>
          <Card title={title} extra={extra} style={{ width: '100%' }}>
           <Table 
           dataSource={parentId==='0'?category:Subcategory} 
           columns={columns} 
           bordered
           rowKey='_id'
           loading={loading}
           />
        </Card> 
        <Modal
          visible={visable==='1'}
          title="添加"
          onOk={addCategory}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Return
            </Button>,
            <Button key="submit" type="primary" loading={loadingModal} onClick={addCategory}>
              Submit
            </Button>,
          ]}
        >
          <AddForm parentId={parentId}/>

        </Modal>
       </div>
    )
}
export default withRouter(Category)
