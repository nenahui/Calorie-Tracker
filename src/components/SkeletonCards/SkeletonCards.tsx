import React from 'react';
import { Card, Skeleton } from 'antd';

interface Props {
  isLoading: boolean;
  amount: number;
}

export const SkeletonCards: React.FC<Props> = ({ isLoading, amount }) => {
  return (
    <>
      {Array.from({ length: amount }).map((_, index) => (
        <Skeleton loading={isLoading} key={index}>
          <Card>Loading...</Card>
        </Skeleton>
      ))}
    </>
  );
};
