class ServerState {
  constructor(model) {
    this.model = model;
    this.serverState = {};
  }

  setup() {
    console.log(this.model);
    this.model.forEach((document) => {
      this.serverState[document._id] = {};
      this.serverState[document._id].clients = new Set();
      this.serverState[document._id]._activeBids = [];
      this.serverState[document._id]._newBids = [];
      this.serverState[document._id].emailSent = document.emailSent;
    });
    return this;
  }
}
module.exports = ServerState;
