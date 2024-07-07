import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Main } from './pages/Main/Main';
import { NewMeal } from './pages/NewMeal/NewMeal';
import { Layout } from './components/Layout/Layout';

export const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/meals/add' element={<NewMeal />} />
      </Routes>
    </Layout>
  );
};
