import React, { Component } from 'react'
    import { BrowserRouter, Route, Switch } from 'react-router-dom'
    import Header from './Header'
    import Users from './Users/ListUsers'
    import NewUser from './Users/NewUser'
    import SingleUser from './Users/SingleUser'
    import EditUser from './Users/EditUser'
    import EditTask from './Users/EditTask'
    import Person from './Person';
    import Validation from './ValidationComp/Validation';
    import Char from './CharComp/Char';

    class App extends Component {
      state = {
        userInput: ''
      };

      inputChangeHandler = (event) => {
        this.setState({userInput: event.target.value});
      }

      deleteCharHandler =(i) => {
        const chars = this.state.userInput.split('');
        chars.splice(i, 1);
        const updatedChars = chars.join('');
        this.setState({userInput: updatedChars});
      };
      render () {
        const charList = this.state.userInput.split('').map((char,i) => {
          return <Char character ={char} key={i} clicked={() => this.deleteCharHandler(i)}/>;
        });
        return (
          <BrowserRouter>
            <div>
              <Header />
              <Person />
              <input type="text"  onChange={this.inputChangeHandler} value={this.state.userInput}/>
              <p>{this.state.userInput}</p>
              <Validation inputLength={this.state.userInput.length}/>
              {charList}
              <Switch>
                <Route exact path='/' component={Users} />
                <Route path='/create' component={NewUser} />
                <Route path='/edit-user/:id' component={EditUser} />
                <Route path="/edit-task/:id" component={EditTask}/>
                <Route path='/:id' component={SingleUser} />
              </Switch>
            </div>
          </BrowserRouter>
        )
      }
    }

    export default App;