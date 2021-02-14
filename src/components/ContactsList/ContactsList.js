import Contact from '../Contact/Contact';

function ContactsList({ contacts, onDeleteContact }) {
  return (
    <ul>
      <Contact contacts={contacts} onDeleteContact={onDeleteContact} />
    </ul>
  );
}

export default ContactsList;
