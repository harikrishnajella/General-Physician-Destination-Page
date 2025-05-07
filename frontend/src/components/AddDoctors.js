import { useState } from "react";
import axios from "axios";
import { Form, Button, Alert } from "react-bootstrap";

const AddDoctorForm = () => {
  const [name, setName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [experience, setExperience] = useState("");
  const [rating, setRating] = useState("");
  const [consultationFee, setConsultationFee] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const doctorData = {
        name,
        specialty,
        experience,
        rating,
        consultationFee,
        location,
      };

      const res = await axios.post("http://localhost:5000/api/doctors", doctorData);
      
      setSuccess("Doctor added successfully!");
      setError(null);
      
      // Reset form fields
      setName("");
      setSpecialty("");
      setExperience("");
      setRating("");
      setConsultationFee("");
      setLocation("");
    } catch (err) {
      setError("Failed to add doctor. Please try again.");
      setSuccess(null);
    }
  };

  return (
    <div>
      <h3>Add New Doctor</h3>
      
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter doctor's name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formSpecialty">
          <Form.Label>Specialty</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter doctor's specialty"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formExperience">
          <Form.Label>Experience (Years)</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter years of experience"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formRating">
          <Form.Label>Rating</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter doctor's rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
            min="0"
            max="5"
          />
        </Form.Group>

        <Form.Group controlId="formFee">
          <Form.Label>Consultation Fee (₹)</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter consultation fee"
            value={consultationFee}
            onChange={(e) => setConsultationFee(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formLocation">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Add Doctor
        </Button>
      </Form>
    </div>
  );
};

export default AddDoctorForm;
