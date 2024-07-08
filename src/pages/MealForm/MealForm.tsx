import { MainForm } from '../../components/MainForm/MainForm';
import { motion } from 'framer-motion';

export const MealForm = () => {
  return (
    <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
      <MainForm />
    </motion.div>
  );
};
