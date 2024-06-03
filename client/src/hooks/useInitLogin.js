import { useEffect, useState } from "react";
import dynamicAxiosMethod from "../helpers/dynamicAxiosMethod";
import serverRoutes from "../constants/serverRoutes";
import { jwtDecode } from "jwt-decode";
import milkyWayData from "../constants/milkyWayData";
import { useNavigate } from "react-router-dom";
import toastifyHelper, { toastifyStatuses } from "../helpers/toastifyHelper";
import useDynamicDispatch from "./useDynamicDispatch";
import { authInstance } from "../utils/axiosSetup";

const useInitLogin = () => {
  const navigate = useNavigate();
  const [finishedLoading, setFinishedLoading] = useState(false);
  const dynamicDispatch = useDynamicDispatch();
  const didGoogleLogin = localStorage.getItem("didGoogleLogin");
  const token = localStorage.getItem("token");

  useEffect(() => {
    try {
      if (didGoogleLogin) {
        const getGoogleUser = async () => {
          const res = await dynamicAxiosMethod({
            method: "get",
            endpoint: "/success",
            instance: authInstance,
          });
          localStorage.setItem("token", res.data);
          setFinishedLoading(true);
        };
        getGoogleUser();
      }
    } catch (error) {
      console.error("Error fetching Google user:", error);
    }
  }, []);

  useEffect(() => {
    try {
      if (!token && didGoogleLogin) {
        const getGoogleUser = async () => {
          try {
            const res = await dynamicAxiosMethod({
              method: "get",
              endpoint: "/success",
              instance: authInstance,
            });
            localStorage.setItem("token", res.data);
            setFinishedLoading(true);
          } catch (error) {
            console.log("???", error);
            setFinishedLoading(true);
          }
        };
        getGoogleUser();
        return;
      }
      const decodedToken = jwtDecode(token);
      if (!decodedToken || !decodedToken._id) {
        setFinishedLoading(true);
        return;
      }
      const checkUserById = async () => {
        try {
          const { data } = await dynamicAxiosMethod({
            method: "get",
            endpoint: `${serverRoutes.get.getUserById}${decodedToken._id}`,
            shouldToken: true,
          });

          dynamicDispatch("DATA_INIT", {
            role: decodedToken.Role,
            userPayload: decodedToken,
            isAdmin: decodedToken.isAdmin,
            data: {
              rolesData: [
                ...milkyWayData.roles[
                  decodedToken.Role !== "Ghost" ? "loggedIn" : "Ghost"
                ].titles,
              ],
              iconsData: [
                ...milkyWayData.roles[
                  decodedToken.Role !== "Ghost" ? "loggedIn" : "Ghost"
                ].icons,
              ],
              bgs: [],
            },
          });
          const { coins, gems } = data[0].moneyData;

          const filteredData = Object.values(decodedToken.ownedStuff).map(
            (data) => {
              return Object.values(data).map((val) => {
                const { _id, ...rest } = val;
                return rest;
              });
            }
          );
          const [titles, pets, ranks] = filteredData;
          dynamicDispatch("SET_MONEY", {
            coins,
            gems,
          });
          dynamicDispatch("SET_OWNED_STUFF", {
            titles,
            pets,
            ranks,
          });
        } catch (error) {
          navigate("/login");
          toastifyHelper({
            status: toastifyStatuses.error,
            message: "Could not find user, please login.",
          });
          setFinishedLoading(true);
        } finally {
          setFinishedLoading(true);
        }
      };
      checkUserById();
      return;
    } catch (err) {
      setFinishedLoading(true);
    }
  }, [token]);

  return { finishedLoading };
};

export default useInitLogin;
