"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function SignUpPage() {
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [mailSent, setMailSent] = useState(false);

  useEffect(() => {
    setDisabled(true);
    if (
      signupData.username.length > 0 &&
      signupData.email.length > 0 &&
      signupData.password.length > 0 &&
      signupData.confirmPassword.length > 0
    ) {
      setDisabled(false);
    }
  }, [signupData]);

  const makeSignupRequest = async () => {
    try {
      if (signupData.password !== signupData.confirmPassword) {
        return toast.error("Password did't match");
      }

      const data = {
        username: signupData.username,
        email: signupData.email,
        password: signupData.password,
      };

      setLoading(true);
      const response = await axios.post("/api/users/signup", data);
      if (response.data.success) {
        setLoading(false);
        setMailSent(true);
      }
    } catch (err) {
      if (err.response.data.error) {
        toast.error(err.response.data.error);
        return;
      }
      console.log(err);
      toast.error("Signup Failed. Please Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-[94vh] md:h-screen bg-black flex justify-center pt-15 relative">
      {!mailSent && (
        <div className="flex flex-row rounded-3xl overflow-hidden">
          <div className="w-[22rem] md:w-[27rem] h-[30rem] bg-[#153d51] text-black/70 overflow-hidden">
            {!loading ? (
              ""
            ) : (
              <div className="w-[22rem] md:w-[54rem] h-[30rem] absolute z-30 bg-neutral-300/50 rounded-3xl flex justify-center items-center">
                <h1 className="text-5xl font-bold">Loading ....</h1>
              </div>
            )}
            <div className="w-full h-full bg-[#ebf3f9] rounded-tl-[8rem] flex flex-col justify-center items-center">
              <h1 className="text-4xl font-bold text-[#153d51]">Welcome</h1>
              <p className="text-sm mb-10 ">
                Create your new account to continue
              </p>

              <input
                id="username"
                type="text"
                value={signupData.username}
                onChange={(e) =>
                  setSignupData({ ...signupData, username: e.target.value })
                }
                placeholder="Username ......."
                className="w-70 h-10 bg-[#aae8ee] rounded-4xl pl-10 mb-5 outline-none"
              />

              <input
                id="email"
                type="email"
                value={signupData.email}
                onChange={(e) =>
                  setSignupData({ ...signupData, email: e.target.value })
                }
                placeholder="Email ......."
                className="w-70 h-10 bg-[#aae8ee] rounded-4xl pl-10 mb-5 outline-none"
              />

              <input
                id="password"
                type="password"
                value={signupData.password}
                onChange={(e) =>
                  setSignupData({ ...signupData, password: e.target.value })
                }
                placeholder="Password ......."
                className="w-70 h-10 bg-[#aae8ee] rounded-4xl pl-10 mb-5 outline-none"
              />

              <input
                id="confirmPassword"
                type="password"
                value={signupData.confirmPassword}
                onChange={(e) =>
                  setSignupData({
                    ...signupData,
                    confirmPassword: e.target.value,
                  })
                }
                placeholder="Confirm Password ......."
                className="w-70 h-10 bg-[#aae8ee] rounded-4xl pl-10 mb-10 outline-none"
              />

              <button
                onClick={makeSignupRequest}
                disabled={disabled}
                className="w-35 text-sm bg-[#153d51] text-[#ebf3f9] p-1 rounded-2xl mb-3 cursor-pointer"
              >
                {loading ? "Processing" : "Sign Up"}
              </button>

              <p className="font-semibold">
                Have a account?
                <Link href={"/login"} className="text-[#153d51]">
                  {" "}
                  log in
                </Link>
              </p>
            </div>
          </div>

          <div className="w-[27rem] h-[30rem] bg-[#ebf3f9] rounded-tr-3xl overflow-hidden hidden md:inline">
            <div className="w-full h-full text-[#ebf3f9] bg-[#153d51] rounded-tl-[8rem] rounded-br-[8rem] flex flex-col justify-center items-center rounded-tr-3xl  overlflow-hidden">
              <div className="w-15 h-15 bg-[#ebf3f9] rounded-full mb-3"></div>
              <p className="mb-7">Logo Here</p>
              <h1 className="text-4xl font-semibold mb-3">Welcome!</h1>
              <p className="text-[12px]">
                Let’s create your account and get started.
              </p>
              <p className="text-[12px]">Please enter your personal info</p>
              <Link
                href={"/login"}
                disabled={disabled}
                className="w-50 h-8 mt-15 text-sm font-semibold uppercase border-1 border-[#ebf3f9] flex items-center justify-center rounded-4xl"
              >
                log In
              </Link>
            </div>
          </div>
        </div>
      )}

      {mailSent && (
        <div className="w-80 md:w-120 h-105 bg-[#ebf3f9] flex flex-col items-center text-center rounded-3xl p-5">
          <div className="w-20 h-20 rounded-full bg-[#153d51] mb-7 flex items-center justify-center">
            <img src="/svg/mail.svg" alt="" />
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-neutral-700 mb-5">
            Verify your email address
          </h1>

          <p className="text-[0.825rem] md:text-lg text-neutral-600 mb-5">
            We have sent a verification link to{" "}
            <span className="font-bold text-[#153d51]">{signupData.email}</span>
          </p>

          <p className="text-[0.825rem] md:text-lg text-neutral-600">
            Click on the link to complete the verification process.
          </p>

          <p className="text-[0.825rem] md:text-lg text-neutral-600">
            You might need to{" "}
            <span className="font-bold text-neutral-800">
              check your spam folder
            </span>
            .
          </p>

          <div className="mt-10">
            <Link
              className="w-35 bg-[#153d51] text-[0.825rem] md:text-lg text-[#ebf3f9] font-bold p-2.5 rounded-md border-2 border-[#153d51] mr-2 "
              href={"#"}
            >
              Resend email
            </Link>

            <Link
              className="w-40 text-[#153d51] text-[0.825rem] md:text-lg bg-[#ebf3f9] font-bold p-2.5 rounded-md border-2 border-[#153d51]"
              href={"#"}
            >
              Return to Site {"->"}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
