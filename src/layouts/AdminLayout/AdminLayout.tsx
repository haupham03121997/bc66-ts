import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import React, { FC, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PATH } from '../../routes/path';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const { Header, Sider, Content } = Layout;

const AdminLayout: FC<AdminLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout className="h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="text-center flex items-center justify-center cursor-pointer h-[80px]">
          <img src="/vite.svg" width={40} onClick={() => navigate(PATH.HOME)} />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[pathname || PATH.ADMIN_USER]}
          onSelect={(item) => {
            navigate(item.key);
          }}
          items={[
            {
              key: PATH.ADMIN_USER,
              icon: <UserOutlined />,
              label: 'User management',
            },
            {
              key: PATH.ADMIN_MOVIE,
              icon: <VideoCameraOutlined />,
              label: 'Movie Management',
            },
            {
              key: PATH.ADMIN_CINEMA,
              icon: <UploadOutlined />,
              label: 'Cinema Management',
            },
            {
              key: PATH.ADMIN_ACCOUNT_SETTINGS,
              icon: <SettingOutlined />,
              label: 'Account Settings',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflowY: 'scroll',
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
