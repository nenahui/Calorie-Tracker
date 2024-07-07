import { Button, Card, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { DeleteOutlined, FormOutlined } from '@ant-design/icons';

export const Meal = () => {
  return (
    <Card size={'small'}>
      <div className={'d-flex justify-content-between align-items-end gap-2'}>
        <Typography.Text
          type={'secondary'}
          className={'small position-absolute translate-middle-x'}
          style={{ top: 2, left: '50%' }}
        >
          10.07.24 10:50PM
        </Typography.Text>
        <div className={'d-flex flex-column'}>
          <Typography.Text type={'secondary'}>Breakfast</Typography.Text>
          <Typography.Text>Eggs, toast</Typography.Text>
        </div>
        <Typography.Text>
          600 <Typography.Text type={'secondary'}>kcal</Typography.Text>
        </Typography.Text>
        <div className={'d-flex flex-column'}>
          <Link to='/' className={'link'}>
            <Button size={'small'} type={'link'} icon={<FormOutlined />}>
              Edit
            </Button>
          </Link>
          <Button size={'small'} type={'text'} danger icon={<DeleteOutlined />}>
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
};
