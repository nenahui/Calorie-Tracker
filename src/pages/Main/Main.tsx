import { Typography } from 'antd';
import { Meal } from '../../components/Meal/Meal';

export const Main = () => {
  return (
    <main className={'d-flex flex-column'}>
      <Typography.Text>Meals</Typography.Text>
      <Meal />
    </main>
  );
};
