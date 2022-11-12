import mockJs from 'mockjs';
import { Ref } from 'vue';

export type UserList = {
  age: number;
  job: string;
  name: string;
  phone: string;
  address: string;
  favorite: string;
}[];

const upStep = 500;
const jobs = ['程序员', '会计', '客服'];
const favorites = ['乒乓球', '羽毛球', '打游戏'];

const genatorData = (number: number) => {
  return Array.from({ length: number }).map<UserList[number]>(() => ({
    phone: mockJs.mock('phone'),
    name: mockJs.mock('@name'),
    address: mockJs.mock('@province'),
    age: Math.floor(Math.random() * 40),
    job: jobs[Math.floor(Math.random() * jobs.length)],
    favorite: favorites[Math.floor(Math.random() * favorites.length)],
  }));
};

export const useData = (length: number, dataRef: Ref<any[]>) => {
  if (length <= 200) {
    dataRef.value = dataRef.value.concat(genatorData(length));
  } else {
    const sign = setTimeout(() => {
      clearTimeout(sign);
      dataRef.value = dataRef.value.concat(genatorData(upStep));
      useData(length - upStep, dataRef);
    });
  }
};
