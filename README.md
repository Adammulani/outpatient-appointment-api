# Outpatient Appointment System API

This Node.js & Express API provides endpoints for managing outpatient appointments. It includes functionalities for listing doctors, checking availability, and booking appointments.

## Installation

1. Clone the repository.
2. Install dependencies with `npm install`.
3. Start the server with `node app.js`.

## Endpoints

- `GET /doctors`: Get a list of all doctors.
- `GET /doctor/:doctorId`: Get details of a specific doctor.
- `GET /doctor/:doctorId/availability`: Check availability for a specific doctor.
- `POST /doctor/:doctorId/book-appointment`: Book an appointment for a specific doctor.

## Dummy Data

Dummy data for 5 doctors and their availability is included in the code.

## Usage

You can test the API endpoints using tools like Postman.

