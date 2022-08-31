# Onboarding Tutorial Screen

The Onboarding Tutorial Screen is a ReactNative based onboarding screen. It can be configured to have 1 or many
slide screens with content and expansion detailed in the file.

## Manual Setup

1. If you want to use the module directly, or in other modules, you can do so by importing it and using the following properties.

```javascript

import Onboarding from "@modules/onboarding";

const { title, navigator } = Onboarding;

```

2. You can call module directly by importing navigator without going through any routing. And pass the params to the module.

```javascript

import { modules } from '@modules';

const Onboarding = modules[module_index].value.navigator;  //module_index : position of the module in modules folder

<Onboarding slidesData={Array} onDone = {Func} />

```

## Params

Below is the list of all params that can be passed to the module.

| Name            | Type       | Description                                                    |
| --------------- |:----------:|:---------------------------------------------------------------|
| slidesData `required` | `array`    | An array of objects, Each object contains properties ( `key`, `title`, `description`, `imageURL`, `backgroundColor` )|
| onDone          | `function` | Called once the onboarding process is completed             |
| onSkip          | `function` | Called when user presses the skip button                   |
| onSlideChange   | `function` | Called when user goes changes slide (by swiping or pressing next/prev).|
| bottomButton    | `boolean`  | Enable to show a full-width button under pagination                       |
| dotStyle        | `object`   | Style of inactive pagination dots                       |
| activeDotStyle  | `object`   | Style of inactive pagination dot                       |
| skipLabel       | `string`   | Custom label for Skip button                       |
| doneLabel       | `string`   | Custom label for Done button                       |
| nextLabel       | `string`   | Custom label for Next button                       |
| prevLabel       | `string`   | Custom label for Prev button                       |
| showSkipButton  | `boolean`  | Enable to show a skip button to the left of pagination dots.          |
| showPrevButton  | `boolean`  | Enable to show a previous button.                        |
| showNextButton  | `boolean`  | Enable to show a next button.                        |
| showDoneButton  | `boolean`  | Enable to show a done button.                        |
| renderNextButton| `function` | Use to supply your own next button.                      |
| renderPrevButton| `function` | Use to supply your own prev button.                        |
| renderDoneButton| `function` | Use to supply your own done button                        |
| renderSkipButton| `function` | Use to supply your own skip button                        |
| mainContainerStyle      | `object`   | Style main container wrapping your all content on the onboarding screen.                        |
| imageStyle      | `object`   | Style image displaying on the onboarding screen.                        |
| titleStyle      | `object`   | Style title on the onboarding screen.                        |
| descriptionStyle| `object`   | Style the description on the onboarding screen.                        |

### Param `slidesData` array of objects

The first param `slidesData` is an array of objects. Each object in `slidesData ` array will have following properties inside it.

| Name               | Type                     | Description                                                    |
| ------------------ |:------------------------:|:---------------------------------------------------------------|
| key                | `number`                 | A unique number for each object                                |
| title              | `string`                 | Title for your onboarding screen                               |
| description        | `string`                 | Description for onboarding screen                              |
| imageURL           | `string`                 | URL of th image to be displayed on the onboarding screen       |
| backgroundColor    | `string`(`#f1f1`, `blue`)| Background color for onboarding screen                         |

Your finale `slidesData` array will look something like this.

```javascript

const slidesData = [
  {
    key : 1,
    title: "Title 1",
    description: "Description.\nSay something cool",
    imageURL: "https://crowdbotics-slack-dev.s3.amazonaws.com/media/project_component_resources/cb-icon.png",
    backgroundColor: "#59b2ab"
  },
  ...
]

```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
