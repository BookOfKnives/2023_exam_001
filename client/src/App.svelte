<script>
import { onMount } from "svelte"; 

let inputName = "";
let username = "";
let inputPassword = "";
let inputEmail = "";

// console.log("028 src app dot env?", process.env);

function sendLogin() {
  let usernameAndPassword = { username: inputName, password: inputPassword };
  console.log("src app 1: sendinput: usernamenandpassword:", usernameAndPassword);
  postData("http://localhost:8080/auth/login/password", usernameAndPassword);
  clearInputFields();
}

async function sendRegistration() {
  let usernameAndPasswordAndEmail = { username: inputName, password: inputPassword, email: inputEmail };
  console.log("028 bship src app 2: hitting sendRegistration, data:", usernameAndPasswordAndEmail);
  // fetch her -- send data til backend, som skal tjekke navn og inputPassword. Navnm skal være unikt -- email skal være email -- password skal ikke være blæank
  postData("http://localhost:8080/auth/register", usernameAndPasswordAndEmail);
  clearInputFields();
}

function clearInputFields() {
  inputEmail = "";
  inputName = "";
  inputPassword = "";
}

async function postData(url, data) {
  const postFetchInit = {
    method: "POST",
    credentials: "include",
    mode:"cors",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
    },
   body: JSON.stringify(data)

    
  }

  const response = await fetch(url, postFetchInit);
  const json = await response.json();
  console.log("028 bship src app 3: response from fetcH:", json)
}


// can use fetch to send query of username to database? expose api ... fetch.
// det første den skal gøre er at tjekke sessionStorage. 
// hvad gør express session?
// hvor skal det være --- Headers. app er src er clientside. cklienten har sit sessionid i cookie -- det skal sendes til serverr 

onMount(async () => {
      // const response = await fetch("localhost:8080/users/getsession", {
      //   credentials: "include"
      // });
      // const result = await response.json();

      // username = result.data;
    });
</script>

<main>
some input data here -- bruger kommer ind -- tjek hans session -- vis login skærm (skab ny eller login)
<input bind:value={inputName}>
<input bind:value={inputPassword}>
<button on:click={sendLogin}>Login</button>

Not a member yet? REGISTER.
<input bind:value={inputName}>
<input bind:value={inputPassword}>
<input bind:value={inputEmail}>
<button on:click={sendRegistration}>Send registry-input </button>

huskeliste git things ...fedt mand. S


</main>

<style>

</style>
