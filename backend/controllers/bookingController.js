const Booking= require("../models/Booking");
const Bus=require("../models/Bus");
const mongoose=require("mongoose");

//create the booking
const createBooking=async(req,res)=>{
  const {bus,passengerName, seatsBooked} = req.body;
  //validate the bus id
  if(!mongoose.isValidObjectId(bus)){
    return res.status(400).json({
      message:"invalid bus ID"
    });
  }
  //Validate Passenger details
  if(typeof passengerName !== 'string' || 
    !passengerName.trim()||
    !Number.isInteger(seatsBooked)||
    seatsBooked<1
  ) {
    return res.status(400).json({
      message:"Provide a valid passenger name and seat count"
    });
  }
  try{
    //Find the bus
    const busDetails= await Bus.findById(bus);
    if(!busDetails){
      return res.status(404).json({
        message:"Bus not found"
      });
    }
    //Reserve seats only if seats are available
    const updatedBus=await Bus.findOneAndUpdate(
      {
        _id:bus,
        availableSeats:{$gte:seatsBooked}
      },
      {
        $inc:{availableSeats:-seatsBooked}
      },
      {
        new:true
      }
    )
    if(!updatedBus){
      return res.status(400).json({
        message:"Not enought seats available"
      })
    }
  //Calculate Total Fare
  const totalFare = busDetails.fare * seatsBooked;
  try{
    //save the booking
    const booking = await Booking.create({
      bus,
      passengerName:passengerName.trim(),
      seatsBooked,
      totalFare
});
    return res.status(201).json({
      message:"Booking created Successfully",
      booking,
      availableSeats:updatedBus.availableSeats
    });
  }
  catch(error){
    //restore seats if saving the booking fails
    await Bus.findByIdAndUpdate(
      bus,
      {$inc:{availableSeats:seatsBooked}
    });
    throw error;
  }
}
catch(error){
  return res.status(500).json({
    message:error.message
  });
}
}
//Get All Bookings
const getAllBookings=async(req,res)=>{
  try{
    const bookings= await Booking.find({
      status:{$ne:"cancelled"}
    }).populate("bus");
    return res.status(200).json({
      message:"bookings fetched successfully",
      bookings
    });
  }
  catch(error){
    res.status(500).json({
      message:error.message
    });
  }
}
//Get Booking By Id
const getBookingById=async(req,res)=>{
  try{
    const booking= await Booking.findOne({_id:req.params.id,
      status:{$ne:"cancelled"}
    }).populate("bus");
    if(!booking){
      return res.status(404).json({
        message:"Booking not found"
      });
    }
    res.status(200).json({
      message:"Booking fetched successfully",
      booking
    })
  }
  catch(error){
    res.status(400).json({
      message:"Invalid Booking ID"
    })
  }
}
//Cancel a Booking
const deleteBooking = async(req,res)=>{
  try{
    const booking = await Booking.findById(req.params.id);
    if(!booking){
      return res.status(404).json({
      message:"booking not found"
    });
  }
  if(booking.status==="cancelled"){
    return res.status(400).json({
      message:"Booking is already cancelled"
  });
 }
  const updatedBus= await Bus.findByIdAndUpdate(
    booking.bus,
    {$inc:{availableSeats:booking.seatsBooked}},
    {new:true}
 );
 if(!updatedBus){
    return res.status(404).json({
      message:"bus not found"
    })
 }
 booking.status="cancelled"
 await booking.save();
 return res.status(200).json({
    message:"Booking cancelled successfully",
    booking,
    availableSeats:updatedBus.availableSeats
 });
}
catch(error){
  res.status(500).json({
    message:error.message
  });
}
}
module.exports={createBooking,getAllBookings,getBookingById,deleteBooking};