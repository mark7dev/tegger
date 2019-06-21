import React, { Component } from 'react';
import './App.css';
import request from 'superagent';

class App extends Component {

  constructor(props) {
		super(props);
		this.state = {
      email: '',
			value: '',
			rows: 1,
			minRows: 1,
			maxRows: 100,
		};
	}
	
	handleChange = (event) => {
		const textareaLineHeight = 24;
		const { minRows, maxRows } = this.state;
		
		const previousRows = event.target.rows;
  	event.target.rows = minRows;
		
		const currentRows = ~~(event.target.scrollHeight / textareaLineHeight);
    
    if (currentRows === previousRows) {
    	event.target.rows = currentRows;
    }
		
		if (currentRows >= maxRows) {
			event.target.rows = maxRows;
			event.target.scrollTop = event.target.scrollHeight;
		}
    
  	this.setState({
    	value: event.target.value,
      rows: currentRows < maxRows ? currentRows : maxRows,
    });
  };

  handleChangeEmail = (e) => {
    this.setState({ email: e.target.value })
  }
  
  sendInfo = (e) => {
    e.preventDefault();
    console.log('ENVIADO');
    document.getElementById('form').reset();
    this.setState({ value: ''});


    request
    .post('https://api.github.com/repos/mark7dev/tegger/issues')
    .set({
      'Content-Type': 'application/json'
    })
    .send(this.state.email, this.state.value)
    .then(response => {
      console.log(response);
    })
    .catch(error=> console.error(error));
  }


  render() {
    return (
      <div className="App">
        <div className="form-container">
          <form id="form">
            <label>Issue</label>
            <textarea 
              rows={this.state.rows}
              value={this.state.value}
              // placeholder={'Enter your text here...'}
              className={'textarea'}
              onChange={this.handleChange}
            />
            <label>Email</label>
            <input type="email" onChange={this.handleChangeEmail}/>
            <button onClick={this.sendInfo} disabled={!this.state.value || !this.state.email}>ENVIAR</button>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
