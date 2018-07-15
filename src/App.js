import React, { Component } from 'react';
import './App.css';
import Table from "./components/Table";
import Pagination from "./components/Pagination";
import axios from 'axios';
import ClientInfo from "./components/ClientInfo";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allClients: [],
            currentClients: [],
            currentPage: null,
            totalPages: null,
            clientInfo: null,
            sortField: 'id',
            reverse: false,
        };

        this.onPageChanged = this.onPageChanged.bind(this);
        this.getClient = this.getClient.bind(this);
        this.handleSort = this.handleSort.bind(this);
    }

    componentDidMount() {
        axios.get('/api/clients')
            .then((res) => {
                this.setState({
                    allClients: res.data
                });
            })
            .catch(function (err) {
                console.log(err);
        });
    }

    onPageChanged (data) {
        const { allClients } = this.state;
        const { currentPage, totalPages, pageLimit } = data;

        const offset = (currentPage - 1) * pageLimit;
        const currentClients = allClients.slice(offset, offset + pageLimit);

        this.setState({ currentPage, currentClients, totalPages });
    };

    getClient(id) {
        const {currentClients} = this.state;
        const client = currentClients.find(client => client.id === id);
        this.setState({clientInfo: client})
    }

    handleSort(field) {
        const { sortField, reverse} = this.state;
        if (sortField === field) {
            this.setState((prevState) => {
                return {reverse: !prevState.reverse}
            });
        }

        this.setState({
            sortField: field
        })

    }

  render() {
      const totalClients = this.state.allClients.length;
      if (totalClients === 0) return null;

      //sorting
      const { sortField, reverse, allClients} = this.state;
      let primer;
      if (sortField === 'id') {primer = 'number'}
      else if (sortField === 'firstName' || 'lasName' || 'email') {primer = 'string'}
      else if ( sortField === 'phone' ) { primer = 'phone' }

      const sortItems = allClients.sort(sortBy(sortField, reverse, primer));

      return (
          <div className="App">
              <Table items={this.state.currentClients}
                     sortItems = {sortItems}
                     onGetClient={this.getClient}
                     onHandleSort = {this.handleSort}/>
              <div className="container-other">
              <Pagination
                  totalRecords={totalClients}
                  pageLimit={50}
                  pageNeighbours={1}
                  onPageChanged={this.onPageChanged}
              />
              {(this.state.clientInfo === null) ? null :
              <ClientInfo item={this.state.clientInfo}
              />
              }
              </div>
          </div>
      );
  }
}

const sortBy = (field, reverse, primer) => {

    let key;
    if ( primer ==='string') {
        key =  (x) => {return (x[field]).toUpperCase()}
    } else if (primer === 'number') {
        key = (x) => {return Number(x[field])}
    } else if (primer === 'phone') {
        key = (x) => {return  Number((x[field]).replace(/\D+/g,""))}
    }

    reverse = !reverse ? 1 : -1;

    return (a, b) => {
        return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
    }
};

export default App;
