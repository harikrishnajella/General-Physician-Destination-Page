import { useEffect, useState } from "react";
import axios from "axios";
import Filters from "./Filters";
import DoctorCard from "./DoctorCard";
import { Container, Row, Col, Alert } from "react-bootstrap";

const DestinationPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [query, setQuery] = useState({});
  const [error, setError] = useState(null);

  const fetchDoctors = async (filters = {}) => {
    try {
      const params = new URLSearchParams(filters).toString();
      const res = await axios.get(`http://localhost:5000/api/doctors?${params}`);
      setDoctors(res.data.doctors);
      setError(null);
    } catch (err) {
      setError("Failed to fetch doctors. Please try again.");
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <Container className="mt-4">
      <h1 className="mb-4 text-center">Apollo 24/7 – General Physicians</h1>
      
      <Filters onFilter={(f) => { setQuery(f); fetchDoctors(f); }} />

      {error && <Alert variant="danger">{error}</Alert>}

      <Row>
        {doctors.map((doctor) => (
          <Col key={doctor._id} md={6} lg={4} className="mb-4">
            <DoctorCard doctor={doctor} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default DestinationPage;
