import React from 'react';

const Persons = (props) => {
  const { personsToShow, deletePerson } = props;
  return (
    <div>
      {personsToShow.map((person) => (
        <div key={person.name}>
          {person.name}
          {' '}
          {person.number}
          <button type="button" onClick={deletePerson(person)}>delete</button>
        </div>
      ))}
    </div>
  );
};

export default Persons;
