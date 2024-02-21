import React from 'react';
import { ContactListItem } from '../ContactListItem/ContactListItem';
import styles from './styles.module.css';

export const ContactList = ({ contacts, deleteContact }) => {
  return (
    <ul className={styles.list}>
      {contacts.map(contact => (
        <ContactListItem
          key={contact.id}
          contact={contact}
          deleteContact={deleteContact}
        />
      ))}
    </ul>
  );
};
