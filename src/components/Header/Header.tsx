import { NavLink } from 'react-router-dom';
import { Typography } from 'antd';
import type { MenuProps } from 'antd';
import { HomeOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    label: (
      <NavLink to='/' className={'link'}>
        <HomeOutlined />
      </NavLink>
    ),
    key: 'home',
  },
  {
    label: (
      <NavLink to={'/meals/add'} className={'link'}>
        New Meal
      </NavLink>
    ),
    key: 'new-meal',
    icon: <PlusCircleOutlined />,
  },
];

const { Title } = Typography;

export const Header = () => {
  return (
    <header
      className={'d-flex align-items-center justify-content-between mb-2'}
    >
      <Title level={5} className={'m-0 fw-medium'}>
        Calorie Tracker
      </Title>

      <Menu
        mode='horizontal'
        items={items}
        defaultSelectedKeys={['home']}
        className={'flex-grow-1 border-0 justify-content-end'}
      />
    </header>
  );
};
