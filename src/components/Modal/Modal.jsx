import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { RegistrationCtx } from "../Ctx";

const body = document.querySelector("body");

export class Modal extends React.Component {

  static contextType = RegistrationCtx;

  componentDidMount() {
    body.addEventListener("keyup", this.keyPressHandler);
  }
  
  componentWillUnmount() {
    body.removeEventListener("keyup", this.keyPressHandler);
  }

  keyPressHandler = (event) => {
    if (event.keyCode === 27) {
      this.props.onClose()
    }
  };
  
    render () {
        const Modal = (
          <div className="modal">
            <span>Регистрация выполнена успешно !</span>
            <span> Логин: {this.context.login}</span>
            <span>Пароль: {this.context.password}</span>
            <span>Пол: {this.context.gender}</span>
            {this.context.getNews && <span>Вы подписались на новости</span>}
            {!this.context.getNews && <span>Вы не подписались на новости</span>}
            <button type="button" onClick={this.props.onClick} onClose={this.props.onClose}>
              ок
            </button>
          </div>
        );
        return ReactDOM.createPortal(Modal, body);
    }
};

Modal.propTypes = {
  login: PropTypes.string,
  password: PropTypes.string,
  gender: PropTypes.string,
  getNews: PropTypes.bool,
}