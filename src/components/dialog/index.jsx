import PropTypes from 'prop-types';
import './style.scss';

function Dialog({ dialog }) {
  return (
    <div className="dialog">
      <div className="dialog__container">
        {dialog.map((line, index) => {
          return (
            <p
              key={index}
              className={
                line.isNarrator ? 'dialog--narrator' : 'dialog--character'
              }
            >
              {line.text}
            </p>
          );
        })}
      </div>
    </div>
  );
}

Dialog.propTypes = {
  dialog: PropTypes.arrayOf(
    PropTypes.shape({
      isNarrator: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Dialog;
