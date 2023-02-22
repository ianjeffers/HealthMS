import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Allergies.css';
import { Button } from 'react-bootstrap';
import { addAllergy } from '../actions/allergies';
import { useAuth0 } from "@auth0/auth0-react";


const Allergy = () => {
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');
  const [intensity, setIntensity] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  
  const { user, isAuthenticated } = useAuth0();
  const [userID, setUserID] = useState(user ? user.sub : null);

  const handleSubmit = (event) => {
    event.preventDefault();
    addAllergy({ type, category, intensity, date, notes, userID })
    setType('');
    setCategory('');
    setIntensity('');
    setDate('');
    setNotes('');
  }

  return (
    <div className="Allergy">
      <h1>Allergy</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Type:
          <input type="text" name="type" value={type} onChange={(event) => setType(event.target.value)} />
        </label>
        <label>
          Category:
          <input type="text" name="category" value={category} onChange={(event) => setCategory(event.target.value)} />
        </label>
        <label>
          Intensity:
          <input type="number" name="intensity" value={intensity} onChange={(event) => setIntensity(event.target.value)} />
        </label>
        <label>
          Date:
          <input type="date" name="date" value={date} onChange={(event) => setDate(event.target.value)} />
        </label>

        <Button variant="primary" type="submit">
                            Submit
                        </Button>

      </form>

      <Link to="/">Home</Link>

    </div>

  );
}


export default Allergy;