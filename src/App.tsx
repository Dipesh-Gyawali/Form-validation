import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [inputError, setInputError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);


  const handleChange = (e) => {
    // let name = [e.target.name];
    // let value = e.target.value;

    setInput({ ...input, [e.target.name]: e.target.value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    setInputError(validate(input));
    setIsSubmit(true);
  };

  //not required code ho.......error lai track garya ho
  useEffect(() => {
    console.log(inputError, "useffect ko ho");
    if (Object.keys(inputError).length === 0 && isSubmit) {
      console.log(input, "aaaaaaaaaaa success vayo");
    }
  }, [inputError]);


  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    return errors;
  };


  return (
    <>
      <div>
        {Object.keys(inputError).length === 0 && isSubmit ? (
          <div className="ui message success">Signed in successfully</div>
        ) : (
          <pre>{JSON.stringify(input)}</pre>
        )}

        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username </label>
          <input
            type="text"
            name="username"
            value={input.username}
            onChange={handleChange}
          />
          <p>{inputError.username}</p>
          <br></br>

          <label htmlFor="email">email</label>
          <input
            type="email"
            name="email"
            value={input.email}
            onChange={handleChange}
          />
          <p>{inputError.email}</p>

          <br></br>

          <label htmlFor="password">password</label>
          <input
            type="password"
            name="password"
            value={input.password}
            onChange={handleChange}
          />
          <p>{inputError.password}</p>
          <br></br>

          <button type="submit">Submit</button>
          <br></br>
        </form>
      </div>
    </>
  );
}

export default App;
