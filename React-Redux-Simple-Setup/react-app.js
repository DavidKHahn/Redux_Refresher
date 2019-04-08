const store = Redux.createStore(messageReducer);
const Provider = ReactRedux.Provider;
const connect = ReactRedux.connect;
// Redux:
const ADD = 'ADD';

const addMessage = (message) => {
    return {
        type: ADD,
        message: message
    }
};

const messageReducer = (state = [], action) => {
    switch (action.type) {
        case ADD:
            return [
                ...state,
                action.message
            ];
        default:
            return state;
    }
};

class Presentational extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.submitMessage = this.submitMessage.bind(this);
    }
    // add handleChange() and submitMessage() methods here
    handleChange(event) {
        this.setState({
            input: event.target.value
        })
    }

    submitMessage() {
        this.setState({
            // messages: this.state.messages.concat(this.state.input),
            input: ''
        });
        this.props.messages.concat(this.state.input)
    }

    render() {
        //   const list = this.state.messages.map((m) => <li>{m}</li>)
        return (
            <div>
                <h2>Type in a new Message:</h2>
                { /* render an input, button, and ul here */}
                <input value={this.state.input} onChange={this.handleChange}></input>
                <button onClick={this.submitMessage}>Submit</button>
                <ul>{this.props.message.map((message, idx) => {
                    return (
                        <li key={idx}>{message}</li>
                    )
                })}</ul>
                { /* change code above this line */}
            </div>
        );
    }
};
/*
The Provider component allows you to provide state and dispatch to your React components, but you must specify exactly what state and actions you want. This way, you make sure that each component only has access to the state it needs. You accomplish this by creating two functions: mapStateToProps() and mapDispatchToProps().

In these functions, you declare what pieces of state you want to have access to and which action creators you need to be able to dispatch. Once these functions are in place, you'll see how to use the React Redux connect method to connect them to your components in another challenge.

Note: Behind the scenes, React Redux uses the store.subscribe() method to implement mapStateToProps().
*/
const mapStateToProps = (state) => {
    return { messages: state }
};
/*
The mapDispatchToProps() function is used to provide specific action creators to your React components so they can dispatch actions against the Redux store. It's similar in structure to the mapStateToProps() function you wrote in the last challenge. It returns an object that maps dispatch actions to property names, which become component props. However, instead of returning a piece of state, each property returns a function that calls dispatch with an action creator and any relevant action data. You have access to this dispatch because it's passed in to mapDispatchToProps() as a parameter when you define the function, just like you passed state to mapStateToProps(). Behind the scenes, React Redux is using Redux's store.dispatch() to conduct these dispatches with mapDispatchToProps(). This is similar to how it uses store.subscribe() for components that are mapped to state. 
*/
const mapDispatchToProps = (dispatch) => {
    return {
        submitNewMessage: (newMessage) => {
            dispatch(addMessage(newMessage))
        }
    }
};
// define the Container component here:
const Container = connect(mapStateToProps, mapDispatchToProps)(Presentational);
/* 
React Redux provides its react-redux package to help accomplish these tasks.

React Redux provides a small API with two key features: Provider and connect. Another challenge covers connect. The Provider is a wrapper component from React Redux that wraps your React app. This wrapper then allows you to access the Redux store and dispatch functions throughout your component tree. Provider takes two props, the Redux store and the child components of your app. Defining the Provider for an App component might look like this:

<Provider store={store}>
  <App/>
</Provider> 

*/
class AppWrapper extends React.Component {
    // render the Provider here
    render() {
        return (
            <Provider store={store}>
                <Presentational />
            </Provider>
        )
    }
    // change code above this line
};

// Extract Local State into Redux
/*
In the Presentational component, first, remove the messages property in the local state. These messages will be managed by Redux. Next, modify the submitMessage() method so that it dispatches submitNewMessage() from this.props, and pass in the current message input from local state as an argument. Because you removed messages from local state, remove the messages property from the call to this.setState() here as well. Finally, modify the render() method so that it maps over the messages received from props rather than state.

Once these changes are made, the app will continue to function the same, except Redux manages the state. This example also illustrates how a component may have local state: your component still tracks user input locally in its own state. You can see how Redux provides a useful state management framework on top of React. You achieved the same result using only React's local state at first, and this is usually possible with simple apps. However, as your apps become larger and more complex, so does your state management, and this is the problem Redux solves.
*/