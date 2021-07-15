const ROOMS_COUNT = 10;
const SM_DISCOUNT = 0.9;
const MD_DISCOUNT = 0.8;
const SM_DAYS_COUNT = 10;
const MD_DAYS_COUNT = 20;
const DAY_PRICE = 1000;
const monthNames: string[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const constants = {
  ROOMS_COUNT,
  DAY_PRICE,
  monthNames,
  discount: {
    SM_DAYS_COUNT,
    SM_DISCOUNT,
    MD_DAYS_COUNT,
    MD_DISCOUNT,
  },
};
