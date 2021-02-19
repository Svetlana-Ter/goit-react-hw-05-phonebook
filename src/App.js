import React from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import Form from './components/Form/Form';
import ContactsList from './components/ContactsList/ContactsList';
import Filter from './components/Filter/Filter';
import styles from './App.module.css';
import { CSSTransition } from 'react-transition-group';
import Logo from './components/Logo/Logo';
import Error from './components/Error/Error';

class App extends React.Component {
  static defaultProps = {
    contacts: [],
    filter: '',
    repeatingName: '',
  };

  static propTypes = {
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        number: PropTypes.string,
        id: PropTypes.string.isRequired,
      })
    ),
    filter: PropTypes.string,
    repeatingName: PropTypes.string,
  };

  state = {
    contacts: this.props.contacts,
    filter: this.props.filter,
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = data => {
    const namesArray = this.state.contacts.map(contact => contact.name);
    if (namesArray.includes(data.name)) {
      this.setState({ repeatingName: data.name });
      setTimeout(() => {
        this.setState({ repeatingName: '' });
      }, 3000);
      return;
    } else if (data.name && data.number) {
      const contact = {
        id: shortid.generate(),
        name: data.name,
        number: data.number,
      };
      this.setState(prevState => ({
        contacts: [...prevState.contacts, contact],
      }));
    }
  };

  filterContacts = e => {
    this.setState({
      filter: e.target.value,
    });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
    if (this.state.filter) {
      this.setState({
        filter: '',
      });
    }
  };

  render() {
    const { filter, repeatingName, contacts } = this.state;
    const filteredContacts = this.getFilteredContacts();
    return (
      <>
        <CSSTransition
          in={repeatingName}
          timeout={250}
          classNames={{
            enter: styles.errorEnter,
            enterActive: styles.errorEnterActive,
            exit: styles.errorExit,
            exitActive: styles.errorExitActive,
          }}
          unmountOnExit
        >
          <Error name={repeatingName} />
        </CSSTransition>

        <CSSTransition in={true} appear={true} timeout={500} classNames={styles} unmountOnExit>
          <Logo />
        </CSSTransition>

        <Form onSubmit={this.addContact} />

        <CSSTransition in={contacts.length > 0} timeout={250} classNames={styles} unmountOnExit>
          <h2 className={styles.subtitle}>Contacts</h2>
        </CSSTransition>

        <CSSTransition in={contacts.length > 1} timeout={250} classNames={styles} unmountOnExit>
          <Filter value={filter} onChange={this.filterContacts} />
        </CSSTransition>

        <ContactsList contacts={filteredContacts} onDeleteContact={this.deleteContact} />
      </>
    );
  }
}

export default App;
