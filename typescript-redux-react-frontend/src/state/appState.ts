export interface IUI {
  Login: ILogin;
  counter: number;
  loggedIn: boolean;
  waitingForResponse: boolean;
}

export interface IAssetData {
  _id: string;
  asset_name: string;
  asset_value: number;
}

export interface IUser {
  firstname: String;
  lastname: String;
  username: String;
  password: String;
}

export interface IBM {
  user: IUser;
  assets: IAssetData[];
}

export interface IState {
  UI: IUI;
  BM: IBM;
}

// initial state
export const initial: IState = {
  UI: {
    Login: { errorMessage: "" },
    counter: 0,
    loggedIn: false,
    waitingForResponse: false
  },
  BM: {
    user: {
      firstname: "",
      lastname: "",
      username: "",
      password: ""
    },
    assets: []
  }
};

interface ILogin {
  errorMessage: string;
}
