exports.orders_create_order = (req, res, next) => {
  const orderItems = req.body.order_items;
  const distance = req.body.distance;
  const offer = req.body.offer;

  let itemTotal = 0;
  let deliveryFee = 0;
  let orderTotalWithoutOffer = 0;
  let discount = 0;
  let orderTotal = 0;

  // calculating total item cost
  orderItems.forEach((item) => {
    itemTotal += parseInt(item.quantity) * parseInt(item.price);
  });

  // calculating delivery fee
  if (distance >= 0 && distance <= 10000) {
    deliveryFee = 5000;
  } else if (distance > 10000 && distance <= 20000) {
    deliveryFee = 10000;
  } else if (distance > 20000 && distance <= 50000) {
    deliveryFee = 50000;
  } else if (distance > 50000) {
    deliveryFee = 100000;
  }

  orderTotalWithoutOffer = itemTotal + deliveryFee;

  // calculating discount and orderTotal
  if (offer) {
    if (offer.offer_type === 'FLAT') {
      discount = Math.min(offer.offer_val, orderTotalWithoutOffer);
      orderTotal = orderTotalWithoutOffer - discount;
    } else if (offer.offer_type === 'DELIVERY') {
      discount = Math.min(deliveryFee, orderTotalWithoutOffer);
      orderTotal = orderTotalWithoutOffer - discount;
    }
  } else {
    orderTotal = orderTotalWithoutOffer;
  }

  return res.status(201).json({ order_total: orderTotal });
};
