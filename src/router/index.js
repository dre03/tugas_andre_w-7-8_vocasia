const express = require("express");
const menuController = require("../controllers/menuController");
const customerController = require("../controllers/customerController");
const categorieController = require("../controllers/categorieController");
const orderController = require("../controllers/orderController");
const router = express.Router();

// Router Menu
router.get("/menus", menuController.getAll);
router.get("/menu/:id", menuController.getById);
router.post("/menu/create", menuController.create);
router.put("/menu/update/:id", menuController.update);
router.delete("/menu/delete/:id", menuController.delete);

// Router Customer
router.get("/customers", customerController.getAll);
router.post("/customer/create", customerController.create);
router.get("/customer/:id", customerController.getById);
router.put("/customer/update/:id", customerController.update);
router.delete("/customer/delete/:id", customerController.delete);

// Router Categori
router.get("/categories", categorieController.getAll);
router.get("/categorie/:id", categorieController.getById);
router.post("/categorie/create", categorieController.create);
router.put("/categorie/update/:id", categorieController.update);
router.delete("/categorie/delete/:id", categorieController.delete);

//Router Order

router.get("/orders", orderController.getAll);
router.post("/order/create", orderController.create);

module.exports = router;
