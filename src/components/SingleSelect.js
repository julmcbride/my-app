import React, { Component, Fragment } from 'react';

import Select from 'react-select';

interface State {
  isClearable: boolean;
  isDisabled: boolean;
  isLoading: boolean;
  isRtl: boolean;
  isSearchable: boolean;
}

export default class SingleSelect extends Component<{}, State> {
  state: State = {
    isClearable: true,
    isDisabled: false,
    isLoading: false,
    isRtl: false,
    isSearchable: true,
  };

  componentDidMount() {
    fetch("https://gist.githubusercontent.com/bleonard33/be9e060afc8be3925ab20188b160e483/raw/96f860da16984aacb7db297daa48cf12f50420f7/hierarchy.json")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result//.items
          });
        },
        //handle errors here
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  toggleClearable = () =>
    this.setState((state) => ({ isClearable: !state.isClearable }));
  toggleDisabled = () =>
    this.setState((state) => ({ isDisabled: !state.isDisabled }));
  toggleLoading = () =>
    this.setState((state) => ({ isLoading: !state.isLoading }));
  toggleRtl = () => this.setState((state) => ({ isRtl: !state.isRtl }));
  toggleSearchable = () =>
    this.setState((state) => ({ isSearchable: !state.isSearchable }));

  render() {

    const { isClearable, isSearchable, isDisabled, isLoading, isRtl, items } =
      this.state;


      items.forEach(function (item) {
        item.value = item.name;
        item.label = item.name;
      });
      


    return (
      <Fragment>
        <Select
          className="basic-single"
          classNamePrefix="select"
          //defaultValue={colourOptions[0]}
          isDisabled={isDisabled}
          isLoading={isLoading}
          isClearable={isClearable}
          isRtl={isRtl}
          isSearchable={isSearchable}
          name="county"
          options={items}
        />

        <div
          style={{
            color: 'hsl(0, 0%, 40%)',
            display: 'inline-block',
            fontSize: 12,
            fontStyle: 'italic',
            marginTop: '1em',
          }}
        >
        </div>
      </Fragment>
    );
  }
}
