import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
  Flex,
  Text,
  Box,
} from "@chakra-ui/react";

import Layout from "../components/Layout";
import WalletConnectionPrompter from "../components/connectWallet";

export default function Home() {
  const router = useRouter();
  const [currentAccount, setCurrentAccount] = useState("");

  const CheckLogin = async () => {
    const accounts = await ethereum.request({ method: "eth_accounts" });
    if (accounts.length !== 0) {
      setCurrentAccount(true);
    } else {
      setCurrentAccount(false);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
      checkIfChainIsCorrect();
      reRoute();
    } catch (error) {
      console.log(new Error(error));
    }
  };

  useEffect(() => {
    CheckLogin();
  }, []);

  if (!currentAccount) {
    return (
      <div>
        <Layout route={router.pathname} />
        <WalletConnectionPrompter connectWallet={connectWallet} />
      </div>
    );
  } else {
    return (
      <div>
        <Layout route={router.pathname} />
        <Flex
          align={"center"}
          justify={"flex-start"}
          direction={"column"}
          w={"100%"}
          py={100}
        >
          <Flex
            align={"center"}
            justify={"center"}
            direction={"column"}
            w={"50%"}
          >
            <Text
              as="h3"
              my={5}
              fontSize={"5xl"}
              fontWeight={600}
              letterSpacing={".5px"}
            >
              Explore your SmartContracts
            </Text>

            <Tabs isFitted variant="enclosed" w={"100%"} mt={5}>
              <TabList mb="1em">
                <Tab>Explore your Contracts</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Text fontSize={18} align={"center"}>
                    If you have a contract deployed, you can interact with the
                    functions and the ABI to verify your deployement
                  </Text>
                  <Text fontSize={18} align={"center"}>
                    The app uses the Etherscan API Key you setup in your .env
                    file to talk to the supported chains and fetch the latest
                    versions of code
                  </Text>
                  <Box align={"center"}>
                    <Link passHref href="/smartContracts">
                      <Button
                        mt={5}
                        p={4}
                        w={"30%"}
                        fontWeight={"bold"}
                        letterSpacing={1}
                        borderRadius={"md"}
                        bgGradient={"linear(to-r, green.300, green.500)"}
                        color={"white"}
                        boxShadow={"2xl"}
                        _hover={{
                          opacity: currentAccount ? ".9" : ".2",
                        }}
                        disabled={false}
                      >
                        Launch App
                      </Button>
                    </Link>
                  </Box>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Flex>
        </Flex>
      </div>
    );
  }
}
