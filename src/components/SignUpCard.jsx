import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import colorTheme from "../themes/colorTheme";
import { useAuth } from "../context/AuthContext";

export default function SignUpCard({ color }) {
  const navigate = useNavigate();
  const theme = colorTheme[color] || colorTheme["blue"];
  const { signUp } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: signUp,
    onSuccess: () => navigate("/"),
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { email, password, confirmPassword, name } = formData;

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    mutate({ email, password, name });
  }

  function toSignIn() {
    navigate("/signIn");
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-3 py-3 lg:px-6 lg:w-md w-2xs bg-white rounded-xl m-6 md:m-0">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <button
          onClick={() => navigate("/")}
          className="block mx-auto cursor-pointer"
        >
          <img alt="Your Company" src="/barLogo.png" className="h-20 w-auto" />
        </button>

        <h2 className="mt-3 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Create your Florette account
        </h2>
      </div>

      <div
        className={`mt-10 sm:mx-auto sm:w-full sm:max-w-sm p-6 ${theme.bg} rounded-xl`}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {["name", "email", "password", "confirmPassword"].map((field, i) => (
            <div key={i}>
              <label
                htmlFor={field}
                className="block text-sm font-medium text-gray-900 capitalize"
              >
                {field === "confirmPassword" ? "Confirm Password" : field}
              </label>
              <div className="mt-2">
                <input
                  id={field}
                  name={field}
                  type={
                    field === "password" || field === "confirmPassword"
                      ? "password"
                      : "text"
                  }
                  required
                  value={formData[field]}
                  onChange={handleChange}
                  autoComplete={field}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
          ))}

          {isError && <p className="text-sm text-red-600">{error.message}</p>}

          <div>
            <button
              type="submit"
              className={`flex w-full justify-center items-center gap-2 rounded-md ${theme.buttonBg} px-3 py-1.5 text-sm/6 font-semibold ${theme.buttonText} shadow-xs ${theme.buttonHover} ${theme.buttonFocus}`}
              disabled={isPending}
            >
              {isPending && (
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
              )}
              <span>{isPending ? "Signing up..." : "Sign up"}</span>
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Already a member?{" "}
          <button
            onClick={toSignIn}
            className={`font-semibold ${theme.linkText}`}
          >
            SignIn
          </button>
        </p>
      </div>
    </div>
  );
}
