import { useState } from "react";
import { useCookies } from "react-cookie";
import Box from "@mui/material/Box";
import ItemDisplay from "../components/ItemDisplay";
import Login from "../components/Login";
import Register from "../components/Register";
import TitleCard from "../components/TitleCard";
import { HOME_PAGE_PIC } from "../Constant";

const HomePage = () => {
  const [isRegister, setRegister] = useState(false);
  const [cookies] = useCookies(["userCookie"]);

  return (
    <Box display="flex" flexDirection="row" height="91vh" witdth="100%">
      <Box display="flex" flexDirection="row" height="85vh" p={3}>
        <img src={HOME_PAGE_PIC} alt="Grocery " />
      </Box>
      {cookies.userCookie.userID === undefined ? (
        isRegister ? (
          <Register setRegister={setRegister} />
        ) : (
          <Login setRegister={setRegister} />
        )
      ) : (
        <Box display="flex" flexDirection="column">
          <Box display="flex" flexDirection="column" p={3}>
            <TitleCard title="Expiring Soon" />
            <Box sx={{ maxHeight: "33vh", overflow: "auto" }}>
              <ItemDisplay title="Expiring Soon" />
            </Box>
          </Box>
          <Box display="flex" flexDirection="column" p={3}>
            <TitleCard title="Low in Stock" />
            <Box sx={{ maxHeight: "33vh", overflow: "auto" }}>
              <ItemDisplay title="Low in Stock" />
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default HomePage;
