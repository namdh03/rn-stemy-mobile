import { useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';

import constants from '~constants';
import execute from '~graphql/execute';
import { OrderStatus } from '~graphql/graphql';
import {
  GetOrderByStatusQuery as GetOrderByStatusQueryFn,
  GetOrderByToShipQuery as GetOrderByToShipQueryFn,
} from '~services/order.services';

const useOrderList = (orderStatus: OrderStatus) => {
  const isToShipTab = useMemo(
    () => orderStatus === OrderStatus.Paid || orderStatus === OrderStatus.Delivering,
    [orderStatus],
  );
  const orderByStatusQuery = useQuery({
    queryKey: [constants.ORDER_QUERY_KEY.GET_ORDER_BY_STATUS_QUERY_KEY, orderStatus],
    queryFn: () => execute(GetOrderByStatusQueryFn, { status: orderStatus }),
    select: (data) => data.data.searchOrder,
    enabled: !isToShipTab,
  });
  const orderByToShipQuery = useQuery({
    queryKey: [constants.ORDER_QUERY_KEY.GET_ORDER_BY_TO_SHIP_QUERY_KEY, OrderStatus.Paid, OrderStatus.Delivering],
    queryFn: () => execute(GetOrderByToShipQueryFn),
    select: (data) => [...data.data.searchOrderByPaid, ...data.data.searchOrderByDelivering],
    enabled: isToShipTab,
  });
  const { data, refetch, isLoading } = isToShipTab ? orderByToShipQuery : orderByStatusQuery;

  return {
    data:
      data?.sort((a, b) => {
        const dateA = new Date(b.updatedAt || b.createdAt).getTime();
        const dateB = new Date(a.updatedAt || a.createdAt).getTime();
        return dateA - dateB;
      }) || [],
    refetch,
    isLoading,
  };
};

export default useOrderList;
