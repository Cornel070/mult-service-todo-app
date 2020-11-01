import React, { Component } from "react";
import axios from 'axios';

export default class EditTask extends Component {

  constructor(props) {
    super(props)

    this.onChangeName = this.onChangeName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    // this.hasErrorFor = this.hasErrorFor.bind(this)
    // this.renderErrorFor = this.renderErrorFor.bind(this)

    // State
    this.state = {
      name: ''
    }
  }

  componentDidMount() {
    axios.get('https://ms.handiman.ng/api/v1/user/' + this.props.match.params.id)
      .then(res => {
        this.setState({
        name: res.data.name
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChangeName(e) {
    this.setState({ name: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault()
    const userObject = {
      name: this.state.name
    };
    const { history } = this.props
    axios.put('https://ms.handiman.ng/api/v1/user/' + this.props.match.params.id, userObject)
      .then((res) => {
        history.push('/')
      }).catch((error) => {
        console.log(error)
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


  render() {
    return (
        <div className='container py-4'>
          <div className='row justify-content-center'>
            <div className='col-md-6'>
              <div className='card'>
                <div className='card-header'>Update user</div>
                <div className='card-body'>
                  <form onSubmit={this.onSubmit}>
                    <div className='form-group'>
                      <label htmlFor='name'>User name</label>
                      <input
                        id='name'
                        type='text'
                        className={`form-control `}
                        name='name'
                        value={this.state.name}
                        onChange={this.onChangeName}
                      />
                      {/* {this.renderErrorFor('name')} */}
                    </div>
                    <button className='btn btn-primary'>Update</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
  }
}