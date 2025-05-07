const Doctor = require('../models/Doctor');

exports.addDoctor = async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.status(201).json({ success: true, doctor });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getDoctors = async (req, res) => {
  const { specialty, minRating, maxFee, page = 1, limit = 10 } = req.query;
  const filters = {};

  if (specialty) filters.specialty = specialty;
  if (minRating) filters.rating = { $gte: Number(minRating) };
  if (maxFee) filters.consultationFee = { $lte: Number(maxFee) };

  try {
    const doctors = await Doctor.find(filters)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Doctor.countDocuments(filters);
    res.status(200).json({ success: true, total, page, doctors });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// exports.getDoctors = async (req, res) => {
//   try {
//     const doctors = await Doctor.find()
//     res.status(200).json(doctors);
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };
