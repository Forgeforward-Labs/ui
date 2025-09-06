import { createConfig } from "wagmi";
import { injected, metaMask } from "wagmi/connectors";
import { somniaTestnet } from "wagmi/chains";
import { http } from "wagmi";

export const config = createConfig({
  chains: [somniaTestnet],
  connectors: [injected(), metaMask()],
  transports: {
    [somniaTestnet.id]: http(),
  },
});
