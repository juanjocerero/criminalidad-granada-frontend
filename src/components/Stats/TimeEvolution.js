import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import MobileDetect from 'mobile-detect';
import { startOfDay, getDate, getYear, getMonth, format } from 'date-fns';
import es from 'date-fns/locale/es';
import { groupBy, forOwn, first } from 'lodash';
import { Typography, Tooltip } from 'antd';

import '../../css/Stats/TimeEvolution.scss';
import '../../css/common.scss';

const md = new MobileDetect(window.navigator.userAgent);
const { Title, Text } = Typography;

const formatDateForAxis = date => {
  const year = getYear(date);
  const month = ((getMonth(date))+1).toLocaleString('es-ES', { minimumIntegerDigits: 2 });
  const day = ((getDate(date))+1).toLocaleString('es-ES', { minimumIntegerDigits: 2 });
  
  return `${year}-${month}-${day}`;
};

const byDay = crimes => {
  const withStartOfDay = crimes.map(crime => {
    crime.startOfDay = startOfDay(crime.date);
    crime.startOfDayString = formatDateForAxis(startOfDay(crime.date));
    // crime.startOfDayString = `${getYear(startOfDay(crime.date))}-${getMonth(startOfDay(crime.date)).toLocaleString()}-${(getDate(startOfDay(crime.date))+1).toLocaleString()}`;
    return crime;
  });
  const orderedbyDate = withStartOfDay.sort((a, b) => b.startOfDay - a.startOfDay);
  const byStartOfDay = groupBy(orderedbyDate, crime => crime.startOfDayString);
  
  const result = [{ id: 'date', color: '#b90021', data: [] }];
  
  forOwn(byStartOfDay, (data, day) => {
    first(result).data.push({ x: day, y: data.length });
  });
  
  return result.sort((a, b) => b.x - a.x);
};

const getTooltip = data => {
  const day = ((getDate(data.x))+1).toLocaleString('es-ES', { minimumIntegerDigits: 1 });
  const month = format(data.x, 'MMM', { locale: es });
  const year = getYear(data.x);
  
  return {
    date: `${day} de ${month} de ${year}`,
    delitos: `${data.y < 2 ? `${data.y} delito` : `${data.y} delitos`}`
  };
};

const TimeEvolution = ({ questionNumber, crimenes }) => {
  
  return (
    <>
    <div className="apply-flex-center">
    
    <Title level={3} className="question-title">{questionNumber}. ¿Cuándo se producen?</Title>
    
    <div className="time-chart-container">
    {/* TODO: add custom tooltip function */}
    <ResponsiveLine 
    data={byDay(crimenes)} 
    animate={false} 
    colors={['#f22e52']} 
    margin={md.mobile() ? { top: 30, right: 10, bottom: 100, left: 30 } : { top: 80, right: 50, bottom: 100, left: 50 }} 
    curve="catmullRom" 
    lineWidth={md.mobile() ? 2 : 4} 
    enableGridX={md.mobile() ? false : true}
    enableGridY={md.mobile() ? false : true}
    isInteractive={true}
    xScale={{ type: 'time', format: '%Y-%m-%d', precision: 'day' }}
    xFormat="time:%d-%m"
    yScale={{ type: 'linear', min: 0 }}
    axisLeft={{
      legend: 'crímenes',
      tickValues: 5,
      tickSize: 0,
      legendOffset: md.mobile() ? 10 : -30
    }}
    axisBottom={{
      legend: 'fecha',
      // format: '%b %d',
      format: (dateString) => {
        const dateObject = new Date(dateString);
        const month = format(dateObject, 'MMM', { locale: es });
        const day = getDate(dateObject);
        return `${day} ${month}`;
      },
      // tickValues: 'every week',
      legendOffset: -12,
      tickRotation: md.mobile() ? 0 : -36,
      tickSize: 0,
      tickValues: 6,
      tickPadding: 12
    }}
    enablePointLabel={false}
    pointSize={md.mobile() ? 0 : 10}
    pointBorderWidth={1}
    pointBorderColor={{ from: 'color', modifiers: [['darker', 0.3]] }}
    useMesh={true}
    enableSlices={false}
    theme={{
      grid: {
        line: { stroke: '#92a6a6', strokeWidth: 1 }
      }
    }} 
    tooltip={(seriesData) => <Tooltip title={getTooltip(seriesData.point.data).date} className="time-chart-tooltip" visible={true}>
    <Text className="white-text text-bold">{ getTooltip(seriesData.point.data).delitos }</Text>
    </Tooltip>
  }
  />
  
  </div>
  
  </div>
  </>
  )
};

export default TimeEvolution;
