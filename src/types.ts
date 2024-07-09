import { Dayjs } from 'dayjs';

export interface IMeal {
  mealTime: 'breakfast' | 'snack' | 'lunch' | 'dinner';
  description: string;
  calories: number;
  date: Dayjs;
}

export interface IMealMutation extends Omit<IMeal, 'calories'> {
  calories: string;
}

export interface IApiMeal extends IMeal {
  id: string;
}

export interface IApiMeals {
  [id: string]: IApiMeal;
}