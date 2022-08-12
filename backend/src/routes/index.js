const express = require("express")

const router = express.Router();

const { addUser, getUsers, getUser, updateUser, deleteUser } = require("../controllers/user")
const { addCategory, getCategories, getCategory, updateCategory, deleteCategory } = require("../controllers/category")
const { addTransaction, getTransactions, getAdmin } = require("../controllers/transaction")
const { addFilm, getFilms, getFilm, updateFilm, deleteFilm } = require("../controllers/film")
const { addProfile, getProfile } = require("../controllers/profile")
const { register, login, checkAuth } = require("../controllers/auth")
const { getMylist, addMylist, getMylistDetail } = require("../controllers/mylist")
const { auth } = require("../middlewares/auth")
const { uploadFile } = require("../middlewares/uploadFile")

router.post("/user", addUser);
router.get("/user", getUsers);
router.get("/user/:id", getUser);
router.patch("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

router.post("/category", addCategory);
router.get("/category", getCategories);
router.get("/category/:id", getCategory);
router.patch("/category/:id", updateCategory);
router.delete("/category/:id", deleteCategory);

router.post("/film", auth, uploadFile("image"), addFilm);
router.get("/film", getFilms);
router.get("/film/:id", getFilm);
router.patch("/film/:id", auth, uploadFile("image"), updateFilm);
router.delete("/film/:id", deleteFilm);

router.post("/transaction", auth, addTransaction);
router.get("/transaction", auth, getTransactions);
router.get("/transadmin", getAdmin)

router.post("/profile", addProfile);
router.get("/profile", getProfile);

router.post("/mylist", auth, addMylist)
router.get("/mylist", auth,  getMylist)
router.get("/mylist/:id", auth, getMylistDetail)

router.post("/register", register);
router.post("/login", login);
router.get("/check-auth", auth, checkAuth)

module.exports = router;