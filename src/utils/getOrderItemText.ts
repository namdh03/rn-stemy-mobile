import { OrderStatus } from '~graphql/graphql';

export function getOrderStatusLabel(status: OrderStatus): string {
  switch (status) {
    case OrderStatus.Unpaid:
      return 'To Pay';
    case OrderStatus.Paid:
    case OrderStatus.Delivering:
      return 'To Ship';
    case OrderStatus.Delivered:
      return 'To Receive';
    case OrderStatus.Received:
      return 'To Rate';
    case OrderStatus.Rated:
    case OrderStatus.Unrated:
      return '';
    default:
      return 'Unknown Status';
  }
}

export function getOrderStatusButtonText(status: OrderStatus): string {
  switch (status) {
    case OrderStatus.Unpaid:
      return 'Pay Now';
    case OrderStatus.Paid:
    case OrderStatus.Delivering:
    case OrderStatus.Delivered:
      return 'Received';
    case OrderStatus.Received:
      return 'Rate';
    case OrderStatus.Rated:
    case OrderStatus.Unrated:
      return 'Buy again';
    default:
      return 'Unknown Status';
  }
}

export function getOrderStatusDescription(status: OrderStatus): string {
  switch (status) {
    case OrderStatus.Unpaid:
      return 'Waiting for payment';
    case OrderStatus.Paid:
      return 'Preparing to ship';
    case OrderStatus.Delivering:
      return 'In transit';
    case OrderStatus.Delivered:
    case OrderStatus.Received:
      return '';
    case OrderStatus.Rated:
    case OrderStatus.Unrated:
      return 'Delivery successful';
    default:
      return 'Unknown Status';
  }
}
