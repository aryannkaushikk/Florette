import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import colorTheme from "../themes/colorTheme";
import { useAuth } from "../context/AuthContext";

export default function SignInCard({ color = "blue" }) {
  const navigate = useNavigate();
  const theme = colorTheme[color] || colorTheme["blue"];
  const { signIn } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: signIn,
    onSuccess: () => navigate("/"),
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    mutate(formData);
  }

  function toSignUp() {
    navigate("/signUp");
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-3 py-6 md:px-6 md:py-12 lg:px-8 w-2xs md:w-md bg-white rounded-xl">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <button
          onClick={() => navigate("/")}
          className="block mx-auto cursor-pointer"
        >
          <img alt="Your Company" src="/barLogo.png" className="h-20 w-auto" />
        </button>

        <h2 className="mt-3 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div
        className={`mt-10 sm:mx-auto sm:w-full sm:max-w-sm p-6 ${theme.bg} rounded-xl`}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Password
              </label>
              <div className="text-sm">
                <a href="#" className={`font-semibold ${theme.linkText}`}>
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          {/* Error Message */}
          {isError && <p className="text-sm text-red-600">{error.message}</p>}

          {/* Submit */}
          <div>
            <button
              type="submit"
              disabled={isPending}
              className={`flex w-full justify-center rounded-md ${theme.buttonBg} px-3 py-1.5 text-sm/6 font-semibold ${theme.buttonText} shadow-xs ${theme.buttonHover} ${theme.buttonFocus}`}
            >
              {isPending ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Not a member?{" "}
          <button
            onClick={toSignUp}
            className={`font-semibold ${theme.linkText}`}
          >
            SignUp
          </button>
        </p>
      </div>
    </div>
  );
}
