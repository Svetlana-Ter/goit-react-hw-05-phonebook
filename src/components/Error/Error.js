import styles from './Error.module.css';
import PropTypes from 'prop-types';
export default function Error({ name }) {
  return (
    <div className={styles.errorWrap}>
      <h2 className={styles.errorText}>
        {name} is already in Phonebook. <br />
        Add another number.
      </h2>
    </div>
  );
}

Error.propTypes = {
  name: PropTypes.string,
};
