import _ from "underscore";
import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {
  Button,
  View,
  TextInput,
} from 'react-native';

import {
  Creators
} from "./redux/actions";

import {
  getSocketPromptType,
  getPromptDisplayText,
} from "./redux/store";

class Prompt extends React.Component {
  constructor(props) {
    super(props);

    this.sendText = this.sendText.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
  }

  sendText() {
    if (this.props.promptType === "text") {
      this.sendMessage();
    } else if (this.props.promptType === "password") {
      this.sendPassword();
    }
  }

  sendMessage() {
    const {socket} = this.context;
    this.props.socketInput(`${this.props.displayText}\n`);
    this.props.promptClear();
    socket.send(`${this.props.displayText}\n`);
  }

  sendPassword() {
    const {socket} = this.context;
    this.props.socketEcho("\n");
    this.props.promptClear();
    socket.send(`${this.props.displayText}\n`);
  }

  onTextChange(e) {
    this.props.promptSetCurrentText(e.nativeEvent.text);
  }

  render() {
    return (
      <View {...this.props} style={{backgroundColor: "#444444"}}>
        <TextInput
          style={{margin: 10, color: "#F5F7FA", fontFamily: "Menlo", fontSize: 16}}
          autoCapitalize="none"
          autoCorrect={false}
          value={this.props.displayText}
          blurOnSubmit={false}
          selectTextOnFocus={true}
          onChange={this.onTextChange}
          type={this.props.promptType}
          onSubmitEditing={this.sendText} />
      </View>
    );
  }
}

Prompt.contextTypes = {
  socket: PropTypes.object,
};

let mapStateToProps = (state) => {
  let promptType = getSocketPromptType(state);
  let displayText = getPromptDisplayText(state);
  return {displayText, promptType};
};

export default Prompt = connect(mapStateToProps, {
  promptClear: Creators.promptClear,
  promptHistoryAdd: Creators.promptHistoryAdd,
  promptHistoryScrollBackward: Creators.promptHistoryScrollBackward,
  promptHistoryScrollForward: Creators.promptHistoryScrollForward,
  promptSetCurrentText: Creators.promptSetCurrentText,
  socketEcho: Creators.socketEcho,
  socketInput: Creators.socketInput,
})(Prompt);
