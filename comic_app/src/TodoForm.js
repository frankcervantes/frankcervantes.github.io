import React, { Component } from 'react';


class TodoForm extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      inputFields: {
        title:"",
        author:"",
        description:"",
        id:""
      },
      formValid:false,
      submit:false
    }
    this.handleChange = this.handleChange.bind(this);
    this._onFormSubmit = this._onFormSubmit.bind(this);
    this.temp = this.temp.bind(this)

  }
  handleChange(event) {

    var values = this.state.inputFields;
    // const red = event.target.name

    values[event.target.name] = event.target.value
  

    this.setState({inputFields:values})
    // this.setState({value: event.target.value});
  }

  _onFormSubmit(e,inputFields){

    e.preventDefault()
    
    var emptyFields = []
    for (var field in inputFields) { 
      if(inputFields[field] == ""){
        emptyFields.push(field)
      }
    }
    
    var formValid = this.state.formValid;


    if(emptyFields.length > 0){
       formValid = false
    }else{
      formValid = true
    }
 
    if(emptyFields.length > 0){
      this.setState({emptyFields});
    }else{
      this.props.handleSubmit(e)
    }

    this.setState({formValid});

    this.setState({submit:true})
    
  }

  temp(){

    return(
        <div className="form-style-8">
            <h3>Missing Fields:</h3>
           {this.state.emptyFields.map(i => {return (<div key={i}><label>- {i}</label><br/></div>)})}
        </div>
    )
  }

  render(){
    return (
      <div>
        {(this.state.submit && !this.state.formValid) ? this.temp() : null}
        <form className="form-style-8" onSubmit={(e) => this._onFormSubmit(e,this.state.inputFields)} ref={(el) => this.myFormRef = el} >
          <label>
            Title:<input type="text" name="title"  onChange={this.handleChange}/>
            Author:<input type="text" name="author"  onChange={this.handleChange}/>
            description:<input type="text" name="description"  onChange={this.handleChange}/>
            id:<input type="number" name="id"  onChange={this.handleChange}/>
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
};

export default TodoForm;