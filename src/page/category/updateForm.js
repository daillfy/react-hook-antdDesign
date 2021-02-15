import React, { useEffect, useRef } from 'react';
import {withRouter} from 'react-router-dom';
import { Form, Input, Modal } from 'antd';

const Item =  Form.Item
const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
const useResetFormOnCloseModal = ({ form, visible }) => {
    const prevVisibleRef = useRef();
    useEffect(() => {
        prevVisibleRef.current = visible;
    }, [visible]);
    const prevVisible = prevVisibleRef.current;
    useEffect(() => {
        if (!visible && prevVisible) {
        form.resetFields(); //清除输入数据
        }
        // eslint-disable-next-line
    }, [visible]);
};


const UpdateForm = ({ visible, onCancel,props }) => {
const [form] = Form.useForm();
useResetFormOnCloseModal({
    form,
    visible,
});

const onOk = () => {
    form.submit();
};
return(

    <Modal title="Basic Drawer" visible={visible} onOk={onOk} onCancel={onCancel}>
            <Form {...layout} form={form} name="control-hooks">
        <Item initialValue={props.category} >
            <Input placeholder='请输入分类名称' defaultValue={props.category} name='name'/>
        </Item>
    </Form>
    </Modal>
)
}
export default withRouter(UpdateForm)