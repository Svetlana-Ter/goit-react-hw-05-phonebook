import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Contact from '../Contact/Contact';
import styles from './ContactsList.module.css';

function ContactsList({ contacts, onDeleteContact }) {
  return (
    <TransitionGroup className={styles.contactsList} component='ul'>
      {contacts.map(contact => (
        <CSSTransition key={contact.id} timeout={250} classNames={styles}>
          <Contact contact={contact} onDeleteContact={onDeleteContact} />
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
}

export default ContactsList;
