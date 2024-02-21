import React from 'react';
import styles from './styles.module.css';
export const Filter = ({ filter, onChange }) => {
  return (
    <label className={styles.label}>
      <span>Fined company by name</span>
      <input
        value={filter}
        type="text"
        name="filter"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        onChange={onChange}
      />
    </label>
  );
};
