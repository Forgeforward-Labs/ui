import { useReadClient } from "@/lib/useReadClient";
import standardTokenAbi from "@/abis/StandardToken";
import { useAccount, useWalletClient } from "wagmi";
import { toast } from "sonner";

export const useERC20Token = (address: string) => {
  const readClient = useReadClient();
  const { data: client } = useWalletClient();
  const { address: account } = useAccount();

  const getTokenOwnership = async () => {
    const owner = await readClient.readContract({
      address: address as `0x${string}`,
      abi: standardTokenAbi,
      functionName: "owner",
    });

    if (!owner) {
      return null;
    }

    return owner as `0x${string}`;
  };

  const transferOwnership = async (newOwner: `0x${string}`) => {
    try {
      if (!newOwner) {
        toast.error("Error", {
          description: "Please enter a valid address",
        });
        return;
      }

      if (!client) return;
      const { request } = await readClient.simulateContract({
        account: account,
        address: address as `0x${string}`,
        abi: standardTokenAbi,
        functionName: "transferOwnership",
        args: [newOwner],
      });

      const tx = await client.writeContract(request);

      const receipt = await readClient.waitForTransactionReceipt({
        hash: tx as `0x${string}`,
      });

      if (receipt?.status === "success") {
        toast.success("Ownership transferred successfully");
      } else {
        throw new Error("Failed to transfer ownership");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to transfer ownership");
      throw new Error("Failed to transfer ownership");
    }
  };

  const renounceOwnership = async () => {
    try {
      if (!client) return;
      const { request } = await readClient.simulateContract({
        account: account,
        address: address as `0x${string}`,
        abi: standardTokenAbi,
        functionName: "renounceOwnership",
      });

      const tx = await client.writeContract(request);

      const receipt = await readClient.waitForTransactionReceipt({
        hash: tx as `0x${string}`,
      });

      if (receipt?.status === "success") {
        toast.success("Ownership renounced successfully");
      } else {
        toast.success("Ownership renounced successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to renounce ownership");
      throw new Error("Failed to renounce ownership");
    }
  };

  return {
    getTokenOwnership,
    transferOwnership,
    renounceOwnership,
  };
};
