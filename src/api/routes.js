export const routes = {
  getProperty: (id) => `properties/${id}`,
  getAdresses: (propertyId) =>
    `properties/shipping-addresses?propertyId=${propertyId}`,
  getCustomAddress: (id, propertyId) =>
    `properties/shipping-addresses/${id}?propertyId=${propertyId}`,
  getPropertyOrderDetails: (propertyId, orderId) =>
    `orders/properties/${propertyId}/details/${orderId}`,
};
