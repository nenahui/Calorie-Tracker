import React from 'react';
import { Button, Card, Popconfirm, Typography } from 'antd';
import { Link } from 'react-router-dom';
import {
  DeleteOutlined,
  FormOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { IApiMeal } from '../../types';
import { format } from 'date-fns';

interface Props {
  meal: IApiMeal;
  deleteMeal: (id: string) => void;
}

export const Meal: React.FC<Props> = ({ meal, deleteMeal }) => {
  return (
    <Card size={'small'}>
      <div className={'d-flex flex-column justify-content-between gap-2'}>
        <div className={'d-flex justify-content-between'}>
          <Typography.Text type={'secondary'}>{meal.mealTime}</Typography.Text>
          <Typography.Text type={'secondary'} className={'small'}>
            {format(meal.date.toString(), 'dd.MM.yy hh:mma')}
          </Typography.Text>
        </div>
        <Typography.Text>{meal.description}</Typography.Text>
        <div className={'d-flex justify-content-between'}>
          <Typography.Text>
            {meal.calories}&nbsp;
            <Typography.Text type={'secondary'}>kcal</Typography.Text>
          </Typography.Text>
          <div>
            <Link to='/' className={'link'}>
              <Button size={'small'} type={'link'} icon={<FormOutlined />}>
                Edit
              </Button>
            </Link>
            <Popconfirm
              title='Delete the meal'
              description='Are you sure to delete this meal?'
              onConfirm={() => deleteMeal(meal.id)}
              icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            >
              <Button
                size={'small'}
                type={'text'}
                danger
                icon={<DeleteOutlined />}
              >
                Delete
              </Button>
            </Popconfirm>
          </div>
        </div>
      </div>
    </Card>
  );
};
