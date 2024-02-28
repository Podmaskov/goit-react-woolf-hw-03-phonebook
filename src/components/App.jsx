import React, { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { nanoid } from 'nanoid';
import { setLocalStorage, getLocalStorage } from '../helpers/localStorage';

import styles from './styles.module.css';

const LS_KEY = 'contacts';
export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidUpdate(_, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      setLocalStorage(LS_KEY, this.state.contacts);
    }
  }

  componentDidMount() {
    const contacts = getLocalStorage(LS_KEY);
    if (contacts && contacts.length > 0) {
      this.setState({ contacts });
    }
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  checkNameDuplicate = name => {
    return this.state.contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
  };

  addContact = ({ name, number }) => {
    if (this.checkNameDuplicate(name)) {
      alert(`${name} is already in contacts`);
      return;
    }
    this.setState(prevState => {
      return {
        contacts: [
          {
            id: nanoid(),
            name,
            number,
          },
          ...prevState.contacts,
        ],
      };
    });
  };

  deleteContact = id => {
    this.setState(prevState => {
      const restContacts = prevState.contacts.filter(
        contact => contact.id !== id
      );
      setLocalStorage(LS_KEY, restContacts);
      return {
        contacts: restContacts,
      };
    });
  };

  filteredContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };
  render() {
    const filteredContacts = this.filteredContacts();
    return (
      <div className={styles['main-container']}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />
        <h2>Contacts</h2>
        <Filter filter={this.state.filter} onChange={this.handleInputChange} />
        <ContactList
          contacts={filteredContacts}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
