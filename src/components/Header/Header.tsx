import { NavLink } from 'react-router-dom';
import { Flex, Typography } from 'antd';
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
    <header className={'mb-10'}>
      <Flex justify={'space-between'} align={'center'}>
        <Title level={5} className={'logo'}>
          Calorie Tracker
        </Title>

        <Menu mode='horizontal' items={items} defaultSelectedKeys={['home']} />
      </Flex>
    </header>
  );
};
