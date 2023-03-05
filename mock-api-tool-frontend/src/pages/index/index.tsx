import CodeEditor from '@/components/CodeEditor';
import { mockApiBasePath } from '@/configs/routes';
import { findAll, update, deleteApi } from '@/services/mockService';
import { PageContainer } from '@ant-design/pro-components';

import { Button, Card, Form, Input, message, Radio } from 'antd';
import React, { useEffect, useState } from 'react';
import './index.less';

/**
 * 主页
 */
const IndexPage: React.FC = () => {
  const [apiList, setApiList] = useState<any>([]);
  const [currentApiItem, setCurrentApiItem] = useState<any>({});
  const [currentEditCode, setcurrentEditCode] = useState<any>('');
  const [editorActionList, setEditorActionList] = useState<any>([]);
  const [form] = Form.useForm();

  /**
   * 获取api数据列表data
   */
  const getApiList = async () => {
    try {
      const res = await findAll({});
      setApiList(res.data);
    } catch (e: any) {
      message.error('获取api数据列表失败:' + e.message);
    }
  };

  /**
   * 保存api数据列表data
   */
  const saveApiData = async () => {
    try {
      const delay = form.getFieldsValue().delay || 0;
      const apiPath = form.getFieldsValue().apiPath;
      const apiDescription = form.getFieldsValue().apiDescription || '';
      if (!apiPath || apiPath.length < 1) {
        message.error('接口地址不能为空');
        return;
      }
      await update({
        id: currentApiItem.id,
        apiContent: currentEditCode,
        apiPath,
        delay,
        apiDescription
      });
      getApiList();
      message.success('保存成功');
    } catch (e: any) {
      message.error('保存失败:' + e.message);
    }
  };

  // 初始化
  useEffect(() => {
    getApiList();
  }, []);

  /**
   * 选中api Click
   * @param item
   */
  const currentApiItemClick = (item: any) => {
    setCurrentApiItem(item);
    setcurrentEditCode(item.apiContent || '');
    form.setFieldsValue({
      apiPath: item.apiPath || '',
      delay: item.delay || 0,
      apiDescription: item.apiDescription || '',
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    editorActionList['editor.action.formatDocument'] &&
      editorActionList['editor.action.formatDocument']._run();
  };

  /**
   * 编辑器内容发送了变化
   */
  const onCodeChange = (value: string) => {
    setcurrentEditCode(value || '');
  };

  /**
   * 获取 editorActionList
   * @param actionList
   */
  const editorDidMountCallbackClick = (actionList: any) => {
    setEditorActionList(actionList);
  };

  /**
   * JSON格式化
   */
  const formatJSON = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    editorActionList['editor.action.formatDocument'] &&
      editorActionList['editor.action.formatDocument']._run();
  };

  /**
   * 保存
   */
  const saveJSON = () => {
    saveApiData();
  };

  const itemOperationClick = async (type='', item: any) => {
    if(type === 'view'){
      // 查看
      window.open(`${mockApiBasePath}/${item.apiPath}`, '_blank');
    } else if(type ==='delete'){
      // 删除
      try {
        await deleteApi({
          id: item.id,
        });
        getApiList();
        message.success('删除成功');
      } catch (e: any) {
        message.error('删除失败:' + e.message);
      }
    }
  }

  return (
    <div>
      <PageContainer title={<>快速生成 Mock 接口数据，大幅提高开发效率！</>}>
        <div className="index-page">
          <div className="left-list">
            <Card>
              {apiList.map((item: any) => {
                return (
                  <div
                    className={
                      currentApiItem.id === item.id
                        ? 'api-item-hover'
                        : 'api-item'
                    }
                    key={item.id}
                  >
                    <div className='item-wrapper'>
                      <div className='left-wrapper' onClick={() => currentApiItemClick(item)}>
                        <div className="api-name">{item.apiPath}</div>
                        <div className="api-desc">{item.apiDescription}</div>                    
                      </div>
                      <div className='right-wrapper'>
                        <Button size='small' onClick={() => itemOperationClick('view', item)}>查看</Button>
                        <Button className='button-wrapper' type='primary' danger size='small' onClick={() => itemOperationClick('delete', item)}>删除</Button>
                      </div>
                    </div>

                  </div>
                );
              })}
            </Card>
          </div>
          <div className="right-detail">
            <div>
              <Form<any> className="form-input" form={form} scrollToFirstError>
                <Form.Item
                  name="apiPath"
                  label="接口地址"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="请输入接口地址"/>
                </Form.Item>
                <Form.Item name="apiDescription" label="接口说明">
                  <Input placeholder="请输入接口说明"/>
                </Form.Item>
                <Form.Item label="请求方式">
                  ALL（支持所有请求方式）
                </Form.Item>
                <Form.Item name="delay" label="请求延时">
                  <Radio.Group>
                    <Radio value={0}>0秒</Radio>
                    <Radio value={1}>1秒</Radio>
                    <Radio value={2}>2秒</Radio>
                    <Radio value={3}>3秒</Radio>
                    <Radio value={4}>4秒</Radio>
                  </Radio.Group>                
                </Form.Item>
              </Form>
            </div>
            <div className="top-header">
              <Button type="primary" onClick={formatJSON}>
                JSON 格式化
              </Button>
              <Button
                className="button-wrapper"
                type="primary"
                onClick={saveJSON}
              >
                保存
              </Button>
            </div>
            <div className="code-edit">
              <CodeEditor
                value={currentEditCode}
                language="json"
                onChange={(value) => onCodeChange(value)}
                editorDidMountCallback={editorDidMountCallbackClick}
              />
            </div>
          </div>
        </div>
      </PageContainer>
    </div>
  );
};

export default IndexPage;
