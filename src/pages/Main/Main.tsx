import { Card, message, Skeleton, Spin, Typography } from 'antd';
import { Meal } from '../../components/Meal/Meal';
import { useCallback, useEffect, useState } from 'react';
import { IApiMeal } from '../../types';
import { axiosApi } from '../../axiosApi';
import { motion } from 'framer-motion';

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
      setMeals(mealsResponse);
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
    return meals.reduce((sum, meal) => sum + meal.calories, 0);
  };

  const loadingCard = (
    <>
      <Skeleton loading={isLoading}>
        <Card>Loading...</Card>
      </Skeleton>
      <Skeleton loading={isLoading}>
        <Card>Loading...</Card>
      </Skeleton>
      <Skeleton loading={isLoading}>
        <Card>Loading...</Card>
      </Skeleton>
    </>
  );

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <main className={'d-flex flex-column'}>
        <div className={'d-flex align-items-center justify-content-between'}>
          <Typography.Text>Meals</Typography.Text>
          <Typography.Text>
            Total calories: {isLoading ? <Spin size={'small'} /> : totalPrice()}
            &nbsp;
            <Typography.Text type={'secondary'}>kcal</Typography.Text>
          </Typography.Text>
        </div>
        <div className={'d-flex flex-column gap-2 mt-2'}>
          {isLoading
            ? loadingCard
            : meals.map((meal) => (
                <Meal deleteMeal={deleteMeal} meal={meal} key={meal.id} />
              ))}
        </div>
      </main>
    </motion.div>
  );
};
