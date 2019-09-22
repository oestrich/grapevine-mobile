import _ from "underscore";
import React from "react";
import {connect} from 'react-redux';

import {
  Text,
  ScrollView,
  View,
} from 'react-native';

import {
  getSettingsFont,
  getSettingsFontSize,
  getSocketLines
} from "./redux/store";

const theme = {
  colors: {
    black: "#373737",
    red: "#d71e00",
    green: "#5da602",
    yellow: "#cfad00",
    blue: "#417ab3",
    magenta: "#88658d",
    cyan: "#00a7aa",
    white: "#dbded8",
  },

  brightColors: {
    black: "#676965",
    red: "#f44135",
    green: "#98e342",
    yellow: "#fcea60",
    blue: "#83afd8",
    magenta: "#bc93b6",
    cyan: "#37e5e7",
    white: "#f1f1ef",
  },

  backgroundColors: {
    black: "#000000",
    red: "#d71e00",
    green: "#5da602",
    yellow: "#cfad00",
    blue: "#417ab3",
    magenta: "#88658d",
    cyan: "#00a7aa",
    white: "#dbded8",
  },

  brightBackgroundColors: {
    black: "#676965",
    red: "#f44135",
    green: "#98e342",
    yellow: "#fcea60",
    blue: "#83afd8",
    magenta: "#bc93b6",
    cyan: "#37e5e7",
    white: "#f1f1ef",
  }
};

export class AnsiText extends React.Component {
  transformColor(color, sequence, colors, brightColors) {
    if (color.startsWith("#")) {
      return color;
    }

    if (sequence.includeDecoration("bright")) {
      return brightColors[color];
    } else {
      return colors[color];
    }
  }

  textStyle(sequence) {
    let style = {};

    if (sequence.backgroundColor) {
      style.backgroundColor = this.transformColor(sequence.backgroundColor, sequence, theme.backgroundColors, theme.brightBackgroundColors);
    }

    if (sequence.color) {
      style.color = this.transformColor(sequence.color, sequence, theme.colors, theme.brightColors);
    }

    if (sequence.includeDecoration("bold")) {
      style.fontWeight = "bolder";
    }

    if (sequence.includeDecoration("underline")) {
      style.textDecoration = "underline";
    }

    return style;
  }

  className(sequence) {
    if (sequence.includeDecoration("blink")) {
      return "blink";
    }

    return "";
  }

  render() {
    let segment = this.props.text;

    if (segment.text === undefined) {
      return null;
    }

    return (
      <Text style={this.textStyle(segment)}>{segment.text}</Text>
    );
  }
}

export class Line extends React.Component {
  render() {
    let sequences = this.props.sequences;

    return sequences.map((sequence) => {
      return (
        <AnsiText key={sequence.id} text={sequence} />
      );
    });
  }
}

class Terminal extends React.Component {
  constructor(props) {
    super(props);

    this.scrollToBottom = this.scrollToBottom.bind(this);
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.refs.scroll.scrollToEnd();
  }

  render() {
    let lines = this.props.lines;

    let fontFamily = this.props.font;
    let fontSize = this.props.fontSize;

    const style = {
      backgroundColor: "#000000",
      color: "#F5F7FA",
      fontFamily: fontFamily,
      fontSize
    };

    return (
      <ScrollView ref="scroll" {...this.props} onContentSizeChange={this.scrollToBottom}>
        <Text style={style}>
          {_.map(lines, line => {
            return (
              <Line key={line.id} sequences={line.sequences} />
            );
          })}
        </Text>
      </ScrollView>
    );
  }
}

let mapStateToProps = (state) => {
  const lines = getSocketLines(state);
  const font = getSettingsFont(state);
  const fontSize = getSettingsFontSize(state);
  return {font, fontSize, lines};
};

export default Terminal = connect(mapStateToProps)(Terminal);
