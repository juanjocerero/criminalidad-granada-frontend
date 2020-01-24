import React from 'react';
import TimeAgo from 'timeago-react';
import * as timeago from 'timeago.js';

// https://github.com/hustcc/timeago-react/issues/27
import es from 'timeago.js/lib/lang/es';

import '../css/CrimeTooltip.scss';
import '../css/common.scss';

const CrimeTooltip = ({ text, date }) => {

  timeago.register('es', es);
  
  return (
    <div className="crimen-tooltip-container">
      <TimeAgo datetime={date} locale="es" className="time-ago display-block" />
      { text }
      <div className="more-info">
        (Pinche o pulse para ver más información)
      </div>
    </div>
  );
}

export default CrimeTooltip;
