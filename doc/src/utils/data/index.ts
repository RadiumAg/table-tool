import mockJs from 'mockjs';
import { Ref, nextTick } from 'vue';

export type UserList = {
  age: number;
  job: string;
  name: string;
  phone: string;
  address: string;
  favorite: string;
}[];

const upStep = 50;
const jobs = ['程序员', '会计', '客服'];
const favorites = ['乒乓球', '羽毛球', '打游戏'];

export const useData = async (
  length: number,
  dataRef: Ref<any[]>,
  loading?: Ref<boolean>,
) => {
  if (loading) {
    loading.value = true;
    await nextTick();
  }
  let count = 0;

  const genatorData = () => {
    let i = 0;
    do {
      i++;
      count++;
      dataRef.value.push({
        phone: mockJs.mock('phone'),
        name: mockJs.mock('@name'),
        address: mockJs.mock('@province'),
        age: Math.floor(Math.random() * 40),
        job: jobs[Math.floor(Math.random() * jobs.length)],
        favorite: favorites[Math.floor(Math.random() * favorites.length)],
      });
    } while (i < upStep && count < length);

    if (count < length) {
      const sign = setTimeout(() => {
        genatorData();
        clearTimeout(sign);
        // eslint-disable-next-line no-console
        console.log(dataRef.value.length);
        // eslint-disable-next-line no-console
      }, 600);
    } else if (count === length && loading) loading.value = false;
  };

  Promise.resolve().then(() => {
    genatorData();
  });
};
