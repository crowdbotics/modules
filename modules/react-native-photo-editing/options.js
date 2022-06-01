
const ratio = [
  {
    label: "1.1",
    horizontal_ratio: 1,
    vertical_ratio: 1,
    dimensions: {
      width: 30.26,
      height: 32
    }
  }, {
    label: "2.3",
    horizontal_ratio: 2,
    vertical_ratio: 3,
    dimensions: {
      width: 17.97,
      height: 32
    }
  }, {
    label: "3.2",
    horizontal_ratio: 3,
    vertical_ratio: 2,
    dimensions: {
      width: 30.26,
      height: 19
    }
  }, {
    label: "3.4",
    horizontal_ratio: 3,
    vertical_ratio: 4,
    dimensions: {
      width: 21.75,
      height: 32
    }
  }, {
    label: "4.3",
    horizontal_ratio: 4,
    vertical_ratio: 3,
    dimensions: {
      width: 30.26,
      height: 24
    }
  }, {
    label: "4.5",
    horizontal_ratio: 4,
    vertical_ratio: 5,
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
