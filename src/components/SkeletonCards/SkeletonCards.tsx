import React from 'react';
import { Card, Skeleton } from 'antd';
import { motion } from 'framer-motion';

interface Props {
  isLoading: boolean;
  amount: number;
}

export const SkeletonCards: React.FC<Props> = ({ isLoading, amount }) => {
  return (
    <>
      {Array.from({ length: amount }).map((_, index) => (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Skeleton loading={isLoading} key={index}>
            <Card>Loading...</Card>
          </Skeleton>
        </motion.div>
      ))}
    </>
  );
};
