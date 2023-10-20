const customerModel = require("../models/customerModel");
const menuModel = require("../models/menuModel");
const orderModel = require("../models/orderModel");

const orderController = {};

orderController.getAll = (req, res) => {
  orderModel
    .getAll()
    .then((rows) => {
      res.status(200).json({
        status: "Success",
        data: rows,
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        status: "Error",
        data: error,
      });
    });
};

orderController.create = async (req, res) => {
  const { id, item } = req.body;
  try {
    const customer = await customerModel.getById(id);
    if (!customer) {
      return res.status(400).json({
        status: "ERROR",
        message: "Tidak ada data customer dengan ID yang diberikan.",
      });
    }
    const menuNames = item.map((item) => item.menu);
    const menus = await menuModel.findByNames(menuNames);
    for (const item of item) {
      const menu = menus.find((m) => m.item === item.menu);
      if (menu) {
        const order = {
          id,
          menuId: menu.id,
          qty: item.qty,
        };
        await orderModel.create(order);
      }
    }
    res.status(201).json({
      status: "SUCCESS",
      message: "Data Berhasil Ditambahkan!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "ERROR",
      message: "Gagal menambahkan data pesanan.",
      error: error,
    });
  }
};

module.exports = orderController;
