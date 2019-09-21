import {Socket} from "phoenix";
import _ from "underscore";

class ClientSocket {
  constructor(client, game, userToken, sessionToken) {
    this.client = client;
    this.game = game;
    this.userToken = userToken;
    this.sessionToken = sessionToken;
  }

  join() {
    this.socket = new Socket("ws://localhost:4100/websocket", {params: {token: this.userToken, session: this.sessionToken}});
    this.socket.connect();
    this.connect();
  }

  connect() {
    this.channel = this.socket.channel(`play:client`, {game: this.game});

    this.channel.on("echo", (data) => {
      console.log(data);
      this.client.appendText(data.message);
    });

    this.channel.on("connection", (data) => {
      console.log(data);
      this.client.receiveConnection(data);
    });

    this.channel.on("gmcp", (data) => {
      console.log(data);
      this.client.receiveGMCP(data.module, data.data);
    });

    this.channel.on("oauth", (data) => {
      console.log(data);
      this.client.receiveOAuth(data);
    });

    this.channel.on("ga", () => {
      this.client.processText();
    });

    this.channel.on("option", (data) => {
      console.log(data);
      this.client.setOption(data);
    });

    this.channel.onClose(() => {
      this.client.disconnected();
    });

    this.channel.onError(() => {
      this.client.disconnected();
    });

    this.channel.join()
      .receive("ok", () => {
        this.client.connected();
      });
  }

  send(message) {
    this.channel.push("send", {message: message});
  }

  event(type, payload) {
    this.channel.push(type, payload);
  }
}

export {ClientSocket};
