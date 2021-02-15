import React from 'react';
import {withRouter} from 'react-router-dom';
import { Form, Input, Select } from 'antd';

const { Option } = Select;
const Item =  Form.Item
const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };


const AddForm = (props) => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log(values);
    };

    return(
        <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
        <Item initialValue={props.parentId} messageVariables={props.parentId}>
            <Select placeholder='请选择分类'>
                <Option value='0'>一级分类</Option>
                <Option value='1'>二级分类</Option>
            </Select>
        </Item>
        <Item initialValue=''>
            <Input placeholder='请输入分类名称'/>
        </Item>
      </Form>
    )
}
export default withRouter(AddForm)