import {
  BugOutlined,
  GithubOutlined,
} from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';
import './index.less';

/**
 * 全局 Footer
 */
const GlobalFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      className="default-footer"
      copyright={`${currentYear} lucaswangdev`}
      links={[
        {
          key: 'github',
          title: (
            <>
              <GithubOutlined /> 代码已开源
            </>
          ),
          href: 'https://github.com/lucaswangdev/mock-api-tool',
          blankTarget: true,
        },
        {
          key: 'feedback',
          title: (
            <>
              <BugOutlined /> 建议反馈
            </>
          ),
          href: 'https://github.com/lucaswangdev/mock-api-tool',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default GlobalFooter;
