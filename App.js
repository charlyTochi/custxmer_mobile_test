import React, {useState} from 'react';
import {Image, SafeAreaView} from 'react-native';
import DatePicker from './src/components/calender';

const App = ()  => {
  const [dob, setDob] = useState();
  const allDates = {
    dates: [
      {
        date: 4,
        mood: 'sad',
      },
      {
        date: 1,
        mood: 'sad',
      },
      {
        date: 4,
        mood: 'happy',
      },
      {
        date: 6,
        mood: 'fair',
      },
      {
        date: 27,
        mood: 'sad',
      },
    ],
    month: 9,
    year: 2022,
  };
  return (
    <SafeAreaView>
      <>
        <DatePicker
        date={allDates}
          onDateSelect={date => setDob(date)}
          value={dob}
          showYear={true}
        />
      </>
    </SafeAreaView>
  );
};
export default App;
