const db = require("../../db/config");
const orderModel = {};

orderModel.getAll = () => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT * FROM orders JOIN menu ON menu.id = orders.menu_id JOIN customer ON customer.id = orders.customer_id`,
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      }
    );
  });
};

orderModel.create = (data) => {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO orders (customer_id, menu_id, qty) VALUES (?, ?, ?)`,
      [data.customerId, data.menuId, data.qty],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      }
    );
  });
};


module.exports = orderModel;
