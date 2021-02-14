import styles from './Filter.module.css';
import shortid from 'shortid';
import PropTypes from 'prop-types';

function Filter({ value = '', onChange }) {
  const filterId = shortid.generate();
  return (
    <div className={styles.inputBlock}>
      <label htmlFor={filterId}>Find contacts by name</label>
      <input
        className={styles.inputField}
        value={value}
        onChange={onChange}
        id={filterId}
      />
    </div>
  );
}

export default Filter;

Filter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};
