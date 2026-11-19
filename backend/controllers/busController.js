const Bus = require("../models/Bus")
const createBus= async(req,res)=>{
  try{
    const bus= await Bus.create(req.body);
    res.status(201).json({message:"Bus created successfully",
      bus
    });
  } catch(error){
    res.status(400).json({
      message:error.message
    });
  }
};
//get all buses
const getAllBuses= async(req,res)=>{
  try{
    const buses=await Bus.find();
    res.status(200).json({
      message:"Buses fetched successfully",
      buses:buses
    });
  }
  catch(error){
    res.status(500).json({
      message:error.message
    });
  }
}
//get bus by id
const getBusById= async(req,res)=>{
  try{
    const busById=await Bus.findById(req.params.id);
    if(!busById){
      return res.status(404).json({
        message:"Bus not found"
      })
    }
    res.status(200).json({
      message:"success",
      busById
    })
  }
  catch(error){
    res.status(400).json({
      message:"Invalid Bus Id"
    });
  }
}
const updateBus= async(req,res)=>{
  try{
    const updatedBus= await Bus.findByIdAndUpdate(
      req.params.id,
      {$set:req.body},
      {new:true,runValidators:true}
    )
    if(!updatedBus){
      return res.status(404).json({
        message:"Bus Not Found"
      })
    }
    res.status(200).json({
      message:"Bus updated successfully",
      updatedBus
    })
  }
  catch(error){
    res.status(400).json({
      message:error.message
    })
  }
}
  const deleteBus=async(req,res)=>{
    try{
    const deletedBus = await Bus.findByIdAndDelete(req.params.id);
    if(!deletedBus){
     return res.status(404).json({
        message:"Bus not Found"
      });
    }
  
    res.status(200).json({
      message:"Bus deleted successfully"
    });
  }

catch(error){
  res.status(500).json({
    message:error.message
  });
}
  }


module.exports={createBus,getAllBuses,getBusById,updateBus,deleteBus}