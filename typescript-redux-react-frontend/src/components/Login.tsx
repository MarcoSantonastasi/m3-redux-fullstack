import React, { Component } from "react";
import { IWindow } from "../framework/IWindow";
import { IAction, ActionType } from "../framework/IAction";
import { IUser, IState } from "../state/appState";
import { reducerFunctions } from "../reducer/appReducer";
import Axios from "axios";
import { string } from "prop-types";

declare const window: IWindow;

interface IProps {}

interface IErrorMessage extends IAction {
  errorMessage: string;
}

interface IUserAction extends IAction {
  user: IUser;
}

reducerFunctions[ActionType.update_user] = (
  newState: IState,
  action: IUserAction
) => {
  newState.BM.user = action.user;
  return newState;
};

reducerFunctions[ActionType.login_error] = (
  newState: IState,
  action: IErrorMessage
) => {
  newState.UI.waitingForResponse = false;
  newState.UI.Login.errorMessage = action.errorMessage;
  return newState;
};

reducerFunctions[ActionType.user_logged_in] = (
  newState: IState,
  action: IUserAction
) => {
  newState.UI.waitingForResponse = false;
  newState.UI.loggedIn = true;
  newState.BM.user = action.user;
  return newState;
};

reducerFunctions[ActionType.user_logged_out] = (
  newState: IState,
  action: IUserAction
) => {
  newState.UI.loggedIn = false;
  newState.BM.user = {
    firstname: "",
    lastname: "",
    username: "",
    password: ""
  };
  return newState;
};

export default class Login extends Component {
  handleLogOut = (event: any) => {};

  render() {
    if (!window.CS.getUIState().loggedIn) {
      return (
        <div>
          <h1>Login</h1>
        </div>
      );
    } else if (window.CS.getUIState().loggedIn) {
      return (
        <div>
          <h1>LOGGED IN</h1>
          <p>You are logged in as: {window.CS.getBMState().user.firstname}</p>
          <br />
          <button type="reset" onClick={this.handleLogOut}>
            Log OUT
          </button>
        </div>
      );
    }
  }
}
