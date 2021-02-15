import React, { useEffect, useRef } from 'react';
import { Form, Input, InputNumber, Modal } from 'antd';


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
    }, [visible]);
  };

  const ModalForm = ({ visible, onCancel }) => {
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
          <Form.Item
            name="name"
            label="User Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="age"
            label="User Age"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
        </Form>
      </Modal>
    );
  };
  export default ModalForm
