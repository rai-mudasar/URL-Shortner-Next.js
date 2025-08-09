"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const router = useRouter();

  useEffect(() => {
    setDisabled(true)
    if (loginData.email.length > 0 && loginData.password.length > 0) {
      setDisabled(false);
    }
  }, [loginData]);

  const makeLoginRequest = async () => {
    try {
      const data = {
        email: loginData.email,
        password: loginData.password,
      };

      setLoading(true);
      const response = await axios.post("api/users/login", data);

      if (response.data.success) {
        setLoading(false);
        return router.push("/");
      }
    } catch (err) {
      if (err.response.data.error) {
        toast.error(err.response.data.error);
        return;
      }
      console.log(err);
      toast.error("Login Failed. Please Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen bg-black flex justify-center pt-15">
      <div className="flex flex-row rounded-3xl overflow-hidden">
        <div className="w-[27rem] h-[30rem] bg-[#ebf3f9] rounded-tl-3xl overflow-hidden hidden md:inline">
          <div className="w-full h-full text-[#ebf3f9] bg-[#153d51] rounded-tr-[8rem] rounded-bl-[8rem] flex flex-col justify-center items-center rounded-tl-3xl  overlflow-hidden">
            <div className="w-15 h-15 bg-[#ebf3f9] rounded-full mb-3"></div>
            <p className="mb-7">Logo Here</p>
            <h1 className="text-4xl font-semibold mb-3">Welcome Back!</h1>
            <p className="text-[12px]">To stay connected with us.</p>
            <p className="text-[12px]">Please login with your personal info</p>
            <Link
              href={"/signup"}
              className="w-50 h-8 mt-15 text-sm font-semibold uppercase border-1 border-[#ebf3f9] flex items-center justify-center rounded-4xl"
            >
              Sign Up
            </Link>
          </div>
        </div>

        <div className="w-[22rem] md:w-[27rem] h-[30rem] bg-[#153d51] text-black/70 ">
          <div className="w-full h-full bg-[#ebf3f9] rounded-tr-[8rem] flex flex-col justify-center items-center">
            <h1 className="text-4xl font-bold text-[#153d51]">Welcome</h1>
            <p className="text-sm mb-10 ">
              Login in to your account to continue
            </p>
            <input
              id="email"
              type="email"
              value={loginData.email}
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
              placeholder="Email ......."
              className="w-70 h-10 bg-[#aae8ee] rounded-4xl pl-10 mb-5 outline-none"
            />

            <input
              id="password"
              type="password"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
              placeholder="Password ......."
              className="w-70 h-10 bg-[#aae8ee] rounded-4xl pl-10 mb-2 outline-none"
            />

            <Link
              href={"#"}
              className="text-sm font-semibold mb-10 hover:text-[#153d51]"
            >
              Forget your password?
            </Link>

            <button
              onClick={makeLoginRequest}
              disabled={disabled || loading}
              className="w-35 text-sm bg-[#153d51] text-[#ebf3f9] p-1 rounded-2xl mb-3 cursor-pointer"
            >
              {loading ? "Logging in ..." : "LOG IN"}
            </button>

            <p className="font-semibold">
              Don't have a account?
              <Link href={"/signup"} className="text-[#153d51]">
                {" "}
                sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
