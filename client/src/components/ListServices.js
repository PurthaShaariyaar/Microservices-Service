import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListServices = () => {
  const [services, setServices] = useState({});

  const fetchTasks = async () => {
    const res = await axios.get('http://localhost:4002/services');
    console.log(res.data);
    setServices(res.data);
  }

  useEffect(() => {
    fetchTasks();
  }, [])

  const renderedServices = Object.values(services).map((service) => {
    return (
      <div
        className='card'
        style={{ width: '30%', marginBottom: '20px' }}
        key={service.id}
      >
        <div className='card-body'>
          {service.name}
        </div>
      </div>
    );
  });

  return (
    <div className='d-flex flex-row flex-wrap justify-content-between'>
      {renderedServices}
    </div>
  )
}

export default ListServices;
