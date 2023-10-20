const db = require("../../db/config");

const categorieModel = {};

// Menampilkan Semua Data
categorieModel.getAll = () => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM categories`, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

//Menampilkan satu data berdasarkan id
categorieModel.getById = (id) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM categories WHERE id = ?`, [id], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

// Create
categorieModel.create = (data) => {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO categories (name) VALUES (?)`,
      [data.name],
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
categorieModel.update = (id, data) => {
  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE categories SET name = ? WHERE id = ?`,
      [data.name, id],
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
categorieModel.delete = (id) => {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM categories WHERE id = ?`, [id], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.changes);
      }
    });
  });
};

module.exports = categorieModel;
