import React, { useState } from 'react';
import axios from 'axios';

const CreateService = () => {

  const [name, setName] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();

    await axios.post('http://localhost:4000/services', {
      name
    });

    setName('');
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className='form-group py-2'>
          <label>Name</label>
          <input
            className='form-control'
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <button className='btn btn-primary'>Submit</button>
      </form>
    </div>
  );
}

export default CreateService;
