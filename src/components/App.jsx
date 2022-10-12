import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
const shortid = require('shortid');

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    setContacts(
      localStorage.getItem('contacts')
        ? JSON.parse(localStorage.getItem('contacts'))
        : []
    );
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  // componentDidMount() {
  //   this.setState({
  //     contacts: localStorage.getItem('contacts')
  //       ? JSON.parse(localStorage.getItem('contacts'))
  //       : [],
  //   });
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.contacts !== this.state.contacts) {
  //     localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  //   }
  // }

  const addContact = (name, number) => {
    const isNameInList = contacts.find(
      item => item.name.toLowerCase() === name.toLowerCase()
    );
    if (isNameInList !== undefined) {
      return alert(`Contact ${isNameInList.name} is already in your list !`);
    }
    const newContact = {
      id: shortid.generate(),
      name,
      number,
    };
    // this.setState(prevState => ({
    //   contacts: [newContact, ...prevState.contacts],
    // }));
    setContacts(prevContacts => [newContact, ...prevContacts]);
  };

  const deleteContact = contactId => {
    // this.setState(prevState => ({
    //   contacts: prevState.contacts.filter(item => item.id !== contactId),
    // }));
    setContacts(prevContacts =>
      prevContacts.filter(item => item.id !== contactId)
    );
  };

  const onFilterChange = data => {
    // this.setState({
    //   filter: data,
    // });
    setFilter(data);
  };

  const normalizeFilterField = filter.toLowerCase();
  const visibleContacts = contacts.filter(item =>
    item.name.toLowerCase().includes(normalizeFilterField)
  );
  return (
    <>
      <h1>PhoneBook</h1>
      <ContactForm onSubmit={addContact} />
      <Filter value={filter} onFilterChange={onFilterChange} />
      {contacts.length ? (
        <ContactList contactsList={visibleContacts} onDelete={deleteContact} />
      ) : (
        <p>No Contacts Yet ^_^</p>
      )}
    </>
  );
};

// export default App;
