import { OAuth2Client } from "google-auth-library";
import { asyncHandler } from "../response/error.response.js";

const client = new OAuth2Client(process.env.CLIENT_ID);

export const verifyGoogleToken = asyncHandler( async (idToken) => {

    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (!payload.email_verified) {
      throw new Error("Invalid Google account");
    }
    return payload;
  

});
