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

    this.buttonSendMessage = this.buttonSendMessage.bind(this);
    this.sendText = this.sendText.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
  }

  buttonSendMessage(e) {
    e.preventDefault();
    this.sendMessage();
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
    this.props.promptHistoryAdd();
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
    let value = this.props.displayText === undefined ? "" : this.props.displayText;

    return (
      <View style={{flexDirection: 'row'}}>
        <TextInput style={{width: "100%", color: "#F5F7FA", fontFamily: "Menlo"}}
          autoCapitalize="none"
          value={value}
          selectTextOnFocus={true}
          onChange={this.onTextChange}
          type={this.props.promptType}
          onSubmitEditing={this.sendText} />
        <Button title="Send" onClick={this.buttonSendMessage} />
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
