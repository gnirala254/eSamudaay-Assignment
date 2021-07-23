const express = require('express');
const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const PORT = process.env.PORT || 4000;

const OrdersController = require('./api/controllers/orders');

app.post('/order', OrdersController.orders_create_order);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
