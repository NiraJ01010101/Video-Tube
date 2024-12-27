// "use server"
import Cookies from 'js-cookie';
import { verifyToken } from "./verifyToken";

// export const getUserData = async() => {
//   try {
//     let verifyUser = await verifyToken(Cookies.get('accessToken') || "");
//     return verifyUser
//   } catch (error) {
//     console.error("Error verifying token:", error);
//   }
// };


// let useCurrentUser : any = null;

// (async () => {
//   try {
//     useCurrentUser  = await verifyToken(Cookies.get('accessToken') || "");
//   } catch (error) {
//     console.error("Error verifying token:", error);
//   }
// })();

// export { useCurrentUser  };

