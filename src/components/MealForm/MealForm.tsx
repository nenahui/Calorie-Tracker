import {
  Input,
  Typography,
  Select,
  Button,
  DatePicker,
  Form,
  FormProps,
  message,
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
      <Typography.Text>Add new meal</Typography.Text>

      <div className={'d-flex flex-column gap-4 mt-2'}>
        <Form.Item
          layout={'vertical'}
          className={'m-0'}
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
          className={'m-0'}
          layout={'vertical'}
        >
          <Input required />
        </Form.Item>

        <Form.Item
          label={<Tag>Calories</Tag>}
          name='calories'
          className={'m-0'}
          layout={'vertical'}
        >
          <Input required />
        </Form.Item>

        <Form.Item
          label={<Tag>Date</Tag>}
          name='date'
          layout={'vertical'}
          className={'m-0'}
        >
          <DatePicker showNow mode={'date'} style={{ width: '100%' }} />
        </Form.Item>

        <Button type={'primary'} htmlType={'submit'} disabled={isCreating}>
          Add Meal
        </Button>
      </div>
    </Form>
  );
};
