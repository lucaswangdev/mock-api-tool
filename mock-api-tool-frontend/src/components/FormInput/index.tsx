import { Button, Form, Input, Space, message, Radio } from 'antd';
import React, { forwardRef } from 'react';
import './index.less';

interface Props {
  onSubmit: (values: any) => void;
  ref: any;
}

/**
 * 表单输入
 * @constructor
 */
const FormInput: React.FC<Props> = forwardRef((props, ref) => {
  const { onSubmit } = props;
  const [form] = Form.useForm();
  return (
    <>
      <Form<any> className="form-input" form={form} scrollToFirstError>
        <Form.Item
          name="apiPath"
          label="接口地址"
          rules={[{ required: true }]}
        >
          <Input placeholder="请输入接口地址" />
        </Form.Item>
        <Form.Item label="请求方式">
          ALL（支持所有请求方式）
        </Form.Item>
        <Form.Item name="apiDesc" label="接口说明">
          <Input placeholder="请输入接口说明" />
        </Form.Item>
        <Form.Item name="delay" label="请求延时">
          <Radio.Group defaultValue={0}>
            <Radio value={0}>0秒</Radio>
            <Radio value={1}>1秒</Radio>
            <Radio value={2}>2秒</Radio>
            <Radio value={3}>3秒</Radio>
            <Radio value={4}>4秒</Radio>
          </Radio.Group>                
        </Form.Item>
        <Form.Item>
          <Space size="large" wrap>
            <Button
              type="primary"
              onClick={() => {
                const apiPath = form.getFieldsValue().apiPath;
                if (!apiPath || apiPath.length < 1) {
                  message.error('接口地址不能为空');
                  return;
                }
                const values = form.getFieldsValue();
                onSubmit?.(values);
              }}
            >
              保存
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
});

export default FormInput;
