import React from 'react';
import { Form, Input, Modal } from 'antd';

interface Values {
  projectName: string;
  projectCode: string;
}

interface ProjectCreateFormProps {
  open: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
}

export const ProjectCreateForm: React.FC<ProjectCreateFormProps> = ({
  open,
  onCreate,
  onCancel,
}) => {
  const [form] = Form.useForm();
  return (
    <Modal
      open={open}
      title="新建项目"
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
            // console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
      >
        <Form.Item
          name="projectName"
          label="项目名称"
          rules={[{ required: true, message: '项目名称不能为空' }]}
        >
          <Input placeholder='请输入项目名称' maxLength={256}/>
        </Form.Item>
   
        <Form.Item
          name="projectCode"
          label="项目ID"
          rules={[{ required: true, message: '项目ID不能为空' }]}
        >
          <Input placeholder='由字母、数字、下划线组成' maxLength={256} />
        </Form.Item>
      </Form>
    </Modal>
  );
};