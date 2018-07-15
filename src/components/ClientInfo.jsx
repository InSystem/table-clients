import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../App.css';


class ClientInfo extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { item } = this.props;
        return (
            <div className="card text-left" style={{width: "30rem"}}>
                <div className="card-body">
                    <p className="card-text"> Выбран пользователь <b>{item.firstName} {item.lastName}</b></p>
                    <p className="card-text">Описание:
                        {item.description}
                    </p>
                    <p className="card-text"> Адрес проживания:<b>{item.address.streetAddress}</b></p>
                    <p className="card-text">Город:<b>{item.address.city}</b></p>
                    <p className="card-text">Провинция/штат:<b>{item.address.state}</b></p>
                    <p className="card-text">Индекс: <b>{item.address.zip}</b></p>
                </div>
            </div>
        );
    }
}

ClientInfo.propTypes = {

};
export default ClientInfo;