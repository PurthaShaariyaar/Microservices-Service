import React from 'react';

const ListDescriptions = ({ descriptions }) => {
  const renderedDescriptions = descriptions.map(description => {
    return (
      <li key={description.id}>
        {description.description}
      </li>
    );
  });

  return (
    <ul>
      {renderedDescriptions}
    </ul>
  );
}

export default ListDescriptions;
