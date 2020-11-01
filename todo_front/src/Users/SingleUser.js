import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'

    class SingleUser extends Component {
      constructor (props) {
        super(props)
        this.state = {
          user: {},
          tasks: [],
          description: '',
          errors: []
        }
       
        this.handleFieldChange = this.handleFieldChange.bind(this)
        this.handleAddNewTask = this.handleAddNewTask.bind(this)
        this.hasErrorFor = this.hasErrorFor.bind(this)
        this.renderErrorFor = this.renderErrorFor.bind(this)
      }

      componentDidMount () {
        const userId = this.props.match.params.id

        axios.get(`https://ms.handiman.ng/api/v1/user/${userId}`).then(response => {
          this.setState({
            user: response.data,
          })
        })
        // get user tasks
        axios.get(`https://ms.handiman.ng/api/v1/user/${userId}/tasks`).then(response => {
            this.setState({
              tasks: response.data.tasks,
            })
          })
      }

      handleFieldChange (event) {
        this.setState({
          description: event.target.value
        })
      }
  
      handleAddNewTask (event) {
        event.preventDefault()
  
        const task = {
          description: this.state.description,
          user_id: this.state.user.id
        }
  
        axios.post(`https://ms.handiman.ng/api/v1/user/${this.state.user.id}/task`, task)
          .then(response => {
            // clear form input
            this.setState({
              description: ''
            })
            // add new task to list of tasks
            this.setState(prevState => ({
              tasks: prevState.tasks.concat(response.data.task)
            }))
          })
          .catch(error => {
            this.setState({
              errors: error.response.data.errors
            })
          })
      }
  
      hasErrorFor (field) {
        return !!this.state.errors[field]
      }
  
      renderErrorFor (field) {
        if (this.hasErrorFor(field)) {
          return (
            <span className='invalid-feedback'>
              <strong>{this.state.errors[field][0]}</strong>
            </span>
          )
        }
      }
      // update the tasks state by filtering out the task with the ID passed to the method
      handleMarkTaskAsCompleted (taskId) {
        axios.get(`https://ms.handiman.ng/api/v1/task/${taskId}/done`).then(response => {
          this.setState(prevState => ({
            tasks: prevState.tasks.filter(task => {
              return task.id !== taskId
            })
          }))
        })
      }

      render () {
        const { user, tasks } = this.state
        const renderStatusBtn = (task) => {
            if(task.state === 'done'){
                return <button
                className='btn btn-success btn-sm'>
                Completed
            </button>   
                 
            }else{
                return <button
                className='btn btn-primary btn-sm'
                onClick={this.handleMarkTaskAsCompleted.bind(this,task.id)}>
                Mark as completed
            </button> 
            }
        }

        return (
          <div className='container py-4'>
            <div className='row justify-content-center'>
              <div className='col-md-8'>
                <div className='card'>
                  <div className='card-header'>View User 
                    <Link className='btn btn-primary btn-sm mb-3 pull-right' to={'/edit-user/' + user.id}>
                        Edit
                      </Link></div>
                  <div className='card-body'>
                    <p>{user.name}</p>

                    <hr />
                    <form onSubmit={this.handleAddNewTask}>
                    <div className='input-group'>
                        <input
                        type='text'
                        name='description'
                        className={`form-control ${this.hasErrorFor('description') ? 'is-invalid' : ''}`}
                        placeholder='Task description'
                        value={this.state.description}
                        onChange={this.handleFieldChange}
                        />
                        <div className='input-group-append'>
                        <button className='btn btn-primary'>Add</button>
                        </div>
                        {this.renderErrorFor('description')}
                    </div>
                    </form>
                    <Table striped bordered hover size="sm">
                      <thead>
                        <tr>
                          <th>Task</th>
                          <th>Status</th>
                          <th>Action</th>
                          <th>#</th>
                        </tr>
                      </thead>
                      <tbody>
                      {tasks.map(task => (
                        <tr key={task.id}>
                          <td>{task.description}</td>
                          <td><span className="badge badge-pill badge-info">{task.state}</span></td>
                          <td>{renderStatusBtn(task)}</td>
                          <td><Link className="edit-link btn btn-primary btn-sm mb-3" to={"/edit-task/" + task.id}>Edit</Link> </td>
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

    export default SingleUser