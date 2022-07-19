import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Container } from "@mui/system";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Component {...pageProps} />
    </Container>
  );
}

export default MyApp;
