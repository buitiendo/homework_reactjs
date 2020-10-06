import React, {Component} from 'react'
import { Container, Row, Col } from 'react-grid-system';
class App extends Component {
  constructor(props){
    super(props);
    this.state={
      title: 'Reactjs Homework 2',
      act: 0,
      index: '',
      key: '',
      hover: false,
      isEdited: false,
      datas: JSON.parse(localStorage.getItem('datas')) || [],
    }
  }

  componentDidMount(){
    this.refs.name.focus();
  }

  componentDidUpdate() {
    localStorage.setItem('datas', JSON.stringify(this.state.datas));
  }

  fSubmit = (e) => {
    e.preventDefault();
    let datas = this.state.datas;
    let name = this.refs.name.value;
    let email = this.refs.email.value;

    if (this.state.act === 0) {
      let data = {
        name, email
      } 
      datas.push(data);
    } else {
      let index = this.state.index;
      datas[index].name = name;
      datas[index].email = email;
    }

    this.setState({
      datas: datas,
      act: 0
    })

    this.refs.myForm.reset();
    this.refs.name.focus();
  }

  fRemove = (i) => {
    let datas = this.state.datas;
    datas.splice(i, 1);
    this.setState({
      datas: datas
    })

    this.refs.myForm.reset();
    this.refs.name.focus();
  }

  fCancel = () => {
    this.state.hideEditForm()
  }

  fEdit = (i) => {
    let data = this.state.datas[i];
    this.refs.name.value = data.name;
    this.refs.email.value = data.email;

    this.setState({
      act: 1,
      index: i,
      isEdited: true
    });
    this.refs.name.focus();
  }

  fCancel = () => {
    let datas = this.state.datas;

    this.setState({
      datas: datas,
    });
  }

  setIsShow = (i) => {
    this.setState({
      hover: true,
      key: i,
    });
  }

  setIsOff = (i) => {
    this.setState({
      hover: false,
      key: i
    });
  }  

  render() {
    let datas = this.state.datas;
    return (
      <div className="App">
        <h2 className="">Header</h2>
        <Container>
          <Row>
            <Col xs={6} className="left_content">
              <table className="table table-hover table-bordered">
                <thead className="col-sm-12 border border-bottom-0 border-secondary text-center">
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {datas.map((data, i) => 
                    <tr key={i} className="myList" onMouseOver={()=>this.setIsShow(i)} onMouseLeave={()=>this.setIsOff(i)} >
                      <td>{data.name}</td>
                      <td>{data.email}</td>
                      <td className="text-center">
                        { 
                          ((this.state.key === i && this.state.hover) && !this.state.isEdited) ?
                          <button onClick={()=> this.fEdit(i)} className="editButton">Edit</button>
                          : null
                        }

                      </td>
                      <td className="text-center">
                        { 
                          ((this.state.key === i && this.state.hover) && !this.state.isEdited) ?
                          <button onClick={()=>this.fRemove(i)} className="removeButton">Delete</button>
                          : null
                        }
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </Col>
            <Col xs={6}>
              <form ref="myForm" className="myForm">
                <input type="text" ref="name" placeholder="name" className="formField" />
                <input type="text" ref="email" placeholder="email" className="formField" />
                <button onClick={(e)=>this.fSubmit(e)} className="saveButton">Save</button>
                <button onClick={()=>this.fCancel} className="cancelButton">Cancel</button>
              </form>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default App
