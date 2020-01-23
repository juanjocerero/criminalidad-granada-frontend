import React from 'react';
import { Card } from 'antd';

import '../css/CrimePopup.scss';

const CrimePopup = ({ crimen }) => {

  console.log(crimen);

  return (
    <Card className="crimen-popup" bordered={false}>
      <div className="text">
        { crimen.texto }
      </div>
    </Card>
  );

};

export default CrimePopup;
