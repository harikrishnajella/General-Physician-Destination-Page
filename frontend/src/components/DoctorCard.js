import React from 'react';
import { Card, Table } from 'react-bootstrap';

const DoctorCard = ({ doctor }) => (
  <Card className="mb-3 shadow-sm">
    <Card.Body>
      <Card.Title className="text-primary">{doctor.name}</Card.Title>
      <Table bordered size="sm" responsive className="mb-0">
        <tbody>
          <tr>
            <th>Specialty</th>
            <td>{doctor.specialty}</td>
          </tr>
          <tr>
            <th>Rating</th>
            <td>{doctor.rating}</td>
          </tr>
          <tr>
            <th>Consultation Fee</th>
            <td>₹{doctor.consultationFee}</td>
          </tr>
          <tr>
            <th>Location</th>
            <td>{doctor.location}</td>
          </tr>
        </tbody>
      </Table>
    </Card.Body>
  </Card>
);

export default DoctorCard;
