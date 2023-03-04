
import { Link } from "react-router-dom";
import { useState } from "react";
import UpeMusic from "../../assets/upeMusic.png"
import { LayoutComponent } from "../../components/LayoutComponents";
import api from "../../services/api";


export const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSignIn (){
    if(email !== '' && password !== ''){
      api.post("/authenticate",{
        email:email,
        password:password,
        
      })
    }
    else{
      alert('Preencha todos os campos')
    }
  }


  return (
    <LayoutComponent>

      <form className="login-form">
        <span className="login-form-title"> Bem vindo </span>

        <span className="login-form-title">
          <img src={UpeMusic} alt="Upe Music" />
        </span>

        <div className="wrap-input">
          <input
            className={email !== "" ? "has-val input" : "input"}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span className="focus-input" data-placeholder="Email"></span>
        </div>

        <div className="wrap-input">
          <input
            className={password !== "" ? "has-val input" : "input"}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="focus-input" data-placeholder="Password"></span>
        </div>

        <div className="container-login-form-btn">
          <button className="login-form-btn" onClick={handleSignIn}>Login</button>
        </div>

        <div className="text-center">
          <span className="txt1">Não possui conta? </span>
          <Link className="txt2" to="/register">
            Criar conta
          </Link>
        </div>
      </form>
    </LayoutComponent>
  )

}