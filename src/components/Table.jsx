import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Item from "./Item.jsx";
import '../App.css';

const getRandomInRange = (min=10000000, max=99999999) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

class Table extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {sortItems} = this.props;
        const childElements = sortItems.map(item => {
            return (
                <Item item={item}
                      key={getRandomInRange()}
                      getClient={this.props.onGetClient}
                />
            )
        });

        return (
            <div>
                <table className="table ">
                    <thead className="thead-dark">
                    <tr>
                        <th>
                            <span className='icon-up'
                                  onClick={() => this.props.onHandleSort('id')}>
                                id
                            </span>
                        </th>
                        <th>
                            <span className='icon-down'
                                  onClick={() => this.props.onHandleSort('firstName')}>
                                firstName
                            </span>
                        </th>
                        <th>
                            <span className='icon-down'
                                  onClick={() => this.props.onHandleSort('lastName')}>
                                lastName
                            </span>
                        </th>
                        <th>
                            <span className='icon-down'
                                  onClick={() => this.props.onHandleSort('email')}>
                                email
                            </span>
                        </th>
                        <th>
                            <span className='icon-down'
                                  onClick={() => this.props.onHandleSort('phone')}>
                                phone
                            </span>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {childElements}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Table;