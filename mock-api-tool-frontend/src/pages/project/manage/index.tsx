import { PageContainer } from '@ant-design/pro-components';
import { Button, message, Form, Input, Row, Col, Space, Table } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import './index.less';
import { useModel, history } from 'umi';
import { insert, deleteProjectUser } from '@/services/projectUserService';
import { findAllByProject } from '@/services/userService';
import { ProjectManageUserForm } from './components/ProjectManageUserForm';
import type { ColumnsType } from 'antd/es/table';

/**
 * 项目列表
 */
const ProjectManagePage: React.FC = () => {
  const [form] = Form.useForm();
  const [userList, setUserList] = useState<DataType[]>([]);
  const { initialState, setInitialState } = useModel('@@initialState');
  const [open, setOpen] = useState(false);

  /**
   * 获取用户列表
   */
  const getUserList = async () => {
    try {
      const res = await findAllByProject({
        projectCode: initialState?.currentProjet?.projectCode
      });
      setUserList(res?.data || []);
    } catch (e: any) {
      message.error('获取用户列表失败:' + e.message);
    }
  };

  /** 
   * 删除成员
   */
  const deleteProjectUserClick = async (item: any) => {
    try {
      await deleteProjectUser({
        userId: item.id,
        projectCode: initialState?.currentProjet?.projectCode
      });
      await getUserList();
    } catch (e: any) {
      message.error('删除成员失败:' + e.message);
    }
  }

  interface DataType {
    id: string;
    key: string;
    userName: string;
    userAccount: string;
  }
  
  const columns: ColumnsType<DataType> = [
    {
      title: '用户昵称',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: '账号',
      dataIndex: 'userAccount',
      key: 'userAccount',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => deleteProjectUserClick(record)}>删除</a>
        </Space>
      ),
    },
  ];

  // 初始化
  useEffect(() => {
    getUserList();
  }, []);


  const getListClick = () => {
    form
      .validateFields()
      .then((values) => {
        getUserList();
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  const projectUserInsertClick = () => {
    setOpen(true);
  }

  /**
   * 返回，项目列表
   */
  const backToManageListClick = async (item: any) => {
    await setInitialState({
      currentProjet: {}
    });
    history.push('/');
  };

  /**
   * 添加成员
   */
  const onCreate = async (values: any) => {
    try {
      await insert({
        ...values,
        projectCode: initialState?.currentProjet?.projectCode
      });
      setOpen(false);
      getUserList();
    } catch (e: any) {
      message.error('添加成员失败:' + e.message);
    }
  };

  return (
    <div>
      <PageContainer
        title={
          <div style={{ cursor: 'pointer' }} onClick={backToManageListClick}>
            <LeftOutlined style={{ marginRight: 5 }} />
            返回
          </div>
        }
      >
        <div className="project-manage-page">
          <div>
            <Form form={form} style={{ width: 1200 }}>
              <Row>
                <Col span={6}>
                  <Form.Item
                    label="账号"
                    name="userAccount"
                    rules={[{ required: false }]}
                  >
                    <Input placeholder="请输入账号" disabled/>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item>
                    <Button
                      type="primary"
                      style={{ marginLeft: 10 }}
                      onClick={getListClick}
                    >
                      查询
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>
          <div>
            <div className='project-button'>
              <Button type='primary' onClick={projectUserInsertClick}>添加成员</Button>
            </div>
            <Table columns={columns} dataSource={userList} rowKey="id" />
          </div>
          <ProjectManageUserForm
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

export default ProjectManagePage;
