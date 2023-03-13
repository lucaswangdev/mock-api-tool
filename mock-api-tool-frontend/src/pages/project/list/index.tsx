import { PageContainer } from '@ant-design/pro-components';
import { Button, message, Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import './index.less';
import { useModel, history } from 'umi';
import { projectList, insert } from '@/services/projectService';
import { ProjectCreateForm } from './components/ProjectCreateForm';
import { SettingOutlined } from '@ant-design/icons';

/**
 * 项目列表
 */
const ProjectListPage: React.FC = () => {
  const [projectListData, setProjectListData] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const { initialState, setInitialState } =
    useModel('@@initialState');

  const projectItemClick = async (item: any) => {
    await setInitialState({
      currentProjet: item
    });
    history.push('/index');
  };

  /**
   * 获取项目列表数据
   */
  const getProjectList = async () => {
    try {
      const res = await projectList({});
      setProjectListData(res?.data?.projectList || []);
    } catch (e: any) {
      message.error('获取api数据列表失败:' + e.message);
    }
  };

  // 初始化
  useEffect(() => {
    getProjectList();
  }, []);

  /**
   * 创建项目
   */
  const onCreate = async (values: any) => {
    try {
      await insert({...values});
      setOpen(false);
      getProjectList();
    } catch (e: any) {
      message.error('项目创建失败:' + e.message);
    }
  };

  const createProjectClick = () => {
    setOpen(true);
  }

  /**
   * 设置-Click
   */
  const projectSetClick = async (item: any) => {
    await setInitialState({
      currentProjet: item
    });
    history.push('/project/manage');
  };

  return (
    <div>
      <PageContainer title={<>项目列表（请选择要进入的项目）</>}>
        <div className="project-list-page">
          {
            projectListData.map((item: any) => {
              return <div className="project-item" key={item.id}>
                <Card
                  size="small"
                  title={item.projectName || ''}
                  extra={
                    <Button type="link" onClick={() => projectItemClick(item)}>
                      进入项目
                    </Button>
                  }
                  style={{ width: 300 }}
                >
                  <div>项目描述：{item?.projectName}</div>
                  <div className="card-button">
                    <SettingOutlined style={{ fontSize: 16, cursor: 'pointer' }} onClick={() => projectSetClick(item)}/>
                  </div>
                </Card>
              </div>
            })
          }
          <div className="card-button-plus-wrapper" onClick={createProjectClick}>
            <PlusOutlined /> 
            <div className='create-project'>创建项目</div>
          </div>
          <ProjectCreateForm
            open={open}
            onCreate={onCreate}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </div>
      </PageContainer>
    </div>
  );
};

export default ProjectListPage;
