import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

import { NAV_ITEMS } from "../Constant";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const NavBar = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies(["userCookie"]);
  return (
    <>
      <Box display="flex" flexDirection="row" height="8vh" witdth="100%">
        <Box display="flex" alignItems="center" height="8vh" width="60%" pl={3}>
          <Box
            css={css`
              cursor: pointer;
            `}
            onClick={() => navigate("/home")}
          >
            Logo Here
          </Box>
        </Box>
        {cookies.userCookie.userID === undefined ? (
          <></>
        ) : (
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            height="8vh"
            width="40%"
            justifyContent="space-evenly"
            pl={1}
            pr={1}
          >
            {NAV_ITEMS.map((item) => {
              return (
                <Box
                  display="flex"
                  // flexDirection="row"
                  alignItems="center"
                  justifyContent="center"
                  key={item.name}
                  onClick={() => {
                    if (item.name === "Sign Out") {
                      removeCookie("userCookie");
                      navigate(item.path);
                    } else navigate(item.path);
                  }}
                  css={css`
                    cursor: pointer;
                  `}
                  bgcolor={item.name === "Sign Out" ? "black" : ""}
                  color={item.name === "Sign Out" ? "white" : ""}
                  borderRadius={2}
                  height="4vh"
                  width="8vw"
                >
                  {item.icon == null ? item.name : item.icon}
                </Box>
              );
            })}
          </Box>
        )}
      </Box>
      <Divider variant="middle" />
    </>
  );
};

export default NavBar;
