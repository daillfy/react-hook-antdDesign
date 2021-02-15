import React, { useState, useEffect, useRef } from 'react';
import { Form, Input, Modal } from 'antd';
import { ButtonLink } from './components/Linkbutton';
// import { reqAddCategory } from './api';
import category from './page/category/category';


const Item =  Form.Item
const useResetFormOnCloseModal = ({ form, visible }) => {
    const prevVisibleRef = useRef();
    useEffect(() => {
      prevVisibleRef.current = visible;
    }, [visible]);
    const prevVisible = prevVisibleRef.current;
    useEffect(() => {
      if (!visible && prevVisible) {
        form.resetFields();
      }
      // eslint-disable-next-line
    }, [visible]);
  };

  const ModalForm = ({ visible, onCancel}) => {
    const [form] = Form.useForm();
    useResetFormOnCloseModal({
      form,
      visible,
    });
  
    const onOk = () => {
      form.submit();
    };
  
    return (
      <Modal title="Basic Drawer" visible={visible} onOk={onOk} onCancel={onCancel}>
        <Form form={form} layout="vertical" name="userForm">
        <Item >
            <Input placeholder='请输入分类名称' name='name'/>
        </Item>
        </Form>
      </Modal>
    );
  };
  
  const Demo = (props) => {
    const [visible, setVisible] = useState(false);

  
    const hideUserModal = () => {
      setVisible(false);
    };
  
    const onFinish = (values) => {
      console.log('Finish:', values);
    };
   
    const showUserModal=()=>{
        setVisible(true)
        // console.log(props)
        props.onClicks()
    }
  
    return (
      <>
        <Form.Provider
          onFormFinish={(name, { values, forms }) => {
            if (name === 'userForm') {
              const { basicForm } = forms;
              const category = basicForm.getFieldValue('category') || [];
              basicForm.setFieldsValue({
                category: [...category, values],
              });
              setVisible(false);
            }
            console.log(category)
          }}
        //   initialValues={props.category}
        >
          <Form name="basicForm" onFinish={onFinish}>
            <Form.Item>
              <ButtonLink
                onClick={showUserModal}
              >
                修改分类
              </ButtonLink>
            </Form.Item>
          </Form>
  
          <ModalForm visible={visible} onCancel={hideUserModal} category={props.category}/>
        </Form.Provider>
      </>
    );
  };

  export default Demo
  