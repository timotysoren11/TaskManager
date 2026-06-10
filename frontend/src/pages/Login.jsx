import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authApi from "../api/authApi";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await authApi.post(
        "/login",
        {
          email,
          password,
        }
      );

      // Save token
      localStorage.setItem(
        "token",
        response.data.token
      );

      // Save user details
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      console.log("Login Successful");

      navigate("/dashboard");

    } catch (error) {
      console.error(
        "Login Error:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col gap-4"
    >
      <input
        id="email"
        name="email"
        type="email"
        placeholder="Email..."
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        className="border border-gray-300 rounded px-3 py-2"
      />

      <input
        id="password"
        name="password"
        type="password"
        placeholder="Password..."
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
        className="border border-gray-300 rounded px-3 py-2"
      />

      <button
        type="submit"
        className="bg-black text-white py-2 px-4 rounded"
      >
        Login
      </button>
    </form>
  );
};

export default Login;