import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isLoading: false,
      isError: false
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    const response = await fetch("https://jsonplaceholder.typicode.com/albums/1/photos");
    if (response.ok) {
      const users = await response.json();
      this.setState({ users, isLoading: false });
    } else {
      this.setState({ isError: true, isLoading: false });
    }
  }
  renderTableHeader = () => {
    return Object.keys(this.state.users[0]).map((attr) => (
      <th key={attr}>{attr.toUpperCase()}</th>
    ));
  };

  renderTableRows = () => {
    return this.state.users.map((user) => {
      return (
        
        <tr key={user.id}>

          <td>{user.abumId}</td>
          <td>{user.id}</td>
          <td>{user.title}</td>
          <td>
            <img src={user.url} alt={user.id}/>
          </td>
          <td><img src={user.thumbnailUrl} alt={user.thumbnailUrl}/></td>
         
        </tr>
        
      );
    });
  };

  render() {
    const { users, isLoading, isError } = this.state;

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (isError) {
      return <div>Error</div>;
    }

    return users.length > 0 ? (
      <table>
        <thead>
          <tr>{this.renderTableHeader()}</tr>
        </thead>
        <tbody>{this.renderTableRows()}</tbody>
      </table>
    ) : (
      <div>No users.</div>
    );
  }
}

export default App;