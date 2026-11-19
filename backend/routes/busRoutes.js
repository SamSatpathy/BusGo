const express=require("express");
const router=express.Router();
const {
  createBus,
  getAllBuses,
  getBusById,
  updateBus,
  deleteBus
  }=require("../controllers/busController");

  router.post("/",createBus);
  router.get("/",getAllBuses);
  router.get("/:id",getBusById);
  router.patch("/:id",updateBus);
  router.delete("/:id",deleteBus)
  module.exports=router;