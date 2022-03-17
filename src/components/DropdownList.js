// @flow
import React from 'react';
import styled from 'styled-components';


const Select = styled.select`
  margin-top: 2rem;
  border-width: 1px;
  border-color: #5c5c5c;
  border-style: solid;
  height: 3rem;
  width: 500px;
  font-size: 1.2rem;
  text-indent: 0.625rem;
`;

  //type Props = {};
  
  type State = {
    error: null,
    isLoaded: boolean,
    items: Array<string>
  };

  export class DropdownList extends React.Component<State> { //props: Props, 
    state = { error: null, isLoaded: false, items: [] };

    componentDidMount() {
      fetch("https://gist.githubusercontent.com/bleonard33/be9e060afc8be3925ab20188b160e483/raw/96f860da16984aacb7db297daa48cf12f50420f7/hierarchy.json")
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              items: result
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

    render() {
      const { error, isLoaded, items } = this.state;

      /*const region = items.filter(function (el) {
        return el.parent === null;
      });

      const state = items.filter(function (el) {
        return el.level === 'state'; //parent is region
      });

      const county = items.filter(function (el) {
        return el.level === 'county'; //parent is state
      });*/

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
        return (
  
        <Select
         id="counties"
         //onClick={this.handleSelectChange}
         > 
        <option value="">Please select a county</option>
        {items.map((item) => (
          <>
            {item.parent === null ? (
              <>
              <option value={item.name} key={item.id.toString()}>{item.name}</option>
              </>
            ) : null}
          })
          </>
        ))}
        </Select> 
        
        )
    }
  }

}
export default DropdownList;