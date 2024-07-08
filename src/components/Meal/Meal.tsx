import React from 'react';
import { Button, Card, Flex, Popconfirm, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { IApiMeal } from '../../types';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import {
  DeleteOutlined,
  FormOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';

interface Props {
  meal: IApiMeal;
  deleteMeal: (id: string) => void;
}

export const Meal: React.FC<Props> = ({ meal, deleteMeal }) => {
  const mealTime =
    meal.mealTime.charAt(0).toUpperCase() + meal.mealTime.slice(1);

  const mealDate = format(meal.date.toString(), 'dd.MM.yy hh:mma');

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Card size={'small'}>
        <Flex justify={'space-between'} gap={'middle'} vertical>
          <Flex justify={'space-between'}>
            <Typography.Text type={'secondary'}>{mealTime}</Typography.Text>

            <Typography.Text type={'secondary'}>{mealDate}</Typography.Text>
          </Flex>

          <Typography.Text>{meal.description}</Typography.Text>

          <Flex justify={'space-between'}>
            <Typography.Text>
              {meal.calories}&nbsp;
              <Typography.Text type={'secondary'}>kcal</Typography.Text>
            </Typography.Text>

            <Flex justify={'space-between'}>
              <motion.div whileTap={{ scale: 0.95 }}>
                <Link to='/'>
                  <Button size={'small'} type={'link'} icon={<FormOutlined />}>
                    Edit
                  </Button>
                </Link>
              </motion.div>
              <Popconfirm
                title='Delete the meal'
                description='Are you sure to delete this meal?'
                onConfirm={() => deleteMeal(meal.id)}
                icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
              >
                <motion.div whileTap={{ scale: 0.95 }}>
                  <Button
                    size={'small'}
                    type={'text'}
                    danger
                    icon={<DeleteOutlined />}
                  >
                    Delete
                  </Button>
                </motion.div>
              </Popconfirm>
            </Flex>
          </Flex>
        </Flex>
      </Card>
    </motion.div>
  );
};
