import React from 'react';
import styles from './styles.module.css';

export const ContactListItem = ({ contact, deleteContact }) => {
  return (
    <li key={contact.id}>
      <div className={styles['item-container']}>
        <span>{`${contact.name}: ${contact.number}`}</span>
        <button
          className={styles.btn}
          type="button"
          onClick={() => deleteContact(contact.id)}
        >
          Delete
        </button>
      </div>
    </li>
  );
};
