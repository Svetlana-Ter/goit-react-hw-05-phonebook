import React from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import styles from './Form.module.css';

class Form extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    number: PropTypes.string,
    onSubmit: PropTypes.func,
  };
  state = {
    name: '',
    number: '',
  };

  nameId = shortid.generate();
  numberId = shortid.generate();

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = event => {
    const { onSubmit } = this.props;
    event.preventDefault();
    onSubmit(this.state);
    this.reset();
  };

  reset = () => {
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    const { name, number } = this.state;
    return (
      <form className={styles.form} onSubmit={this.handleSubmit}>
        <label htmlFor='nameId'>Name</label>
        <input
          className={styles.inputField}
          name='name'
          type='text'
          value={name}
          onChange={this.handleInputChange}
          id='nameId'
        />
        <label htmlFor='numberId'>Number</label>
        <input
          className={styles.inputField}
          name='number'
          type='text'
          value={number}
          onChange={this.handleInputChange}
          id='numberId'
        />
        <button type='submit' className={styles.btn}>
          Add contact
        </button>
      </form>
    );
  }
}

export default Form;
