import { Button, Flex, message, Spin, Typography } from 'antd';
import { Meal } from '../../components/Meal/Meal';
import { useCallback, useEffect, useState } from 'react';
import { IApiMeal } from '../../types';
import { axiosApi } from '../../axiosApi';
import { motion } from 'framer-motion';
import { SkeletonCards } from '../../components/SkeletonCards/SkeletonCards';
import { Link } from 'react-router-dom';
import SORT from 'lodash';
import { format } from 'date-fns';

const currentDate = format(new Date(), 'dd-MM-yy');

export const Main = () => {
  const [meals, setMeals] = useState<IApiMeal[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMeals = useCallback(async () => {
    try {
      setIsLoading(true);

      const { data } = await axiosApi.get('/meals.json');
      const mealsResponse = Object.keys(data).map((id: string) => ({
        ...data[id],
        id,
      }));

      const sortedMeals = SORT.orderBy(mealsResponse, ['date'], ['desc']);
      setMeals(sortedMeals);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchMeals();
  }, [fetchMeals]);

  const deleteMeal = useCallback(
    async (id: string) => {
      try {
        await axiosApi.delete(`/meals/${id}.json`);
        message.success('Meal successfully deleted.', 1);

        void fetchMeals();
      } catch (error) {
        console.error(error);
        message.error(
          'An error occurred while deleting, please try again later.'
        );
      }
    },
    [fetchMeals]
  );

  const totalPrice = () => {
    return meals
      .filter(
        (meal) => format(meal.date.toString(), 'dd-MM-yy') === currentDate
      )
      .reduce((sum, meal) => sum + meal.calories, 0);
  };

  const total = isLoading ? (
    <Spin size={'small'} />
  ) : (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {totalPrice()}
    </motion.div>
  );

  const mealsElements = meals.map((meal, index) => (
    <motion.div
      key={meal.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Meal deleteMeal={deleteMeal} meal={meal} />
    </motion.div>
  ));

  return (
    <Flex justify={'space-between'} vertical>
      <Flex justify={'space-between'} align={'center'} className={'mb-10'}>
        <Typography.Text>
          <Flex gap={'small'}>
            Total calories: {total}
            <Typography.Text type={'secondary'}> kcal</Typography.Text>
          </Flex>
        </Typography.Text>

        <Link to='/meals/add'>
          <Button type={'primary'}>Add new meal</Button>
        </Link>
      </Flex>

      <Flex justify={'space-between'} gap={'middle'} vertical>
        {isLoading ? (
          <SkeletonCards isLoading={isLoading} amount={2} />
        ) : (
          mealsElements
        )}
      </Flex>
    </Flex>
  );
};
