import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../App.css';

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const { item } = this.props;
        return (
            <tr onClick={() => this.props.getClient(item.id)}>
                <td>{item.id}
                </td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
            </tr>
        );
    }
}

Item.propTypes = {

};
export default Item;