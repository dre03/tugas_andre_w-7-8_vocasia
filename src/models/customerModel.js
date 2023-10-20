const db = require("../../db/config");

const customerModel = {};

// Menampilkan Semua Data
customerModel.getAll = () => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM customer`, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

// Menampilkan satu data berdasarakan id
customerModel.getById = (customerId) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM customer WHERE id = ?`, [customerId], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

// Create
customerModel.create = (data) => {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO customer (name, address, email) VALUES (?, ?, ?)`,
      [data.name, data.address, data.email],
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

// Update
customerModel.update = (id, data) => {
  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE customer SET name = ?, address = ?, email = ? WHERE id = ?`,
      [data.name, data.address, data.email, id],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes);
        }
      }
    );
  });
};

// Delete
customerModel.delete = (id) => {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM customer WHERE id = ?`, [id], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.changes);
      }
    });
  });
};

module.exports = customerModel;
