import { SortOrder } from '~graphql/graphql';

import { CategoriesFormType } from './schema';

type SortType = CategoriesFormType['sort'];

const sortData = [
  {
    label: 'Name (A-Z)',
    order: SortOrder.Asc,
    sort: 'name' as SortType,
  },
  {
    label: 'Name (Z-A)',
    order: SortOrder.Desc,
    sort: 'name' as SortType,
  },
  {
    label: 'Price (High-Low)',
    order: SortOrder.Desc,
    sort: 'price' as SortType,
  },
  {
    label: 'Price (Low-High)',
    order: SortOrder.Asc,
    sort: 'price' as SortType,
  },
];

export default sortData;
