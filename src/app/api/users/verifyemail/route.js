import { NextResponse } from "next/server";
import USER from "@/models/userModel";
import connect from "@/dbConfig/connectToDb";

await connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();

    console.log("req : ", reqBody);
    const { token } = reqBody;


    const user = await USER.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });
    console.log("User : ", user);

    if (!user) {
      return NextResponse.json({ error: "Invalid Token" }, { status: 400 });
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();
    return NextResponse.json({
      message: "Verified Successfully",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
