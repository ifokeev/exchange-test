import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const Rate = ({ exchangeRate }) => {
  if (!exchangeRate) {
    return null;
  }

  return (
    <div className="rate">
      1 {exchangeRate.currencyFrom} = {exchangeRate.value} {exchangeRate.currencyTo}
    </div>
  );
};

Rate.propTypes = {
  exchangeRate: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  exchangeRate: state.runtime.exchangeRate,
});

export default connect(mapStateToProps)(Rate);
