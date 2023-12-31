import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";

import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import { BACKEND_URL } from "../Constant";
import ErrorHandler from "../components/ErrorHandler";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

// TO DO
// 1. add whether the price is per item or total

const AddStockForm = (props) => {
  const [cookies] = useCookies(["userCookie"]);
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const temp = data;
    temp.userId = cookies.userCookie.userID;
    temp.itemNo = props.item.itemNo;
    if (temp !== undefined) {
      setData(temp);
    }
  };

  const postStock = async () => {
    try {
      await axios({
        method: "POST",
        url: `${BACKEND_URL}/item/purchase`,
        data: data,
      });
      if (props.deleteGrocery !== undefined) {
        props.deleteGrocery();
      }
      if (props.getItemDetail !== undefined) {
        props.getItemDetail();
      } else if (props.getInventory !== undefined) {
        props.getInventory();
      }
      setLoading(false);
      setData(undefined);
      props.setAddStock(false);
      if (props.setDisabled !== undefined) {
        props.setDisabled(true);
      }
    } catch (err) {
      setLoading(false);
      alert(ErrorHandler(err.response.data));
    }
  };

  useEffect(() => {
    if (data !== undefined) {
      setLoading(true);
      postStock();
    }
  }, [data]);

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" flexDirection="column">
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            width="45vw"
            mt={1}
          >
            <Box display="flex" alignItems="center" height="5vh">
              Item Name
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="left"
              height="5vh"
              width="30vw"
            >
              {props.item.itemName}
            </Box>
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            width="45vw"
            mt={1}
          >
            <Box display="flex" alignItems="center" height="5vh">
              <label>
                Purchase Date<sup>*</sup>
              </label>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              border="1px solid"
              height="5vh"
              width="30vw"
              borderRadius={1}
            >
              <input
                type="date"
                id="purchaseDate"
                defaultValue={new Date().toISOString().split("T")[0]}
                {...register("purchaseDate", {
                  required: "^Field is required",
                })}
                css={css`
                  outline: none;
                  border: none;
                  width: 29vw;
                  height: 4vh;
                  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI",
                    "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans",
                    "Droid Sans", "Helvetica Neue", sans-serif;
                `}
              />
            </Box>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Box></Box>
            {errors?.purchaseDate && (
              <Box
                display="flex"
                justifyContent="left"
                color="red"
                fontSize={10}
                width="30vw"
              >
                {errors?.purchaseDate?.message}
              </Box>
            )}
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            width="45vw"
            mt={1}
          >
            <Box display="flex" alignItems="center">
              <label>Expiry Date</label>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              border="1px solid"
              borderRadius={1}
              height="5vh"
              width="30vw"
            >
              <input
                type="date"
                id="expiryDate"
                {...register("expiryDate")}
                css={css`
                  outline: none;
                  border: none;
                  width: 29vw;
                  height: 4vh;
                  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI",
                    "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans",
                    "Droid Sans", "Helvetica Neue", sans-serif;
                `}
              />
            </Box>
          </Box>

          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            width="45vw"
            mt={1}
          >
            <Box display="flex" alignItems="center" height="5vh">
              <label htmlFor="quantity">
                Quantity<sup>*</sup>
              </label>
            </Box>

            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              border="1px solid"
              borderRadius={1}
              height="5vh"
              width="30vw"
            >
              <input
                id="quantity"
                type="number"
                min="1"
                defaultValue={
                  props.item.quantity !== undefined ? props.item.quantity : 1
                }
                {...register("quantity", {
                  required: "Field is required",
                  valueAsNumber: true,
                  min: 1,
                })}
                css={css`
                  outline: none;
                  border: none;
                  width: 29vw;
                  height: 4vh;
                `}
              />
            </Box>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Box></Box>
            {errors?.quantity && (
              <Box
                display="flex"
                justifyContent="left"
                color="red"
                fontSize={10}
                width="30vw"
              >
                {errors?.quantity?.message}
              </Box>
            )}
          </Box>

          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            width="45vw"
            mt={1}
          >
            <Box display="flex" alignItems="center">
              <label htmlFor="price">Price</label>
            </Box>

            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              border="1px solid"
              borderRadius={1}
              height="5vh"
              width="30vw"
            >
              <input
                id="price"
                defaultValue={0}
                pattern="^\d{1,10}(\.\d{0,2})?$"
                {...register("price", {
                  pattern: {
                    value: /^\d{1,10}(\.\d{0,2})?$/,
                    message: "Please enter a number above 0, up to 2dp.",
                  },
                  valueAsNumber: true,
                })}
                css={css`
                  outline: none;
                  border: none;
                  width: 29vw;
                  height: 4vh;
                `}
              />
            </Box>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Box></Box>
            {errors?.price && (
              <Box
                display="flex"
                justifyContent="left"
                color="red"
                fontSize={10}
                width="30vw"
              >
                {errors?.price?.message}
              </Box>
            )}
          </Box>

          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            width="45vw"
            mt={1}
          >
            <Box display="flex" alignItems="center">
              <label htmlFor="purchasedFrom">Purchased From</label>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              border="1px solid"
              borderRadius={1}
              height="5vh"
              width="30vw"
            >
              <input
                id="purchasedFrom"
                {...register("purchasedFrom", { maxLength: 20 })}
                css={css`
                  outline: none;
                  border: none;
                  width: 29vw;
                  height: 4vh;
                `}
              />
            </Box>
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            width="45vw"
          >
            <Box></Box>
            <Box
              display="flex"
              justifyContent="left"
              fontSize={12}
              width="30vw"
            >
              <sup>*</sup>Required field
            </Box>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            <Box display="flex" justifyContent="center" pt={3}>
              <input
                type="submit"
                css={css`
                  color: white;
                  font-size: 1rem;
                  background-color: #000000;
                  outline: none;
                  border: none;
                  border-radius: 10px;
                  width: 20vw;
                  height: 10vh;
                  cursor: pointer;
                `}
              />
            </Box>
          </Box>
        </Box>
      </form>
    </>
  );
};

export default AddStockForm;
