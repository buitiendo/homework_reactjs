import React, { Component } from "react";
import { Container, Row, Col } from "react-grid-system";
import * as keys from './Constant';
import Pagination from 'react-js-pagination';

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Reactjs Homework 2",
      act: 0,
      index: "",
      key: "",
      name: null,
      email: null,
      formErrors: {
        name: "",
        email: ""
      },
      hover: false,
      isEdited: false,
      datas: JSON.parse(localStorage.getItem("datas")) || []
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress, false);
      this.handleKeyPress();
  }


  handleKeyPress = (e) => {
    let activePage = this.props.activePage;
        console.log(this.props.activePage)
        switch (e?.key) {
        case keys.pageUp:
            this.props.handlePageChange(++activePage)
            break;
        case keys.pageDown:
            this.props.handlePageChange(--activePage)
            break;
        case keys.home:
            this.props.handleJumpToPage(false)
            break;
        case keys.end:
            this.props.handleJumpToPage()
            break;

        default:
            break;
    }
  }

  handlePageChange = (pageNumber) => {
    this.props.handlePageChange(pageNumber);
  }

  componentDidUpdate() {
    localStorage.setItem("datas", JSON.stringify(this.state.datas));
  }

  fSubmit = e => {
    e.preventDefault();
    let datas = this.state.datas;
    let name = this.refs.name.value;
    let email = this.refs.email.value;

    if (this.state.act === 0) {
      let data = {
        name,
        email
      };
      datas.push(data);
    } else {
      let index = this.state.index;
      datas[index].name = name;
      datas[index].email = email;
    }

    this.setState({
      datas: datas,
      act: 0
    });

    this.refs.myForm.reset();
    this.refs.name.focus();
  };

  fRemove = i => {
    let datas = this.state.datas;
    datas.splice(i, 1);
    this.setState({
      datas: datas
    });

    this.refs.myForm.reset();
    this.refs.name.focus();
  };

  fCancel = () => {
    this.setState({
      editStatus: false,
      editUser: "",
      editIndex: ""
    });
  };

  fEdit = i => {
    let data = this.state.datas[i];
    this.refs.name.value = data.name;
    this.refs.email.value = data.email;

    this.setState({
      act: 1,
      index: i,
      isEdited: true
    });
    this.refs.name.focus();
  };

  fCancel = () => {
    let datas = this.state.datas;

    this.setState({
      datas: datas
    });
  };

  setIsShow = i => {
    this.setState({
      hover: true,
      key: i
    });
  };

  setIsOff = i => {
    this.setState({
      hover: false,
      key: i
    });
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "name":
        formErrors.name =
          value.length < 6 ? "minimum 6 characters required" : "";
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value });
  };

  render() {
    let datas = this.state.datas;
    const { formErrors } = this.state;
    return (
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
                {datas.map((data, i) => (
                  <tr
                    key={i}
                    className="myList"
                    onMouseOver={() => this.setIsShow(i)}
                    onMouseLeave={() => this.setIsOff(i)}
                  >
                    <td>{data.name}</td>
                    <td>{data.email}</td>
                    <td className="text-center">
                      {this.state.key === i &&
                      this.state.hover &&
                      !this.state.isEdited ? (
                        <button
                          onClick={() => this.fEdit(i)}
                          className="editButton"
                        >
                          Edit
                        </button>
                      ) : null}
                    </td>
                    <td className="text-center">
                      {this.state.key === i &&
                      this.state.hover &&
                      !this.state.isEdited ? (
                        <button
                          onClick={() => this.fRemove(i)}
                          className="removeButton"
                        >
                          Delete
                        </button>
                      ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
              <Pagination
                activePage={this.props.activePage}
                itemsCountPerPage={this.props.perPage}
                totalItemsCount={this.props.total}
                pageRangeDisplayed={this.props.pageRange}
                prevPageText="Prev"
                nextPageText="Next"
                itemClass="page-item"
                linkClass="page-link"
                onChange={this.handlePageChange}
              />
            </table>
          </Col>
          <Col xs={6}>
            <form ref="myForm" className="myForm">
              <div>
                <input
                  className="formField"
                  placeholder="Name"
                  type="text"
                  ref="name"
                  name="name"
                  noValidate
                  onChange={this.handleChange}
                />
                {formErrors.name.length > 0 && (
                  <span className="errorMessage">{formErrors.name}</span>
                )}
                <input
                  className="formField"
                  placeholder="Email"
                  type="email"
                  name="email"
                  ref="email"
                  noValidate
                  onChange={this.handleChange}
                />
                {formErrors.email.length > 0 && (
                  <span className="errorMessage">{formErrors.email}</span>
                )}
              </div>
              <div>
                <button onClick={e => this.fSubmit(e)} className="saveButton">
                  Save
                </button>
                <button onClick={e => this.fCancel(e)} className="cancelButton">
                  Cancel
                </button>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Body;
