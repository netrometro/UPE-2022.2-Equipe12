import { Link } from "react-router-dom";
import { useState } from "react";
import UpeMusic from "../../assets/upeMusic.png"
import { LayoutComponent } from "../../components/LayoutComponents";
import api from "../../services/api";

export const Register = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");

  const handleSignUpClick = async (e) => {
    e.preventDefault();
    if (password === password2) {
      if (name !== '' && email !== '' && password !== '' && password2 !== '') {
        try {
          await api.post("/register", {
            username: name,
            email: email,
            password: password
          })
          alert("Cadastrado com sucesso!")
        }catch(error){
          alert("Erro no registro: " + error.response.data.error)
        }
            
            
        }
      else {
        alert('Preencha todos os campos!')
      }
    }
    else {
      alert('As senhas não coincidem!')
    }
  }

  return (
    <LayoutComponent>
      <span className="login-form-title"> Criar conta </span>

      <span className="login-form-title">
        <img src={UpeMusic} alt="Upe Music" />
      </span>

      <div className="wrap-input">
        <input
          className={name !== "" ? "has-val input" : "input"}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <span className="focus-input" data-placeholder="Nome"></span>
      </div>

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
        <span className="focus-input" data-placeholder="Sua senha"></span>
      </div>

      <div className="wrap-input">
        <input
          className={password !== "" ? "has-val input" : "input"}
          type="password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
        />
        <span className="focus-input" data-placeholder="Repita sua senha"></span>
      </div>

      <div className="container-login-form-btn">
        <button className="login-form-btn" onClick={handleSignUpClick}>Cadastrar-se</button>
      </div>

      <div className="text-center">
        <span className="txt1">Já possui conta? </span>
        <Link className="txt2" to="/">
          Clique aqui!
        </Link>
      </div>

    </LayoutComponent>)
}