import React, { Fragment } from 'react';
import { Layout, Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';

const { Footer } = Layout;
const FooterView = () => (
  <Footer style={{ padding: 0 }}>
    <GlobalFooter
      links={[
        {
          key: 'Codetrial 首页',
          title: 'Codetrial 首页',
          href: 'https://codetrial.github.io/',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <Icon type="github" />,
          href: 'https://github.com/codetrial/got-auth-admin',
          blankTarget: true,
        },
        {
          key: 'Felix Yang',
          title: 'Felix Yang',
          href: 'https://felixpy.com/',
          blankTarget: true,
        },
      ]}
      copyright={
        <Fragment>
          Copyright <Icon type="copyright" /> 2018 GOT Auth Admin All Rights Reserved
        </Fragment>
      }
    />
  </Footer>
);
export default FooterView;
