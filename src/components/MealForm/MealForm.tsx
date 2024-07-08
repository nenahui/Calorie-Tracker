import {
  Input,
  Typography,
  Select,
  Button,
  DatePicker,
  Form,
  FormProps,
  message,
  Flex,
} from 'antd';
import { IMeal, IMealMutation } from '../../types';
import dayjs from 'dayjs';
import { useCallback, useState } from 'react';
import { axiosApi } from '../../axiosApi';

const initialValues: IMealMutation = {
  date: dayjs(new Date()),
  description: '',
  calories: '',
  mealTime: 'breakfast',
};

export const MealForm = () => {
  const [form] = Form.useForm();
  const [isCreating, setIsCreating] = useState(false);

  const onCreate: FormProps<IMealMutation>['onFinish'] = useCallback(
    async (values: IMealMutation) => {
      try {
        setIsCreating(true);
        const data = {
          ...values,
          calories: parseFloat(values.calories),
          date: values.date.toISOString(),
        };

        await axiosApi.post<IMeal>('/meals.json', data);
        message.success('New meal successfully added.', 1);
      } catch (error) {
        message.error('Sorry, there was an unexpected error creating meal', 2);
        console.error(error);
      } finally {
        form.resetFields();
        setIsCreating(false);
      }
    },
    [form]
  );

  return (
    <Form
      form={form}
      onFinish={onCreate}
      initialValues={initialValues}
      autoComplete='off'
    >
      <Typography.Text type={'secondary'}>Add new meal</Typography.Text>

      <Flex vertical>
        <Form.Item
          layout={'vertical'}
          label='Meal Type'
          name='mealTime'
          className={'mb-10'}
        >
          <Select
            options={[
              { value: 'breakfast', label: 'Breakfast' },
              { value: 'snack', label: 'Snack' },
              { value: 'lunch', label: 'Lunch' },
              { value: 'dinner', label: 'Dinner' },
            ]}
          />
        </Form.Item>

        <Form.Item
          label='Description'
          name='description'
          layout={'vertical'}
          className={'mb-10'}
        >
          <Input required />
        </Form.Item>

        <Form.Item
          label='Calories'
          name='calories'
          layout={'vertical'}
          className={'mb-10'}
        >
          <Input required />
        </Form.Item>

        <Form.Item
          label='Date'
          name='date'
          layout={'vertical'}
          className={'mb-10'}
        >
          <DatePicker showNow mode={'date'} style={{ width: '100%' }} />
        </Form.Item>

        <Button type={'primary'} htmlType={'submit'} disabled={isCreating}>
          Add Meal
        </Button>
      </Flex>
    </Form>
  );
};
