import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Main } from './pages/Main/Main';
import { MealForm } from './pages/MealForm/MealForm';
import { Layout } from './components/Layout/Layout';
import { ConfigProvider, theme } from 'antd';

export const App = () => {
  return (
    <ConfigProvider theme={{ algorithm: theme.compactAlgorithm }}>
      <Layout>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/meals/add' element={<MealForm />} />
          <Route path='/meals/:id/edit' element={<MealForm />} />
        </Routes>
      </Layout>
    </ConfigProvider>
  );
};
