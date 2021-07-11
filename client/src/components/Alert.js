import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from '../css/alert.module.css';

const Alert = ({ alerts }) => {
  const getAlertClass = (alertType) => {
    if (alertType === 'danger') {
      return styles.alertDanger;
    }

    return styles.alertSuccess;
  };

  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => (
      <div key={alert.id} className={getAlertClass(alert.alertType)}>
        {alert.msg}
      </div>
    ))
  );
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({ alerts: state.alert });

export default connect(mapStateToProps)(Alert);
