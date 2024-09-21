# popo Emoji Picker

## Overview
The Emoji Picker is a JavaScript library for incorporating an emoji selector in web applications. The picker allows users to select emojis which can be inserted into a text input or editable div.

![light theme](https://po-po.github.io/popo-Emoji-Picker/img/1.png)
![dark theme](https://po-po.github.io/popo-Emoji-Picker/img/2.png)

## Installation
To include the Emoji Picker in your project, you can use the following import statement:
```javascript
import { emojiTransform, EmojiPicker } from './emoji-picker.js';
```

## Usage
#### Creating an Emoji Picker
To create an emoji picker, instantiate the EmojiPicker class:

```javascript
const emojiPicker = new EmojiPicker({
    inputElement: document.getElementById('your-input-element-id'),
    toggleButtonElement: document.getElementById('your-toggle-button-id'),
    theme: 'light',
    itemHeight: 40,
    groupSize: 9,
    rows: 6,
    isNative: false,
    placeholder: 'Select an emoji',
    maxLength: 200,
    created: (picker) => {
        console.log('Emoji Picker is ready', picker);
    },
    inputChange: (data) => {
        console.log('Input changed:', data);
    },
});
```
#### Properties
- **inputElement**: The input element where emojis will be inserted.
- **toggleButtonElement**: The button to toggle the emoji picker.
- **theme**: The theme of the picker (light, dark, or auto).
- **itemHeight**: The height of each emoji item.
- **groupSize**: The number of emojis displayed per row.
- **rows**: The number of rows in the emoji picker.
- **isNative**: Whether to use native emojis or image emojis.
- **placeholder**: Placeholder text for the input field.
- **maxLength**: Maximum length of the input.
- **created**: Callback function called when the picker is created.
- **inputChange****: Callback function called when the input changes.

#### Methods
- **setValue(value)**: Sets the value of the input element.
- **setNative(isNative)**: Switches between using native and image emojis.
- **setTheme(theme)**: Sets the theme of the emoji picker.
- **setLanguage(language)**: Changes the language of the picker (en or zh-CN).


### Emoji Transformation
The **emojiTransform(value, type)** function transforms the emoji formats:

- Parameters:
  - value: The value to convert.
  - type: The format type (image, native, or unicode).

Example:
```javascript
const html = emojiTransform('😊', 'image');
console.log(html); // Outputs HTML <img> tag
```
## License
This project is licensed under the MIT License - see the LICENSE file for details.
