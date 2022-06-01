
const ratio = [
  {
    text: "1.1",
    dimensions: {
      width: 30.26,
      height: 32
    }
  }, {
    text: "2.3",
    dimensions: {
      width: 17.97,
      height: 32
    }
  }, {
    text: "3.2",
    dimensions: {
      width: 30.26,
      height: 19
    }
  }, {
    text: "3.4",
    dimensions: {
      width: 21.75,
      height: 32
    }
  }, {
    text: "4.3",
    dimensions: {
      width: 30.26,
      height: 24
    }
  }, {
    text: "4.5",
    dimensions: {
      width: 25.53,
      height: 32
    }
  }
];
export default {
  ratio: ratio
};

export const settings = [
  // {
  //   name: 'hue',
  //   minValue: 0,
  //   maxValue: 6.3,
  // },
  // {
  //   name: 'blur',
  //   minValue: 0,
  //   maxValue: 30,
  // },
  // {
  //   name: 'sepia',
  //   minValue: -5,
  //   maxValue: 5,
  // },
  // {
  //   name: 'sharpen',
  //   minValue: 0,
  //   maxValue: 15,
  // },
  // {
  //   name: 'negative',
  //   minValue: -2.0,
  //   maxValue: 2.0,
  // },
  {
    name: "contrast",
    value: 1,
    minValue: -10.0,
    maxValue: 10.0
  },
  {
    name: "saturation",
    value: 1,
    minValue: 0.0,
    maxValue: 2
  },
  {
    name: "brightness",
    value: 1,
    minValue: 0,
    maxValue: 5
  },
  {
    name: "temperature",
    value: 6500,
    minValue: 0.0,
    maxValue: 40000.0
  }
];
