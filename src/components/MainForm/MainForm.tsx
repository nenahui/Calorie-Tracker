import {
  Input,
  Typography,
  Select,
  Button,
  DatePicker,
  Form,
  FormProps,
  message,
} from 'antd';
import { IMeal, IMealMutation } from '../../types';
import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import { axiosApi } from '../../axiosApi';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

export const MainForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [initialValues, setInitialValues] = useState<IMealMutation>({
    date: dayjs(new Date()),
    description: '',
    calories: '',
    mealTime: 'breakfast',
  });

  const fetchValues = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await axiosApi.get(`/meals/${id}.json`);
      console.log(data);
      if (data) {
        setInitialValues(data);
        form.setFieldsValue({
          ...data,
          date: dayjs(data.date),
        });
      }
    } catch (error) {
      console.error(error);
      message.error('An error occurred while retrieving meal data', 2);
    } finally {
      setIsLoading(false);
    }
  }, [id, form]);

  useEffect(() => {
    if (id) void fetchValues();
  }, [fetchValues, id]);

  const onSubmit: FormProps<IMealMutation>['onFinish'] = useCallback(
    async (values: IMealMutation) => {
      try {
        setIsLoading(true);
        const data = {
          ...values,
          calories: parseFloat(values.calories),
          date: values.date.toISOString(),
        };

        if (id) {
          await axiosApi.put(`/meals/${id}.json`, data);
        } else {
          await axiosApi.post<IMeal>('/meals.json', data);
        }
        message.success(
          id
            ? 'Meal has been edited successfully'
            : 'New meal successfully added.',
          1
        );
        navigate('/');
      } catch (error) {
        message.error('Sorry, there was an unexpected error creating meal', 2);
        console.error(error);
      } finally {
        form.resetFields();
        setIsLoading(false);
      }
    },
    [form, id, navigate]
  );

  return (
    <Form
      form={form}
      onFinish={onSubmit}
      initialValues={initialValues}
      autoComplete='off'
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={'mb-10'}
      >
        <Typography.Text type={'secondary'}>Add new meal</Typography.Text>
      </motion.div>

      <div className={'d-flex flex-column gap-2 mt-2'}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Form.Item
            label='Description'
            name='description'
            layout={'vertical'}
            className={'mb-10'}
          >
            <Input required />
          </Form.Item>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Form.Item
            label='Calories'
            name='calories'
            layout={'vertical'}
            className={'mb-10'}
          >
            <Input required />
          </Form.Item>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Form.Item
            label='Date'
            name='date'
            layout={'vertical'}
            className={'mb-10'}
          >
            <DatePicker showNow mode={'date'} style={{ width: '100%' }} />
          </Form.Item>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <Button
            loading={isLoading}
            type={'primary'}
            htmlType={'submit'}
            disabled={isLoading}
            style={{ width: '100%' }}
          >
            {id ? 'Edit Meal' : 'Add Meal'}
          </Button>
        </motion.div>
      </div>
    </Form>
  );
};
