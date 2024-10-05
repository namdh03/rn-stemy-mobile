import { OrderStatus } from '~graphql/graphql';

export function getOrderStatusLabel(status: OrderStatus): string {
  switch (status) {
    case OrderStatus.Unpaid:
      return 'To Pay';
    case OrderStatus.Paid:
      return 'To Ship';
    case OrderStatus.Delivering:
      return 'To Receive';
    case OrderStatus.Delivered:
      return 'To Rate';
    default:
      return 'Unknown Status';
  }
}

export function getOrderStatusButtonText(status: OrderStatus): string {
  switch (status) {
    case OrderStatus.Unpaid:
      return 'Pay Now';
    case OrderStatus.Paid:
      return 'Received';
    case OrderStatus.Delivering:
      return 'Received';
    case OrderStatus.Delivered:
      return 'Rate';
    default:
      return 'Unknown Status';
  }
}
