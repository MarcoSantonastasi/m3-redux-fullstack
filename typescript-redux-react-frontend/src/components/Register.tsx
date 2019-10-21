import React, { Component } from "react";
import { IWindow } from "../framework/IWindow";
import { IAction, ActionType } from "../framework/IAction";
import { IUser, IState } from "../state/appState";
import { reducerFunctions } from "../reducer/appReducer";
import Axios from "axios";

declare const window: IWindow;

interface IProps {}

interface IUserAction extends IAction {
  user: IUser;
}

reducerFunctions[ActionType.update_user] = (
  newState: IState,
  updateAction: IUserAction
) => {
  newState.BM.user = updateAction.user;
  return newState;
};

export default class Register extends Component {
  handleOnChange = (event: any) => {
    const user = window.CS.getBMState().user;
    let action: IUserAction;
    switch (event.target.name) {
      case "firstname":
        action = {
          type: ActionType.update_user,
          user: { ...user, firstname: event.target.value }
        };
        window.CS.clientAction(action);
        break;
      case "lastname":
        action = {
          type: ActionType.update_user,
          user: { ...user, lastname: event.target.value }
        };
        window.CS.clientAction(action);
        break;
      case "username":
        action = {
          type: ActionType.update_user,
          user: { ...user, username: event.target.value }
        };
        window.CS.clientAction(action);
        break;
      case "password":
        action = {
          type: ActionType.update_user,
          user: { ...user, password: event.target.value }
        };
        window.CS.clientAction(action);
        break;
    }
  };

  handleSubmit = (event: any) => {
    event.preventDefault();
    Axios.post("http://localhost:8080/signup", window.CS.getBMState().user)
      .then(res => console.log("oigioagiohagoaisdfogadfsg"))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form action="/signup" method="post" onSubmit={this.handleSubmit}>
          <label htmlFor="firstname">First Name:</label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            onChange={this.handleOnChange}
          />
          <br />
          <label htmlFor="lastname">Last Name:</label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            onChange={this.handleOnChange}
          />
          <br />
          <label htmlFor="username">User Name:</label>
          <input
            type="text"
            name="username"
            id="username"
            onChange={this.handleOnChange}
          />
          <br />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={this.handleOnChange}
          />
          <br />
          <button type="submit">Register!</button>
        </form>
      </div>
    );
  }
}
