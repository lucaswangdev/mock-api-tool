import { findAll, update } from '@/services/mockService';
import { PageContainer } from '@ant-design/pro-components';
import CodeEditor from '@/components/CodeEditor';

import {
  Button,
  message,
} from 'antd';
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

  /**
   * 获取api数据列表data
   */
  const getApiList = async () => {
    try {
      const res = await findAll({});
      setApiList(res.data)
    } catch (e: any) {
      message.error('获取api数据列表失败:' + e.message);
    }
  };

  /**
   * 保存api数据列表data
   */
  const saveApiData = async () => {
    try {
      await update({
        id: currentApiItem.id,
        apiContent: currentEditCode
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
    setcurrentEditCode(item.apiContent || '')
  }

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
   * 保存
   */
  const saveJSON = () => {
    saveApiData();
  }

  return (
    <div id="indexPage">
      <PageContainer
        title={
          <>
            快速生成 Mock 接口数据，大幅提高开发效率！
          </>
        }
      >
        <div className='index-page'>
          <div className='left-list'>
            {
              apiList.map((item: any) => {
                return <div className='api-item' key={item.id} onClick={() => currentApiItemClick(item)}>
                <div className='api-name'>
                  {item.apiPath}
                </div>
                <div className='api-desc'>
                  {item.apiPath}描述
                </div>
              </div>
              })
            }
          </div>
          <div className='right-detail'>
            <div className='top-header'>
              <Button type='primary' onClick={formatJSON}>JSON 格式化</Button>
              <Button className='button-wrapper' type='primary' onClick={saveJSON}>保存</Button>
            </div>
            <div className='code-edit'>
              <CodeEditor value={currentEditCode} language="json" onChange={(value) => onCodeChange(value)} editorDidMountCallback={editorDidMountCallbackClick}/>
            </div>
          </div>
        </div>
      </PageContainer>
    </div>
  );
};

export default IndexPage;
