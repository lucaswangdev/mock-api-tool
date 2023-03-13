import React from 'react';
import { Form, Input, Modal } from 'antd';

interface Values {
  userAccount: string;
}

interface ProjectManageUserFormProps {
  open: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
}

export const ProjectManageUserForm: React.FC<ProjectManageUserFormProps> = ({
  open,
  onCreate,
  onCancel,
}) => {
  const [form] = Form.useForm();
  return (
    <Modal
      open={open}
      title="添加成员"
      okText="确定"
      cancelText="取消"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
      >
        <Form.Item
          name="userAccount"
          label="账号"
          rules={[{ required: true, message: '账号不能为空' }]}
        >
          <Input placeholder='请输入账号' maxLength={256}/>
        </Form.Item>
      </Form>
    </Modal>
  );
};