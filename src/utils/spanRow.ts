import { dummy_data } from '../../dummy';

type CountSpanRowT = typeof dummy_data;

export const countSpanRow = (key: string | any) => {
  const countByDate: CountSpanRowT = {};

  dummy_data.forEach((data: string, index: number) => {
    if (!countByDate[data[key]]) {
      countByDate[data[key]] = {
        data: data[key],
        count: 0,
        startIndex: index,
      };
    }
    countByDate[data[key]].count++;
  });

  return countByDate;
};
