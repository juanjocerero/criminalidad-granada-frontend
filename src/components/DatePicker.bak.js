import React from 'react';
import { DatePicker } from 'antd';
import * as moment from 'moment';
import 'moment/locale/es';
import locale from 'antd/es/date-picker/locale/es_ES';

// TODO: Refactor this as two different selectors
// since the current one doesn't fit in a smartphone screen
const { RangePicker } = DatePicker;

const onDatePickerChange = (dates, dateStrings) => {
  console.log('dates', dates);
  console.log('dateStrings', dateStrings);
};

const DateRangePicker = () => {

  return (
    <>
    <RangePicker 
    className="crime-date-picker" 
    locale={locale} 
    ranges={{

    }}
    format="DD/MM/YYYY"
    onChange={onDatePickerChange}
    style={{ marginTop: '1rem' }}
     />
    </>
  );

};

export default DateRangePicker;
