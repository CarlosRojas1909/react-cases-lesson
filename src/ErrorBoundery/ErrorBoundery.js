import React, { Component } from 'react'

export default class ErrorBoundery extends Component {

    state = {
        hasError: false,
        errorMessage: ""
    }

    componentDidCatch(error, info) {
        this.setState({
            hasError: true,
            errorMessage: error
        })
    }
  render() {

    if(this.state.hasError){
        return this.state.errorMessage
    } else {

       return this.props.children
    }
    
  }
}

