import React, { Component } from "react";
import axios from 'axios';

export default class EditTask extends Component {

  constructor(props) {
    super(props)

    this.onChangeDesc = this.onChangeDesc.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // State
    this.state = {
      description: ''
    }
  }

  componentDidMount() {
    axios.get('https://ms.handiman.ng/api/v1/task/' + this.props.match.params.id)
      .then(res => {
        this.setState({
        description: res.data.description
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChangeDesc(e) {
    this.setState({ description: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault()
    const taskObject = {
      description: this.state.description
    };
    const { history } = this.props

    axios.put('https://ms.handiman.ng/api/v1/task/' + this.props.match.params.id, taskObject)
      .then((res) => {
        // redirect to the task owner's page
        history.push('/'+res.data.user_id);
      }).catch((error) => {
        console.log(error)
      })
  }


  render() {
    return (
        <div className='container py-4'>
          <div className='row justify-content-center'>
            <div className='col-md-6'>
              <div className='card'>
                <div className='card-header'>Update task</div>
                <div className='card-body'>
                  <form onSubmit={this.onSubmit}>
                    <div className='form-group'>
                      <label htmlFor='name'>Task description</label>
                      <input
                        id='description'
                        type='text'
                        className={`form-control `}
                        name='description'
                        value={this.state.description}
                        onChange={this.onChangeDesc}
                      />
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