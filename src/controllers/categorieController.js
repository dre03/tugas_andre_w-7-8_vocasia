const categorieModel = require("../models/categorieModel");

const categorieController = {};

categorieController.getAll = (req, res) => {
  categorieModel
    .getAll()
    .then((categories) => {
      res.json({
        status: "OK",
        data: categories,
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

//Menampilkan data berdasarkan id
categorieController.getById = (req, res) => {
  const { id } = req.params;
  categorieModel
    .getById(id)
    .then((categorie) => {
      if (!categorie) {
        res.status(404).json({
          success: false,
          message: "Data tidak ditemukan",
        });
      } else {
        res.json({
          success: "OK",
          data: categorie,
        });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Interal Server Error",
      });
    });
};

// Create
categorieController.create = (req, res) => {
  const {name} = req.body;
  if (!name || typeof name !== "string" || !/^[a-zA-Z ]+$/.test(name)) {
    return res.status(400).json({
      status: "Gagal",
      message: "Nama harus diisi dengan huruf dan tidak boleh kosong",
    });
  }
  categorieModel
    .create({name})
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
categorieController.update = (req, res) => {
  const { id } = req.params;
  const newData = req.body;
  categorieModel
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
categorieController.delete = (req, res) => {
  const { id } = req.params;
  categorieModel
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

module.exports = categorieController;
