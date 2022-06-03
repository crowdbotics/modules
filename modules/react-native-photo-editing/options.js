
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

export const FILTERS = [
  {
    id: 1,
    name: "heatmap"
  },
  {
    id: 2,
    name: "monochrome"
  },
  {
    id: 4,
    name: "OrRd"
  },
  {
    id: 5,
    name: "PuBu"
  },
  {
    id: 6,
    name: "BuPu"
  },
  {
    id: 7,
    name: "Oranges"
  },
  {
    id: 8,
    name: "BuGn"
  },
  {
    id: 9,
    name: "YlOrBr"
  },
  {
    id: 10,
    name: "YlGn"
  },
  {
    id: 11,
    name: "Reds"
  },
  {
    id: 12,
    name: "RdPu"
  },
  {
    id: 13,
    name: "Greens"
  },
  {
    id: 14,
    name: "YlGnBu"
  },
  {
    id: 15,
    name: "Purples"
  },
  {
    id: 16,
    name: "GnBu"
  },
  {
    id: 17,
    name: "Greys"
  },
  {
    id: 18,
    name: "YlOrRd"
  },
  {
    id: 19,
    name: "PuRd"
  },
  {
    id: 20,
    name: "Blues"
  },
  {
    id: 21,
    name: "PuBuGn"
  },
  {
    id: 22,
    name: "Spectral"
  },
  {
    id: 23,
    name: "RdYlGn"
  }

];

export const SHADOWS = [
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

export const blurShadows = [
  {
    name: "Blur",
    value: 3,
    minValue: 0,
    maxValue: 10.0
  },
  {
    name: "Blur Passes",
    value: 6,
    minValue: 0,
    maxValue: 15
  }

];
