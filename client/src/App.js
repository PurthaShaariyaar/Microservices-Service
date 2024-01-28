import React from 'react';
import CreateService from './components/CreateService';
import ListServices from './components/ListServices';

const App = () => {
  return (
    <div className='container'>
      <h1>Create a Service</h1>
      <CreateService />
      <hr />
      <h1>Services</h1>
      <ListServices />
    </div>
  );
}

export default App;
