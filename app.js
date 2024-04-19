const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const bodyParser=require('body-parser')
app.use(bodyParser.json());

// Dummy data for doctors
const doctors = [
    { id: 1, name: "Dr. John Doe", specialization: "Cardiologist" },
    { id: 2, name: "Dr. Jane Smith", specialization: "Dermatologist" },
    { id: 3, name: "Dr. Michael Johnson", specialization: "Orthopedic Surgeon" },
    { id: 4, name: "Dr. Emily Williams", specialization: "Pediatrician" },
    { id: 5, name: "Dr. David Brown", specialization: "Neurologist" }
];

// Dummy data for availability of slots for appointment
const availability = {
    1: { Monday: ["17:00", "18:00"], Tuesday: ["17:00", "18:00"] },
    2: { Wednesday: ["17:30", "18:00"], Thursday: ["17:00", "18:00"] },
    3: { Monday: ["17:30", "18:30"], Tuesday: ["17:30", "18:30"], Friday: ["17:30", "18:30"] },
    4: { Wednesday: ["17:30", "18:30"], Thursday: ["17:30", "18:30"], Friday: ["17:30", "18:30"] },
    5: { Tuesday: ["17:00", "18:00"], Thursday: ["17:00", "18:00"], Friday: ["17:00", "18:00"] }
};


// to store all booked appointments with doctor id, day and time
const appointments = [];

// Endpoint to list all doctors with id, name and specialization
app.get('/doctors', (req, res) => {
    res.json(doctors);
});

// Endpoint to get details of a specific doctor, need to provide id of doctor
app.get('/doctor/:doctorId', (req, res) => {
    const doctorId = parseInt(req.params.doctorId);
    const doctor = doctors.find(doctor => doctor.id === doctorId);
    if (doctor) {
        res.json(doctor);
    } else {
        res.status(404).json({ error: "Doctor not found" });
    }
});

// Endpoint to check all the available of specific doctor for appointment to book
app.get('/doctor/:doctorId/availability', (req, res) => {
    const doctorId = parseInt(req.params.doctorId);
    const doctorAvailability = availability[doctorId] || {};
    res.json(doctorAvailability);
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});