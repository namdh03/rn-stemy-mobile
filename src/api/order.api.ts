import http from '~utils/http';

export const pickUpOrder = (orderId: string) => http(`/webhook/order/${orderId}/delivering`);

export const confirmDeliveredOrder = (orderId: string) => http(`/webhook/order/${orderId}/delivered`);
