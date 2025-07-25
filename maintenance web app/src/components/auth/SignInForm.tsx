import { useState } from "react";
<<<<<<< HEAD
import {  useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase";
import {  EyeCloseIcon, EyeIcon } from "../../icons";
import { Input, message } from "antd";
=======
import { Link } from "react-router";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
import { Input } from "antd";
>>>>>>> ff57b2d7942cd4b2e77c6dc1908f914fb036fb17
import Button from "../ui/button/Button";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
<<<<<<< HEAD
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      message.success("Login successful");
      navigate("/");
    } catch (error) {
      message.error(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      message.success("Google sign-in successful");
      navigate("/");
    } catch (error) {
      message.error("Google login failed: " + error.message);
    }
  };

=======
>>>>>>> ff57b2d7942cd4b2e77c6dc1908f914fb036fb17
  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign In
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your username and password to sign in!
            </p>
          </div>
<<<<<<< HEAD
          <form onSubmit={handleEmailSignIn}>
            <div className="space-y-6">
              <div>
                Email <span className="text-error-500">*</span>{" "}
                <Input
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                Password <span className="text-error-500">*</span>{" "}
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                  >
                    {showPassword ? (
                      <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                    ) : (
                      <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                    )}
                  </span>
                </div>
              </div>
              <div>
                <Button className="w-full" size="sm" htmlType="submit">
                  Sign in
                </Button>
              </div>
              <div>
                <Button className="w-full" size="sm" onClick={handleGoogleSignIn}>
                  Sign in with Google
                </Button>
              </div>
            </div>
          </form>
=======
          <div>
            <form>
              <div className="space-y-6">
                <div>
                  Username <span className="text-error-500">*</span>{" "}
                  <Input placeholder="Enter your username" />
                </div>
                <div>
                  Password <span className="text-error-500">*</span>{" "}
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </span>
                  </div>
                </div>
                <div>
                  <Button className="w-full" size="sm">
                    Sign in
                  </Button>
                </div>
                <div className="w-full max-w-md pt-10 mx-auto">
                  <Link
                    to="/"
                    className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  >
                    <ChevronLeftIcon className="size-5" />
                    Back to dashboard
                  </Link>
                </div>
              </div>
            </form>
          </div>
>>>>>>> ff57b2d7942cd4b2e77c6dc1908f914fb036fb17
        </div>
      </div>
    </div>
  );
}
