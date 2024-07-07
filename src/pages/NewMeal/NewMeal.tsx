import { MealForm } from '../../components/MealForm/MealForm';
import { motion } from 'framer-motion';

export const NewMeal = () => {
  return (
    <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
      <MealForm />
    </motion.div>
  );
};
