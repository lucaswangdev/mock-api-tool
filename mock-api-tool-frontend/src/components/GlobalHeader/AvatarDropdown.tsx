import { removeToken } from '@/configs/auth';
import { userInfo, userLogout } from '@/services/userService';
import { Link } from '@@/exports';
import { LogoutOutlined } from '@ant-design/icons';
import { Avatar, Button, Dropdown, Menu, message } from 'antd';
import classNames from 'classnames';
import { stringify } from 'querystring';
import React, { useState, useEffect} from 'react';
import { history } from 'umi';
import styles from './index.less';

/**
 * 头像下拉菜单
 *
 * @constructor
 */
const AvatarDropdown: React.FC = () => {
  const [loginUser, setLoginUser] = useState<any>(null);
  const getUserInfoData = async () => {
    const res = await userInfo();
    setLoginUser(res.data || {});
  }

  useEffect(() => {
    getUserInfoData();
  }, []);

  const onMenuClick = async (event: {
    key: React.Key;
    keyPath: React.Key[];
  }) => {
    const { key } = event;
    if (key === 'logout') {
      try {
        await userLogout();
        removeToken();
        message.success('已退出登录');
      } catch (e: any) {
        message.error('操作失败');
      }
      history.replace({
        pathname: '/user/login',
        search: stringify({
          redirect: window.location.href,
        }),
      });
      return;
    }
  };

  /**
   * 下拉菜单
   */
  const menuHeaderDropdown = loginUser ? (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      <Menu.Item key="current" disabled>
        {loginUser.userName ?? '无名'}
      </Menu.Item>
      <Menu.Item key="logout">
        <span style={{ color: 'red' }}>
          <LogoutOutlined />
          退出登录
        </span>
      </Menu.Item>
    </Menu>
  ) : (
    <></>
  );

  return loginUser ? (
    <Dropdown
      overlayClassName={classNames(styles.container)}
      overlay={menuHeaderDropdown}
    >
      <div className={`${styles.action} ${styles.account}`}>
        <Avatar>{loginUser.userName?.[0] ?? '无'}</Avatar>
      </div>
    </Dropdown>
  ) : (
    <>
      <Link to="/user/login">
        <Button type="primary" ghost style={{ marginRight: 16 }}>
          登录
        </Button>
      </Link>
    </>
  );
};

export default AvatarDropdown;
