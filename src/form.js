import React, { useState} from 'react';
import { Form, Button } from 'antd';
import ModalForm from './modal'
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};
const DemoForm = () => {
    const [visible, setVisible] = useState(false);
  
    const showUserModal = () => {
      setVisible(true);
    };
  
    const hideUserModal = () => {
      setVisible(false);
    };
  
    const onFinish = (values) => {
      console.log('Finish:', values);
    };
  
    return (
      <>
        <Form.Provider
          onFormFinish={(name, { values, forms }) => {
            if (name === 'name') {
              const { basicForm } = forms;
              const users = basicForm.getFieldValue('name') || [];
              basicForm.setFieldsValue({
                users: [...users, values],
              });
              setVisible(false);
            }
          }}
        >
          <Form {...layout} name="basicForm" onFinish={onFinish}>
            <Form.Item {...tailLayout}>
              <Button
                htmlType="button"
                style={{
                  margin: '0 8px',
                }}
                onClick={showUserModal}
              >
                Add User
              </Button>
            </Form.Item>
          </Form>
  
          <ModalForm visible={visible} onCancel={hideUserModal} />
        </Form.Provider>
      </>
    );
  };

  export default DemoForm