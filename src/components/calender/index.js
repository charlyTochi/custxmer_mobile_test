import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import moment from 'moment';
import {DEVICE_HEIGHT, Colors} from '../../constants';

export default function DatePicker(props) {
  const _currentMonth = props.value
    ? moment(props.value).format('YYYY-MM')
    : moment().format('YYYY-MM');
  const _currentYear = moment().format('YYYY');

  const [currentMonth, setCurrentMonth] = useState(_currentMonth);
  const [weekdays, setWeekdays] = useState();
  const [yearSelectVisible, setYearSelectVisible] = useState(false);

  useEffect(() => {
    getAllDays();
  }, [currentMonth]);

  const getAllDays = () => {
    const _weekdays = [
      ['Sun'],
      ['Mon'],
      ['Tue'],
      ['Wed'],
      ['Thu'],
      ['Fri'],
      ['Sat'],
    ];

    const firstDayOfMonth = moment(currentMonth + '01', 'YYYY-MM-DD');
    const totalDaysInMonth = moment(currentMonth, 'YYYY-MM').daysInMonth();
    const lastDayOfMonth = moment(
      currentMonth + totalDaysInMonth,
      'YYYY-MM-DD',
    );

    const weekdayOfFirst = firstDayOfMonth.isoWeekday();
    const weekdayOfLast = lastDayOfMonth.isoWeekday();

    let dateStart = firstDayOfMonth;
    let dateEnd = lastDayOfMonth;

    if (weekdayOfFirst !== 7) {
      dateStart.subtract(weekdayOfFirst, 'days');
    }

    if (weekdayOfLast === 7) {
      dateEnd.add(6, 'days');
    }

    if (weekdayOfLast < 6) {
      dateEnd.add(6 - weekdayOfLast, 'days');
    }

    while (dateEnd.diff(dateStart, 'days') >= 0) {
      if (dateStart.isoWeekday() === 7) {
        _weekdays[0].push(dateStart.format('YYYY-MM-DD'));
      } else if (dateStart.isoWeekday() === 1) {
        _weekdays[1].push(dateStart.format('YYYY-MM-DD'));
      } else if (dateStart.isoWeekday() === 2) {
        _weekdays[2].push(dateStart.format('YYYY-MM-DD'));
      } else if (dateStart.isoWeekday() === 3) {
        _weekdays[3].push(dateStart.format('YYYY-MM-DD'));
      } else if (dateStart.isoWeekday() === 4) {
        _weekdays[4].push(dateStart.format('YYYY-MM-DD'));
      } else if (dateStart.isoWeekday() === 5) {
        _weekdays[5].push(dateStart.format('YYYY-MM-DD'));
      } else {
        _weekdays[6].push(dateStart.format('YYYY-MM-DD'));
      }

      dateStart.add(1, 'days');
    }

    setWeekdays(_weekdays);
  };

  const openYearSelector = () => setYearSelectVisible(true);
  const closeYearSelector = () => setYearSelectVisible(false);

  const renderDay = (day, idx) => {
    const isHeader = day.length === 3;
    const dayFromCurrentMonth = day.substring(0, 7) === currentMonth;
    const selectedValue = day === props.value;

    if (isHeader) {
      return (
        <Text key={idx} style={styles.headerText}>
          {day}
        </Text>
      );
    }

    if (!dayFromCurrentMonth) {
      return (
        <View key={idx} style={styles.dayContainer}>
          <Text>{day.substring(8)}</Text>
        </View>
      );
    }

    if (selectedValue) {
      return (
        <TouchableOpacity
          key={idx}
          style={{
            ...styles.dayContainer,
            backgroundColor: 'grey',
          }}
          onPress={() => props.onDateSelect()}>
          <Text style={{color: 'white'}}>{day?.substring(8)}</Text>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        key={idx}
        style={styles.dayContainer}
        onPress={() => props.onDateSelect(day)}>
        <Image
          source={require('../../assets/images/angry.png')}
          style={{height: 15, width: 15}}
        />
        <Text>{day.substring(8)}</Text>
      </TouchableOpacity>
    );
  };

  const renderWeekdays = (days, idx) => {
    return (
      <>
        <View key={idx} style={styles.dayColumn}>
          {days.map((d, i) => renderDay(d, i))}
        </View>
      </>
    );
  };

  const goToNextMonth = () => {
    const nextMonth = moment(currentMonth, 'YYYY-MM').add(1, 'M');
    setCurrentMonth(nextMonth.format('YYYY-MM'));
  };

  const goToPreviousMonth = () => {
    const prevMonth = moment(currentMonth, 'YYYY-MM').subtract(1, 'M');
    setCurrentMonth(prevMonth.format('YYYY-MM'));
  };

  const selectYear = year => {
    const result = year + '-' + currentMonth.substring(5);
    setCurrentMonth(result);
    closeYearSelector();
  };

  const renderYearSelector = () => {
    const startYear = Number(_currentYear) - 100;
    return (
      <View style={{height: DEVICE_HEIGHT / 2.6}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {Array(100)
            .fill()
            .map((y, i) => {
              const yr = Number(_currentYear) - i;
              return (
                <TouchableOpacity key={i} onPress={() => selectYear(yr)}>
                  <Text style={{textAlign: 'center', padding: 5, fontSize: 16}}>
                    {yr}
                  </Text>
                </TouchableOpacity>
              );
            })}
        </ScrollView>
      </View>
    );
  };

  const renderYear = () => {
    return (
      <View style={styles.monthContainer}>
        <TouchableOpacity onPress={openYearSelector}>
          <Text style={styles.monthText}>
            {moment(currentMonth, 'YYYY').format('YYYY')}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  if (yearSelectVisible) {
    return renderYearSelector();
  }

  return (
    <>
      <View style={styles.monthContainer}>
        <TouchableOpacity style={{padding: 10}} onPress={goToPreviousMonth}>
          <Image
            source={require('../../assets/images/navLeft.png')}
            style={styles.monthIcon}
          />
        </TouchableOpacity>
        <Text style={styles.monthText}>
          {moment(currentMonth, 'YYYY-MM').format('MMMM YYYY')}
        </Text>
        <TouchableOpacity style={{padding: 10}} onPress={goToNextMonth}>
          <Image
            source={require('../../assets/images/navRight.png')}
            style={styles.monthIcon}
          />
        </TouchableOpacity>
      </View>
      {props.showYear && renderYear()}

      <View style={styles.weekdays}>
        {weekdays && weekdays.map((w, i) => renderWeekdays(w, i))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  weekdays: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayColumn: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    marginBottom: 25,
  },
  monthContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 15,
  },
  monthText: {
    textAlign: 'center',
    color: 'grey',
    fontSize: 20,
    fontWeight: 'bold',
  },
  monthIcon: {
    height: 15,
    width: 15,
    tintColor: 'grey',
    resizeMode: 'contain',
    paddingHorizontal: 20,
  },
  dayContainer: {
    height: 35,
    width: 35,
    borderRadius: 17.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
});
