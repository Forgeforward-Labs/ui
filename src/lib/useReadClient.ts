import { createPublicClient, http } from "viem";
import { somniaTestnet } from "viem/chains";
// import { useAccount } from "wagmi";

const useReadClient = () => {
  return createPublicClient({
    chain: somniaTestnet,
    transport: http(somniaTestnet.rpcUrls.default.http[0]),
  });
};
export { useReadClient };
