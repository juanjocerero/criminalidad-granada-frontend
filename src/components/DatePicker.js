import React, { useState } from 'react';
import { DatePicker } from 'antd';
import * as moment from 'moment';
import 'moment/locale/es';
import locale from 'antd/es/date-picker/locale/es_ES';

import '../css/DatePicker.scss';

const DateRangePicker = () => {

  const [startValue, setStartValue] = useState();
  const [endValue, setEndValue] = useState();
  const [endOpen, setEndOpen] = useState(false);

  const disabledStartDate = startValue => {
    if (!startValue || !endValue) {
      return false;
    } 
    return startValue.valueOf() > endValue.valueOf();
  };

  const disabledEndDate = endValue => {
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  };

  const handleStartOpenChange = open => {
    if (!open) {
      setEndOpen(true);
    }
  };

  const handleEndOpenChange = open => {
    setEndOpen(open);
  }

  const onStartChange = value => {
    setStartValue(value);
  };
  const onEndChange = value => {
    setEndValue(value);
  };

  return (
    <>
    <DatePicker 
    className="date-picker" 
    locale={locale} 
    disabledDate={disabledStartDate} 
    format="DD/MM/YYYY" 
    value={startValue}
    placeholder="Inicio" 
    onChange={onStartChange} 
    onOpenChange={handleStartOpenChange} 
    />

    <DatePicker 
    className="date-picker" 
    locale={locale} 
    disabledDate={disabledEndDate} 
    format="DD/MM/YYYY" 
    value={endValue} 
    placeholder="Final" 
    onChange={onEndChange} 
    onOpenChange={handleEndOpenChange} 
    />
    </>
  );
};

export default DateRangePicker;
