// src/components/Input/Input.jsx
import PropTypes from 'prop-types';
import styles from './Input.module.css';

export const Input = ({
  label,
  id,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder,
  required = false,
  disabled = false,
  error = '',
  size = 'md',
  className = '',
  ...props
}) => {
  const inputClasses = [
    styles.Input,
    error && styles['Input--error'],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const groupClasses = [
    styles.InputGroup,
    styles[`InputGroup--${size}`],
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={groupClasses}>
      {label && (
        <label 
          htmlFor={id} 
          className={required ? styles['Label--required'] : styles.Label}
        >
          {label}
        </label>
      )}
      
      <input
        id={id}
        name={name}
        type={type}
        className={inputClasses}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        {...props}
      />
      
      {error && <span className={styles.Error}>{error}</span>}
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.oneOf(['text', 'email', 'password', 'number', 'date', 'textarea']),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
};

Input.defaultProps = {
  type: 'text',
  required: false,
  disabled: false,
  error: '',
  size: 'md',
  className: '',
};