class Observer {
  update(event, data) {
    throw new Error("This method must be overwritten");
  }
}

export default Observer;
