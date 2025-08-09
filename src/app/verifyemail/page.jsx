"use client";

import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function VerifyEmailPage() {
  const router = useRouter();

  const SearchParams = useSearchParams();
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(SearchParams.get("token"));
  }, [token]);

  const verify = async () => {
    try {
      const response = await axios.post("/api/users/verifyemail", { token });
      if (response.data.success) {
        toast.success("Verified Successfully");
        return router.push("/login");
      }
    } catch (error) {
      console.log("Verify Page error : ", error);
    }
  };
  return (
    <div className="w-full h-screen flex justify-center pt-15">
      <div className="w-[22rem] md:w-[27rem] flex flex-col items-center text-center text-[#153d51]">
        <h1 className="text-2xl md:text-5xl font-extrabold">
          Verify Your Email
        </h1>
        <p className="text-lg md:text-2xl mt-5 font-semibold text-[#153d51]/70">
          Click on the Follwing Button to Verify Yourself
        </p>
        <button
          onClick={verify}
          className="w-35 p-2 flex justify-center items-center gap-2 mt-7 cursor-pointer bg-[#153d51] text-[#ebf3f9] rounded-full  hover:shadow-2xl shadow-[#1f91ca]"
        >
          <h2 className="text-lg md:text-2xl font-bold">Verify</h2>
          <div className="w-8 h-8 rounded-full">
            <img src="/svg/chevron-right.svg" alt="" />
          </div>
        </button>
      </div>
    </div>
  );
}
