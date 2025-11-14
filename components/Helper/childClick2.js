import React, { Component } from 'react'
// Child Component
class Child extends Component {
  // This is the method we want to trigger from the parent
  runCustomLogic = () => {
    console.log("Child logic triggered from parent!");
    alert("Child method executed!");
  };

  componentDidMount() {
    console.log("Child mounted automatically.");
  }

  render() {
    return <div>Child Component</div>;
  }
}

// Parent Component
class Parent extends Component {
  constructor(props) {
    super(props);
    this.childRef = createRef(); // Create a ref to access child methods
  }

  handleButtonClick = () => {
    if (this.childRef.current) {
      this.childRef.current.runCustomLogic(); // Call child's method
    }
  };

  render() {
    return (
      <div>
        <h1>Parent Component</h1>
        <button onClick={this.handleButtonClick}>
          Trigger Child Method
        </button>
        <Child ref={this.childRef} />
      </div>
    );
  }
}

export default Parent;

