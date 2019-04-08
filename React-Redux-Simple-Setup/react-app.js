
class DisplayMessages extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        input: '',
        messages: []
      };
      this.handleChange = this.handleChange.bind(this);
      this.submitMessage = this.submitMessage.bind(this);
    }
    // add handleChange() and submitMessage() methods here
    handleChange(event) {
      this.setState({input: event.target.value})
    }
  
    submitMessage() {
      this.setState({
        messages: this.state.messages.concat(this.state.input),
        input: ''
      })
    }
  
    render() {
      const list = this.state.messages.map((m) => <li>{m}</li>)
      return (
        <div>
          <h2>Type in a new Message:</h2>
          { /* render an input, button, and ul here */ }
          <input value={this.state.input} onChange={this.handleChange}></input>
          <button onClick={this.submitMessage}>Submit</button>
          <ul>{list}</ul>
          { /* change code above this line */ }
        </div>
      );
    }
  };
/* 
React Redux provides its react-redux package to help accomplish these tasks.

React Redux provides a small API with two key features: Provider and connect. Another challenge covers connect. The Provider is a wrapper component from React Redux that wraps your React app. This wrapper then allows you to access the Redux store and dispatch functions throughout your component tree. Provider takes two props, the Redux store and the child components of your app. Defining the Provider for an App component might look like this:

<Provider store={store}>
  <App/>
</Provider> 

*/
const Provider = ReactRedux.Provider;

class AppWrapper extends React.Component {
  // render the Provider here
 render() {
    return (

        <Provider store = {store}>
          <DisplayMessages />
        </Provider>

    )
  }
  // change code above this line
};