import React, { Component } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
const shortid = require('shortid');

export class App extends Component {
  state = {
    contacts: [
      // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    this.setState({
      contacts: localStorage.getItem('contacts')
        ? JSON.parse(localStorage.getItem('contacts'))
        : [],
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = (name, number) => {
    const isNameInList = this.state.contacts.find(
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
    this.setState(prevState => ({
      contacts: [newContact, ...prevState.contacts],
    }));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(item => item.id !== contactId),
    }));
  };

  onFilterChange = data => {
    this.setState({
      filter: data,
    });
  };

  render() {
    const { filter, contacts } = this.state;
    const normalizeFilterField = filter.toLowerCase();
    const visibleContacts = contacts.filter(item =>
      item.name.toLowerCase().includes(normalizeFilterField)
    );
    return (
      <>
        <h1>PhoneBook</h1>
        <ContactForm onSubmit={this.addContact} />
        <Filter value={filter} onFilterChange={this.onFilterChange} />
        {this.state.contacts.length ? (
          <ContactList
            contactsList={visibleContacts}
            onDelete={this.deleteContact}
          />
        ) : (
          <p>No Contacts Yet ^_^</p>
        )}
      </>
    );
  }
}
