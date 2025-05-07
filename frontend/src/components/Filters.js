import { useState } from "react";
import { Form, Button,Alert, Row, Col, Card } from "react-bootstrap";
import axios from "axios";

const Filters = ({ onFilter }) => {
  const [specialty, setSpecialty] = useState("");
  const [minRating, setMinRating] = useState("");
  const [maxFee, setMaxFee] = useState("");

   // State for adding a new doctor
   const [name, setName] = useState("");
   const [doctorSpecialty, setDoctorSpecialty] = useState("");
   const [experience, setExperience] = useState("");
   const [rating, setRating] = useState("");
   const [consultationFee, setConsultationFee] = useState("");
   const [location, setLocation] = useState("");
   const [error, setError] = useState(null);
   const [success, setSuccess] = useState(null);
 
   // State for toggling the visibility of the Add Doctor form
   const [showAddDoctorForm, setShowAddDoctorForm] = useState(false);
 
  
 
   const handleAddDoctor = async (e) => {
     e.preventDefault();
     try {
       const doctorData = {
         name,
         specialty: doctorSpecialty,
         experience,
         rating,
         consultationFee,
         location,
       };
 
       await axios.post("http://localhost:5000/api/doctors", doctorData);
 
       setSuccess("Doctor added successfully!");
       setError(null);
 
       // Reset the form for adding doctor
       setName("");
       setDoctorSpecialty("");
       setExperience("");
       setRating("");
       setConsultationFee("");
       setLocation("");
     } catch (err) {
       setError("Failed to add doctor. Please try again.");
       setSuccess(null);
     }
   };



  const handleFilter = () => {
    onFilter({ specialty, minRating, maxFee });
  };


  return (
    <>
    <Card className="mb-4 shadow-sm">
      <Card.Header><strong>Filter Doctors</strong></Card.Header>
      <Card.Body>
        <Form>
          <Row className="mb-3">
            <Col md={4}>
              <Form.Group controlId="formSpecialty">
                <Form.Label>Specialty</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Specialty"
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="formMinRating">
                <Form.Label>Min Rating</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Min Rating"
                  value={minRating}
                  onChange={(e) => setMinRating(e.target.value)}
                  min="0"
                  max="5"
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="formMaxFee">
                <Form.Label>Max Fee (₹)</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Max Fee"
                  value={maxFee}
                  onChange={(e) => setMaxFee(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Button  variant="primary" onClick={handleFilter}>
            Apply Filters
          </Button>
          <Button 
                variant="success" 
                style={{margin: "10px"}}
                onClick={() => setShowAddDoctorForm(!showAddDoctorForm)}
            >
                {showAddDoctorForm ? "Cancel" : "Add Doctor"}
            </Button>
          
        </Form>
      </Card.Body>
    </Card>
    <Card style={{marginBottom: "15px"}}>
      {showAddDoctorForm && (
        <Card.Body>
          <h3 className="mt-4">Add New Doctor</h3>

          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Form onSubmit={handleAddDoctor}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter doctor's name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Specialty</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter doctor's specialty"
                value={doctorSpecialty}
                onChange={(e) => setDoctorSpecialty(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Experience (Years)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter years of experience"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group>
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

            <Form.Group>
              <Form.Label>Consultation Fee (₹)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter consultation fee"
                value={consultationFee}
                onChange={(e) => setConsultationFee(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group>
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
        </Card.Body>
      )}
    </Card>
    </>
  );
};

export default Filters;
