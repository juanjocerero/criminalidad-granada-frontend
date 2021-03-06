import React, { useState, useContext } from 'react';
import { DatePicker } from 'antd';
// eslint-disable-next-line no-unused-vars
import * as moment from 'moment';
import 'moment/locale/es';
import locale from 'antd/es/date-picker/locale/es_ES';

import { QueryContext } from './QueryContext';

import '../../css/Map/DatePicker.scss';

const DateRangePicker = () => {
  
  const { stateStartDate, stateEndDate } = useContext(QueryContext);
  const [startDate, setStartDate] = stateStartDate;
  const [endDate, setEndDate] = stateEndDate;
  
  const [startValue, setStartValue] = useState();
  const [endValue, setEndValue] = useState();
  // eslint-disable-next-line no-unused-vars
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
    setStartDate(value);
  };
  const onEndChange = value => {
    setEndValue(value);
    setEndDate(value);
  };
  
  return (
    <>
    <DatePicker 
    className="date-picker" 
    locale={locale} 
    disabledDate={disabledStartDate} 
    format="DD/MM/YYYY" 
    value={startDate}
    placeholder="Inicio" 
    onChange={onStartChange} 
    onOpenChange={handleStartOpenChange} 
    />
    
    <DatePicker 
    className="date-picker" 
    locale={locale} 
    disabledDate={disabledEndDate} 
    format="DD/MM/YYYY" 
    value={endDate} 
    placeholder="Final" 
    onChange={onEndChange} 
    onOpenChange={handleEndOpenChange} 
    />
    </>
    );
  };
  
  export default DateRangePicker;
  