const menuModel = require("../models/menuModel");

const menuController = {};

menuController.getAll = (req, res) => {
  menuModel
    .getAll()
    .then((menus) => {
      res.json({
        status: "OK",
        data: menus,
      });
    })
    .catch((error) => {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    });
};

//Menampilkan satu data berdasarakan id
menuController.getById = (req, res) => {
  const { id } = req.params;
  menuModel
    .getById(id)
    .then((menu) => {
      if (!menu) {
        res.status(404).json({
          success: false,
          message: "Data tidak ditemukan",
        });
      } else {
        res.json({
          status: "OK",
          data: menu,
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

// silahkan buat varian controller lain sesuai fitur masing masing
menuController.create = (req, res) => {
  const { item, price } = req.body;
  //validasi item
  if (!item || typeof item !== "string" || !/^[a-zA-Z ]+$/.test(item)) {
    return res.status(400).json({
      status: "Gagal",
      message: "Item harus diisi huruf dan tidak boleh kosong",
    });
  }
  //validasi price
  if (!price || isNaN(price)) {
    return res.status(400).json({
      status: "Gagal",
      message: "Price harus diisi angka dan tidak boleh kosong",
    });
  }
  menuModel
    .create({ item, price })
    .then((lastID) => {
      res.json({
        status: "OK",
        message: "Data Berhasil ditambahkan",
        lastID: lastID,
      });
    })
    .catch((error) => {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    });
};

//Update
menuController.update = (req, res) => {
  const { id } = req.params;
  const newData = req.body; // Ambil data yang baru dari body request

  menuModel
    .update(id, newData) // Kirimkan ID dan data yang baru ke model
    .then((rowCount) => {
      if (rowCount === 0) {
        res.status(404).json({
          success: false,
          message: "Data tidak ditemukan",
        });
      } else {
        res.json({
          status: "OK",
          message: "Data berhasil diperbarui",
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

// Delete
menuController.delete = (req, res) => {
  const { id } = req.params;
  menuModel
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
          message: `Data Berhasil dihapus`,
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

module.exports = menuController;
