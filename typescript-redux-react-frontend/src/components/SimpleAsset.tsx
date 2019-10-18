import React from "react";
import { IAssetAction } from "./ShowAssets";
import { ActionType, IAction } from "../framework/IAction";
import { IAssetData, IState } from "../state/appState";

import { IWindow } from "../framework/IWindow";
import { reducerFunctions } from "../reducer/appReducer";
import axios from "axios";

declare let window: IWindow;

//this file defines the React component that renders a single asset to the browser window
//it also contains the logic to change asset properties and save the changes to the database
//most of the used React framework features are already explained in the comments of App.js
//so this code hopefully mostly explains itself ...

interface IProps {
  edit: boolean;
  asset: IAssetData;
}

interface IJSXState {
  edit_mode: boolean;
}

reducerFunctions[ActionType.create_asset] = function(
  newState: IState,
  action: IAssetAction
) {
  newState.BM.assets.push(action.asset);
  return newState;
};

reducerFunctions[ActionType.update_asset] = function(
  newState: IState,
  updateAction: IAssetAction
) {
  let assetToChange: IAssetData[] = newState.BM.assets.filter(
    asset => asset._id === updateAction.asset._id
  );
  console.log(assetToChange);
  assetToChange[0].asset_name = updateAction.asset.asset_name;
  assetToChange[0].asset_value = updateAction.asset.asset_value;
  return newState;
};

reducerFunctions[ActionType.delete_asset] = function(
  newState: IState,
  deleteAction: IAssetAction
) {
  let assetsToKeep: IAssetData[] = newState.BM.assets.filter(
    asset => asset._id !== deleteAction.asset._id
  );
  newState.BM.assets = assetsToKeep;
  return newState;
};

export default class SimpleAsset extends React.PureComponent<
  IProps,
  IJSXState
> {
  constructor(props: IProps) {
    super(props);

    this.handleSwitchToEditMode = this.handleSwitchToEditMode.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleSaveChanges = this.handleSaveChanges.bind(this);
    this.handleRerenderTest = this.handleRerenderTest.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

    this.state = {
      edit_mode: props.edit
    };
  }

  render() {
    //if the component is in edit mode, it will render different than if it just shows the data

    if (this.state.edit_mode)
      return (
        <tr>
          <td>
            <input
              type="text"
              name="name"
              value={this.props.asset.asset_name}
              onChange={this.handleNameChange}
            />
          </td>
          <td>
            <input
              type="number"
              name="value"
              value={this.props.asset.asset_value}
              onChange={this.handleValueChange}
            />{" "}
            €
          </td>
          <td>
            <button onClick={this.handleSaveChanges} id={this.props.asset._id}>
              Save changes
            </button>
            <button onClick={this.handleRerenderTest}>
              Increase State Counter {window.CS.getUIState().counter}
            </button>
          </td>
        </tr>
      );
    else
      return (
        <tr>
          <td>{this.props.asset.asset_name}</td>
          <td>{this.props.asset.asset_value} €</td>
          <td>
            <button onClick={this.handleSwitchToEditMode}>edit</button>
            <button onClick={this.handleDelete} id={this.props.asset._id}>
              sell or dispose
            </button>
            <button onClick={this.handleRerenderTest}>
              increase State Counter {window.CS.getUIState().counter}
            </button>
          </td>
        </tr>
      );
  }

  handleSwitchToEditMode() {
    this.setState({ edit_mode: true });
  }

  handleNameChange(event: any) {
    const newAsset = this.props.asset;
    newAsset.asset_name = event.target.value;
    const action: IAssetAction = {
      type: ActionType.update_asset,
      asset: newAsset
    };
    window.CS.clientAction(action);
  }

  handleValueChange(event: any) {
    const newAsset = this.props.asset;
    newAsset.asset_value = event.target.value;
    const action: IAssetAction = {
      type: ActionType.update_asset,
      asset: newAsset
    };
    window.CS.clientAction(action);
  }

  handleSaveChanges(event: any) {
    const IdOfAssetToUpdate = this.props.asset._id;
    axios
      .post(
        "http://localhost:8080/assets/update/" + IdOfAssetToUpdate,
        this.props.asset
      )
      .then(res => {
        console.log(res.data);
        this.setState({ edit_mode: false });
      })
      .catch(error =>
        console.log("Error: ", error, "while saving asset", this.props.asset)
      );
  }
  handleDelete(event: any) {
    const IdOfAssetToDelete = event.target.id;

    const action: IAssetAction = {
      type: ActionType.delete_asset,
      asset: this.props.asset
    };
    axios
      .delete("http://localhost:8080/assets/delete/" + IdOfAssetToDelete)
      .then(res => {
        console.log(res.data);
        window.CS.clientAction(action);
      })
      .catch(error =>
        console.log("Error: ", error, "while deleting asset", this.props.asset)
      );
  }
  handleRerenderTest(event: any) {
    const action: IAction = {
      type: ActionType.render_test
    };
    window.CS.clientAction(action);
  }
}
