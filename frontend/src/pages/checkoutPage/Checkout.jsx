import React, { useEffect } from "react";
import { Heading, useDisclosure } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Text } from "@chakra-ui/react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  Box,
} from "@chakra-ui/react";

import { getuserAddress } from "../../redux/appReducer/action";

const Checkout = () => {
  const navigate = useNavigate();
  // const { isOpen, onOpen, onClose } = useDisclosure(); // Modal unused for now
  
  const dispatch = useDispatch();
  const userAddress = useSelector((store) => store.appReducer.userAddress);

  // FIXED: Added useEffect to actually fetch the data
  useEffect(() => {
    dispatch(getuserAddress());
  }, [dispatch]);

  console.log("Current User Address:", userAddress);

  const handllePayment = () => {
    navigate("/payment");
  };

  return (
    <div style={{ marginBottom: "20%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          width: "100%",
          height: "100px",
          top: "0px",
          boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
        }}>
        <Heading>CHECKOUT</Heading>
      </div>

      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        <div
          style={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            overflow: "auto",
            borderRight: "2px solid whitesmoke",
            padding: "20px"
          }}>
          <div
            style={{
              margin: "auto",
              backgroundColor: "whitesmoke",
              width: "80%",
              padding: "20px",
              borderRadius: "8px"
            }}>
            <Text fontWeight="bold" mb={2}>SHIPPING ADDRESS</Text>
            {/* Added check to handle empty address */}
            {userAddress && userAddress.FullName ? (
                <>
                    <Text fontWeight="bold">{userAddress.FullName}</Text>
                    <Text>{userAddress.FlatNumber}, {userAddress.Area}</Text>
                    <Text>{userAddress.Landmark}</Text>
                    <Text>{userAddress.City}, {userAddress.State}</Text>
                    <Text>{userAddress.Pincode}</Text>
                    <Text mt={2}>Phone: {userAddress.Mobile || "N/A"}</Text>
                </>
            ) : (
                <Text color="red.500">No address found. Please add one in your profile.</Text>
            )}
          </div>
        </div>

        <div style={{ width: "40%", margin: "auto", padding: "20px" }}>
          <Accordion allowToggle defaultIndex={[0]}>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box
                    flex="1"
                    textAlign="left"
                    color={"black"}
                    fontWeight="bold">
                    ORDER SUMMARY
                    <Box color={"black"} fontWeight="400" mt={2}>
                      <Box display="flex" justifyContent="space-between">
                        <span>Item Total</span>
                        <span>Rs.1699</span>
                      </Box>
                      <Box display="flex" justifyContent="space-between">
                        <span>Shipping</span>
                        <span>Free</span>
                      </Box>
                    </Box>
                  </Box>
                </AccordionButton>
              </h2>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box
                    flex="1"
                    textAlign="left"
                    color={"black"}
                    fontWeight="bold">
                    <Box color={"black"} fontWeight="400">
                      <Box display="flex" justifyContent="space-between">
                        <span style={{ fontWeight: "bold" }}>Grand Total</span>
                        <span style={{ fontWeight: "bold" }}>Rs.1699</span>
                      </Box>
                      <Box fontSize="sm" color="green.500" mt={1}>
                        (Inclusive of Taxes) You Saved Rs.300
                      </Box>
                    </Box>
                  </Box>
                </AccordionButton>
              </h2>
              <Button
                onClick={handllePayment}
                colorScheme="green"
                width="100%"
                height={"50px"}
                mt="20px"
                borderRadius={"0px"}>
                Proceed to Payment
              </Button>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default Checkout;