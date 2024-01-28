import React, { useState } from 'react';
import axios from 'axios';

const CreateDescription = ({ serviceId }) => {

  const [description, setDescription] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();

    await axios.post(`http://localhost:4001/services/${serviceId}/descriptions`, {
      description
    });

    setDescription('');
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className='form-group py-2'>
          <label>Description</label>
          <input
            className='form-control'
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
        <button className='btn btn-primary'>Submit</button>
      </form>
    </div>
  );
}

export default CreateDescription;
