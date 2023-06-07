
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

const settings = [
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

const FILTERS = [
  {
    id: 1,
    name: "Warm",
    settings: {
      blur: 0,
      brightness: 1,
      contrast: 1,
      hue: 0,
      negative: 0,
      saturation: 1.609375,
      sepia: 0,
      sharpen: 0,
      temperature: 6500
    }
  },
  {
    id: 2,
    name: "Classic",
    settings: {
      blur: 0,
      brightness: 1,
      contrast: 1.40625,
      hue: 0,
      negative: 0,
      saturation: 1,
      sepia: 0.78125,
      sharpen: 0,
      temperature: 6500
    }
  },
  {
    id: 3,
    name: "Vintage",
    settings: {
      blur: 0,
      brightness: 1,
      contrast: 0.46875,
      hue: 1.8703125,
      negative: -0.3125,
      saturation: 0.09375,
      sepia: 0.9375,
      sharpen: 0,
      temperature: 0
    }
  },
  {
    id: 4,
    name: "Sharp",
    settings: {
      blur: 0,
      brightness: 1,
      contrast: 1,
      hue: 0,
      negative: 0,
      saturation: 1,
      sepia: 0,
      sharpen: 1.5234375,
      temperature: 6500
    }
  },
  {
    id: 5,
    name: "Negative",
    settings: {
      blur: 0,
      brightness: 1,
      contrast: 1,
      hue: 0,
      negative: 0.90625,
      saturation: 1,
      sepia: 0,
      sharpen: 0,
      temperature: 6500
    }
  },
  {
    id: 6,
    name: "Bright",
    settings: {
      blur: 0,
      brightness: 2.03125,
      contrast: 1,
      hue: 0,
      negative: 0,
      saturation: 1,
      sepia: 0,
      sharpen: 0,
      temperature: 6500
    }
  },
  {
    id: 7,
    name: "Cool",
    settings: {
      blur: 0,
      brightness: 0.98125,
      contrast: 0.46875,
      hue: 6.3,
      negative: -0.5,
      saturation: 0.234375,
      sepia: -1.71875,
      sharpen: 0,
      temperature: 5625
    }
  }

];

const SHADOWS = [
  {
    id: 1,
    url: "https://i.imgur.com/SzbbUvX.png"
  },
  {
    id: 2,
    url: "https://i.imgur.com/0PkQEk1.png"
  },
  {
    id: 3,
    url: "https://i.imgur.com/z2CQHpg.png"
  },
  {
    id: 4,
    url: "https://i.imgur.com/k9Eview.png"
  },
  {
    id: 5,
    url: "https://i.imgur.com/wh0On3P.png"
  }

];

const blurShadows = [
  {
    id: 1,
    name: "Blur",
    value: 3,
    minValue: 0,
    maxValue: 10.0
  },
  {
    id: 2,
    name: "Blur Passes",
    value: 6,
    minValue: 1,
    maxValue: 15.0
  }

];

export default {
  ratio: ratio,
  settings: settings,
  FILTERS: FILTERS,
  SHADOWS: SHADOWS,
  blurShadows: blurShadows
};
