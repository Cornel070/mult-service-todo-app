import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'

class ListUsers extends Component {
  constructor () {
    super()
    this.state = {
      users: []
    }
  }

  componentDidMount () {
    axios.get('https://ms.handiman.ng/api/v1/users').then(response => {
      this.setState({
        users: response.data
      })
    })
  }

  // update the users state by filtering out the user with the ID passed to the method
  deleteUser(id) {
    axios.delete('https://ms.handiman.ng/api/v1/user/' + id)
        .then((res) => {
          this.setState(prevState => ({
            users: prevState.users.filter(user => {
              return user.id !== id
            })
          }))
        }).catch((error) => {
            console.log(error)
        })
}

  render () {
    const { users } = this.state
    return (
      <div className='container py-4'>
        <div className='row justify-content-center'>
          <div className='col-md-8'>
            <div className='card'>
              <div className='card-header'>All users</div>
              <div className='card-body'>
                <Link className='btn btn-primary btn-sm mb-3' to='/create'>
                  Create new user
                </Link>
                <Table striped bordered hover size="sm">
                      <thead>
                        <tr>
                          <th>Username</th>
                          <th>#</th>
                        </tr>
                      </thead>
                      <tbody>
                      {users.map(user => (
                        <tr key={user.id}>
                          <td>
                            <Link
                              className='list-group-item list-group-item-action d-flex justify-content-between align-items-center'
                              to={`/${user.id}`}
                              key={user.id}>
                              {user.name}
                            </Link>
                          </td>
                          <td><Button onClick={this.deleteUser.bind(this, user.id)} size="sm" variant="danger">Delete user</Button> </td>
                        </tr>
                      ))}
                      </tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ListUsers