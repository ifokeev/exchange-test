import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';

const LoadingButton = ({ loading, dispatch, children, ...restProps }) => (
  <Button {...restProps} loading={loading}>
    {children}
  </Button>
);

LoadingButton.propTypes = {
  loading: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
};

LoadingButton.defaultProps = {
  loading: false,
};

const mapStateToProps = state => ({ loading: state.runtime.loading });

export default connect(mapStateToProps)(LoadingButton);
