const db = require("../../db/config");

const menuModel = {};

// Menampilkan semua data
menuModel.getAll = () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM menu", (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

//Menampilkan satu data berdasarakan id
menuModel.getById = (id) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM menu WHERE id = ?`, [id], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

// Create
menuModel.create = (data) => {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO menu (item,price) VALUES (?, ?)`,
      [data.item, data.price],
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
menuModel.update = (id, data) => {
  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE menu SET item = ?, price = ? WHERE id = ?`,
      [data.item, data.price, id],
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
menuModel.delete = (id) => {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM menu WHERE id = ?", [id], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.changes);
      }
    });
  });
};

module.exports = menuModel;
