import { ChakraProvider, ColorModeScript, CSSReset } from "@chakra-ui/react";
import customTheme from "../styles/theme";

function MyApp({ Component }) {
  return (
    <ChakraProvider theme={customTheme}>
      <CSSReset />
      <ColorModeScript initialColorMode={customTheme.initialColorMode} />
      <Component />
    </ChakraProvider>
  );
}

export default MyApp;
