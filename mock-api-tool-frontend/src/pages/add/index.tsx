import { insert } from '@/services/mockService';
import { PageContainer } from '@ant-design/pro-components';
import CodeEditor from '@/components/CodeEditor';
import FormInput from '@/components/FormInput';

import {
  Button,
  message,
} from 'antd';
import React, { useRef, useState } from 'react';
import './index.less';

/**
 * 主页
 */
const IndexPage: React.FC = () => {
  const [currentEditCode, setcurrentEditCode] = useState<any>('');
  const [editorActionList, setEditorActionList] = useState<any>([]);
  const formInputRef: any = useRef();

  /**
   * 编辑器内容发送了变化
   */
  const onCodeChange = (value: string) => {
    setcurrentEditCode(value || '')
  }

  /**
   * 获取 editorActionList
   * @param actionList 
   */
  const editorDidMountCallbackClick = (actionList: any) => {
    setEditorActionList(actionList);
  }

  /**
   * JSON格式化
   */
  const formatJSON = () => {
    editorActionList['editor.action.formatDocument'] && editorActionList['editor.action.formatDocument']._run();
  }

  /**
   * 保存 mock api
   * @param values
   */
  const saveJSON = async (values: any) => {
    try {
      await insert({
        apiPath: values.apiPath,
        apiContent: currentEditCode
      });
      message.success('保存成功');
    } catch (e: any) {
      message.error('保存失败:' + e.message);
    }
  };

  return (
    <div>
      <PageContainer
        title={
          <>
            快速生成 Mock 接口数据，大幅提高开发效率！
          </>
        }
      >
        <div className='add-page'>
          <div className='right-detail'>
            <FormInput ref={formInputRef} onSubmit={saveJSON} />
            <div className='top-header'>
              <Button type='primary' onClick={formatJSON}>JSON 格式化</Button>
            </div>
            <div className='code-edit'>
              <CodeEditor value={currentEditCode} language="json" onChange={(value) => onCodeChange(value)} editorDidMountCallback={editorDidMountCallbackClick} />
            </div>
          </div>
        </div>
      </PageContainer>
    </div>
  );
};

export default IndexPage;
