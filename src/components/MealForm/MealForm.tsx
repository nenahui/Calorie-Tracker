import {
  Input,
  Typography,
  Select,
  Button,
  DatePicker,
  Form,
  FormProps,
  Tag,
} from 'antd';
import { IMeal, IMealMutation } from '../../types';
import dayjs from 'dayjs';
import { useCallback, useState } from 'react';
import { axiosApi } from '../../axiosApi';

const initialValues: IMealMutation = {
  date: dayjs(new Date().toISOString()),
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
      } catch (error) {
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
      className={'d-flex flex-column gap-4'}
      autoComplete='off'
    >
      <Typography.Text>Add new meal</Typography.Text>

      <Form.Item
        layout={'vertical'}
        label={<Tag>Meal Type</Tag>}
        name='mealTime'
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
        label={<Tag>Description</Tag>}
        name='description'
        layout={'vertical'}
      >
        <Input required />
      </Form.Item>

      <Form.Item
        label={<Tag>Calories</Tag>}
        name='calories'
        layout={'vertical'}
      >
        <Input required />
      </Form.Item>

      <Form.Item label={<Tag>Date</Tag>} name='date' layout={'vertical'}>
        <DatePicker showNow mode={'date'} style={{ width: '100%' }} />
      </Form.Item>

      <Button type={'primary'} htmlType={'submit'} disabled={isCreating}>
        Add Meal
      </Button>
    </Form>
  );
};
