function login() {
    // FAz requisiçao para a API
    let token = "xx";

    localStorage.setItem("token", token);
  }

  login();

  alert(localStorage.getItem("token"));