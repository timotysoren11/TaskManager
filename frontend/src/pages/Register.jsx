import { useState } from "react";
import authApi from "../api/authApi";

const Register = ({ onRegisterSuccess }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      await authApi.post("/register", {
        username,
        email,
        password,
      });

      setSuccessMessage(
        "Account created successfully. Redirecting to sign in..."
      );

      // Clear form
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        onRegisterSuccess();
      }, 1500);

    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
        "Registration failed"
      );

      console.error(
        "Register Error:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <>
      {successMessage && (
        <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-green-700">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          {errorMessage}
        </div>
      )}

      <form
        onSubmit={handleRegister}
        className="flex flex-col gap-4"
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          className="border border-gray-300 rounded-lg px-3 py-2"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="border border-gray-300 rounded-lg px-3 py-2"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="border border-gray-300 rounded-lg px-3 py-2"
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(e.target.value)
          }
          className="border border-gray-300 rounded-lg px-3 py-2"
          required
        />

        <button
          type="submit"
          className="bg-slate-900 text-white py-3 rounded-lg hover:bg-slate-800 transition"
        >
          Create Account
        </button>
      </form>
    </>
  );
};

export default Register;