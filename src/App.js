import React, { Component } from 'react';
import './App.css';
import Person from "./Person/Person"
import Radium, { StyleRoot } from "radium";
import ErrorBoundery from "./ErrorBoundery/ErrorBoundery"
import './Person/Person.css'

class App extends Component {
//setting up my state
  state = {
    persons: [
      {id:"hola1", name: "Max", age: 28},
      {id:"hola2", name: "Manu", age: 29},
      {id:"hola3", name: "Stephanie", age: 26}
    ],
    otherState: "some other value",
    showPersons: false
  }
// metod to handle deltes element of name
deletePersonHandler = (personIndex) => {
//this piece of code is not efficient ,never deal with original state object, create a copy of it, not using a reference to it,bad practice
  // const persons = this.state.persons
  // persons.splice(personIndex, 1)
  // this.setState({persons: persons})

  // const persons = this.state.persons.slice(); this is another optional way to copy an array of elements
  const persons = [...this.state.persons];
  persons.splice(personIndex,1)
  this.setState({
    persons: persons
  })

}
  
//method to handle a change name again 
  nameChangeHandler = (id, e) => {
// console.log(e.target)
    const personIndex = this.state.persons.findIndex(p => {
        return p.id === id
    })
    // console.log(personIndex)
    //another way to create copy of an object
    // const person = Object.assign({}, this.state.persons[personIndex])
    const person = {...this.state.persons[personIndex]}
    person.name = e.target.value
    //making a copy of original array and updating the name of the object of the copied Array
    const persons = [...this.state.persons]
    persons[personIndex] = person
    this.setState({
      persons: persons
    })

    // this.setState({
    //   persons: [
    //     {name: "Max", age: 28},
    //     {name: event.target.value, age: 29},
    //     {name: "Stephanie", age: 26}
    //   ]
    // })
  }

  //toggle method
  toggleShowPerson = () => {
    // const toggle = this.state.showPersons;
    // this.setState({showPersons: !toggle})
    this.setState(prevState => {
      return {
        showPersons: !prevState.showPersons
      }
    })
  }

  render() {

    const style = {
      backgroundColor: "white",
      font: "inherit",
      border: "1px solid blue",
      padding: "8px",
      cursor: "pointer",
      ":hover": {
        backgroundColor: "yellow",
        color: "green"
      }
    };

    let  persons = null;
    if(this.state.showPersons) {
      persons = 
          <div>
            {this.state.persons.map((person, index) => {
              return <ErrorBoundery key={person.id}><Person
                      name={person.name}
                      age={person.age}
                      // click={this.deletePersonHandler.bind(this, index)}
                      click={() => this.deletePersonHandler(index)}
                      // changed={(e) => this.nameChangeHandler(e, pe,rson.id)}
                      changed={this.nameChangeHandler.bind(null, person.id)}
                       /></ErrorBoundery>
            })}
               
          </div>

          style.backgroundColor = "blue"
          style[":hover"] = {
            backgroundColor: "purple",
            color: "white"
          }

    }

    const classes = [];
    if(this.state.persons.length <= 2) {
      classes.push("red")
    }
    if(this.state.persons.length <= 1) {
      classes.push("bold")
    }

    return (
      <StyleRoot>
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p className={classes.join(" ")}>This is really working!</p>
        <button
        style={style}
        onClick={this.toggleShowPerson}>Switch name</button>
       {/* onClick={this.switchNameHandler.bind(this,"Maximilian!!!!!!")}>Switch name</button> */}
        {persons}
      </div>
      </StyleRoot>
    );
  }
}

export default Radium(App);
