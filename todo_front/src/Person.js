import React, { Component } from 'react'

export default class Person extends Component {
    state = {
        persons:[
            {id: "sddr", name: "Cornel",age: 12},
            {id: "dffe", name: "Miracle", age: 30},
            {id: "ssdd", name: "Mary", age: 22}
        ],
        show: false,
    }

    render() {
        const changeShow = () => {
            const showArea = this.state.show;
            this.setState({show: !showArea})
        }
        const handleDel = (index) => {
            const persons = [...this.state.persons];
            persons.splice(index, 1);
            this.setState({persons: persons});
        }

        const handleChange = (event, id) => 
        {
            //use the findIndex method to loop through each persons array
            //return the index of the person in the loop, whos id matches the passed id 
            const personIndex = this.state.persons.findIndex(p =>{
                return p.id === id;
            });

            //creat a persons obj from the returned person obj using r\spread operator to spread out the values of the persons obj
            //and the person index
            const person = {
                ...this.state.persons[personIndex]
            };

            //update/change the name of the person using object dot notation nd the passed in event
            person.name = event.target.value;

            //get a copy of the persons array
            const persons = [...this.state.persons];
            //assign the updated/changed person object to the person at that index
            persons[personIndex] = person;

            //use setState to update the state with the updated persons array
            this.setState({persons: persons});
        }
        let person = null;
        if (this.state.show) {
            person = (
                <div>
                    {this.state.persons.map((person, index) => {
                        return <div>
                                    <h3 key={person.id}>The name is : {person.name} and the Age is: {person.age} | <span onClick={() => handleDel(index)}>Delete</span></h3>
                                    <input type="text" value={this.state.name} onChange={(event) => handleChange(event, person.id)} />
                                </div>
                    })}
                </div>
            );   
        }
        return (
            <div>
                <button onClick={changeShow.bind(this)}>Toggle Texts</button>
                {person}
            </div>
        )
    }
}
