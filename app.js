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


// Endpoint to book an appointment
app.post('/doctor/:doctorId/book-appointment', (req, res) => {
    const doctorId = parseInt(req.params.doctorId);
    const { day, time } = req.body;

     // Check if day is Sunday
     if (day==="Sunday") {
        return res.status(400).json({ error: "Appointments cannot be booked on Sunday" });
    }
    

    // Check if day and time are provided
    if (!day || !time) {
        return res.status(400).json({ error: "Both day and time must be provided" });
    }

    // Check if the doctor exists
    const doctor = doctors.find(doctor => doctor.id === doctorId);
    if (!doctor) {
        return res.status(404).json({ error: "Doctor not found" });
    }

    // Check if the provided day is valid
    const doctorAvailability = availability[doctorId] || {};
    const availableDays = Object.keys(doctorAvailability);
    if (!availableDays.includes(day)) {
        return res.status(400).json({ error: "Requested day is not available" });
    }

    // Check if the provided time slot is available on the requested day
    const availableTimes = doctorAvailability[day];
    if (!availableTimes.includes(time)) {
        return res.status(400).json({ error: "Requested time slot is not available on the requested day" });
    }

    // Remove the booked time slot from availability so that is is no longer available to book
     if (availability[doctorId] && availability[doctorId][day]) {
    const index = availability[doctorId][day].indexOf(time);
    if (index !== -1) {
        availability[doctorId][day].splice(index, 1);
    }
   }


    // Book the appointment
    appointments.push({ doctorId, day, time });
    res.json({ message: "Appointment booked successfully" });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});