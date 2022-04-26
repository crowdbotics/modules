import * as React from 'react';
import Slider from './components/Slider/index'
import options from './options'

const Onboarding = ()=> {
  return (
    <Slider data={options.sliderData} onFinish={() => {}}/>
  );
}
export default {
  title: "Onboarding",
  navigator: Onboarding
}
