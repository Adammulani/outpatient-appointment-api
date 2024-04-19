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


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});