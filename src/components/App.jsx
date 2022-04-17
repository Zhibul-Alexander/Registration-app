import React from "react";
import { CheckboxGroup } from "./common/CheckboxGroup";
import { GenderOptions, GENDERS} from "./constant";
import { Modal } from "./Modal/Modal";
import {ErrorBoundary} from "./ErrorBoundary/ErrorBoundary";
import { RegistrationCtx } from "./Ctx";
import style from "./app.module.css";
import "./index.css"

export class App extends React.Component {
  state = {
    login: "",
    password: "",
    gender: GENDERS.MAN,
    getNews: true,
    isModalVisible: false,
    errorLogin: "",
    errorPassword: "",
  }
  
  handleInputLogin = ({target}) => {
    this.setState({login: target.value})
  };

  handleInputPassword = ({target}) => {
    this.setState({password: target.value})
  };

  toggleGender = ({target}) => {
    this.setState({gender: target.value})
  }

  handleCheckbox = () => {
    this.setState({getNews: !this.state.getNews})
  }

  handleRegistrationBtn = () => {
    if (this.state.login.length < 5) {
      this.setState({ errorLogin: "Минимальная длина поля 5 символов" });
    } else {this.setState({ errorLogin: "" });
    }
    if (this.state.password.length < 5) {
      this.setState({ errorPassword: "Минимальная длина поля 5 символов" });
    } else {this.setState({ errorPassword: "" });
    }
    if (this.state.login.length >= 5 && this.state.password.length >= 5) {
      this.setState({isModalVisible: true, errorLogin: "", errorPassword: ""});
    }
  };

  modalCloseHandler = () => {
    this.setState({isModalVisible: false, login: "", password: ""})
  }

  render() {

    const {
      login,
      password,
      gender,
      getNews,
      isModalVisible,
      errorLogin,
      errorPassword,
    } = this.state

    return (
      <div className={style.wrapper}>
        <h1 className={style.title}>Регистрационная форма:</h1>
        <form className={style.form}>
          <input className={style.input} placeholder="Login ..." type="text" value={login} onChange={this.handleInputLogin}/>
          {errorLogin && <span className={style.textError}>{errorLogin}</span>}
          <input className={style.input} placeholder="Password ..." type="password" value={password} onChange={this.handleInputPassword}/>
          {errorPassword && <span className={style.textError}>{errorPassword}</span>}
          <CheckboxGroup className={style.checkbox} options={GenderOptions} value={gender} onChange={this.toggleGender}/>
          <div className={style.news}>
            <span className={style.textNews}>Подпишитесь на новости!</span>
            <input type="checkbox" checked={getNews} onChange={this.handleCheckbox}/>
          </div>
          <button className={style.submitBtn} type="button" onClick={this.handleRegistrationBtn} >Зарегистрироваться</button>
        </form>
        <ErrorBoundary>
          <RegistrationCtx.Provider value={this.state}>
            {isModalVisible && (
              <Modal
                login={login}
                password={password}
                getNews={getNews}
                gender={gender}
                onClose={this.modalCloseHandler}
                onClick={this.modalCloseHandler}
              />
            )}
          </RegistrationCtx.Provider>
        </ErrorBoundary>
      </div>
    );
  }
}