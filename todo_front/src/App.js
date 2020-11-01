import React, { Component } from 'react'
    import { BrowserRouter, Route, Switch } from 'react-router-dom'
    import Header from './Header'
    import Users from './Users/ListUsers'
    import NewUser from './Users/NewUser'
    import SingleUser from './Users/SingleUser'
    import EditUser from './Users/EditUser'
    import EditTask from './Users/EditTask'

    class App extends Component {
      render () {
        return (
          <BrowserRouter>
            <div>
              <Header />
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