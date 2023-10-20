const customerModel = require("../models/customerModel.js");

const customerController = {};

customerController.getAll = (req, res) => {
  customerModel
    .getAll()
    .then((customes) => {
      res.json({
        status: "OK",
        data: customes,
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    });
};

// Menampilkan sau data berdasarakan Id
customerController.getById = (req, res) => {
  const { id } = req.params;
  customerModel
    .getById(id)
    .then((customer) => {
      if (!customer) {
        res.status(404).json({
          status: "Gagal",
          message: "Data tidak ditemukan",
        });
      } else {
        res.json({
          status: "OK",
          data: customer,
        });
      }
    })
    .catch((error) => {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    });
};

// Create
customerController.create = (req, res) => {
  const { name, address, email } = req.body;
  // validasi name
  if (!name || typeof name !== "string" || !/^[a-zA-Z ]+$/.test(name)) {
    return res.status(400).json({
      status: "Gagal",
      message: "Nama harus diisi dengan huruf dan tidak boleh kosong",
    });
  }
  //validasi email
  if (!email || typeof name !== "string" || !/^[a-z@.]+$/.test(email)) {
    return res.status(400).json({
      status: "Gagal",
      message: "Email harus diisi dengan huruf dan tidak boleh kosong",
    });
  }
  customerModel
    .create({name, address, email})
    .then((lastID) => {
      res.json({
        status: "OK",
        message: "Data Berhasil Ditambahkan",
        lastID: lastID,
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ success: false, message: "Gagal menyimpan data" });
    });
};

// Update
customerController.update = (req, res) => {
  const { id } = req.params;
  const newData = req.body;
  customerModel
    .update(id, newData)
    .then((rowCount) => {
      if (rowCount === 0) {
        res.json({
          success: false,
          message: "Data tidak ditemukan",
        });
      } else {
        res.json({
          status: "OK",
          message: "Data Berhasil Diperbarui",
        });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    });
};

// Delete
customerController.delete = (req, res) => {
  const { id } = req.params;
  customerModel
    .delete(id)
    .then((rowCount) => {
      if (rowCount === 0) {
        res.status(404).json({
          success: false,
          message: "Tidak ada data",
        });
      } else {
        res.json({
          status: "OK",
          message: "Data Berhasil Dihapus",
        });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    });
};
module.exports = customerController;
