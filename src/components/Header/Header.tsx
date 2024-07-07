import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography } from 'antd';
import type { MenuProps } from 'antd';
import { HomeOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    label: (
      <Link to='/' className={'link small'}>
        Home
      </Link>
    ),
    key: 'home',
    icon: <HomeOutlined />,
  },
  {
    label: (
      <Link to={'/meals/add'} className={'link small'}>
        New Meal
      </Link>
    ),
    key: 'new-meal',
    icon: <PlusCircleOutlined />,
  },
];

const { Title } = Typography;

export const Header = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrentPage(e.key);
  };

  return (
    <header
      className={'d-flex align-items-center justify-content-between gap-2 mb-2'}
    >
      <Link to='/' className={'link'}>
        <Title
          level={5}
          className={'m-0 text-nowrap fw-medium d-flex align-items-center'}
        >
          <img
            width={'35'}
            className={'me-2'}
            src={'/logo.svg'}
            alt={'Tracker logo'}
          />
          Tracker
        </Title>
      </Link>

      <Menu
        onClick={onClick}
        className={'flex-grow-1 justify-content-end'}
        selectedKeys={[currentPage]}
        mode='horizontal'
        items={items}
      />
    </header>
  );
};
