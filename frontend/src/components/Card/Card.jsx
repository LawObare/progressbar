// src/components/Card/Card.jsx
import PropTypes from 'prop-types';
import styles from './Card.module.css';

export const Card = ({
  variant = 'default',
  padding = 'md',
  children,
  className = '',
  onClick,
  ...props
}) => {
  const isClickable = typeof onClick === 'function';

  const classNames = [
    styles.Card,
    styles[`Card--${variant}`],
    styles[`Card--padding-${padding}`],
    isClickable && styles['Card--clickable'],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={classNames}
      onClick={onClick}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={isClickable ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(e);
        }
      } : undefined}
      {...props}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  variant: PropTypes.oneOf(['default', 'outlined', 'elevated']),
  padding: PropTypes.oneOf(['none', 'sm', 'md', 'lg']),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

Card.defaultProps = {
  variant: 'default',
  padding: 'md',
  className: '',
};
