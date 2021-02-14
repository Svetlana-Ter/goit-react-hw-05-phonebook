import styles from './Contact.module.css';
import PropTypes from 'prop-types';

function Contact({ contacts = [], onDeleteContact }) {
  return contacts.map(({ id, name, number }) => (
    <li key={id} className={styles.listItem}>
      <h2 className={styles.name}>{name}:</h2>
      <p className={styles.number}>{number}</p>
      <button className={styles.btn} onClick={() => onDeleteContact(id)}>
        Delete
      </button>
    </li>
  ));
}

export default Contact;

Contact.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      number: PropTypes.string,
      id: PropTypes.string.isRequired,
    })
  ),
  onDeleteContact: PropTypes.func,
};
