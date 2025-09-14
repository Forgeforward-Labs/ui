import { Copy, Loader2 } from "lucide-react";
import { useAccount, useDisconnect } from "wagmi";
import { ConnectButton } from "./ConnectButton";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { toast } from "sonner";

export const Web3Status = () => {
  const { isConnected, address, isConnecting } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <div>
      {isConnecting ? (
        <Button variant="gradient" className="flex items-center gap-2">
          <Loader2 className="w-4 h-4 mr-2 animate-spin group-hover:animate-pulse" />
          Connecting...
        </Button>
      ) : isConnected ? (
        <Popover>
          <PopoverTrigger>
            <Button variant="outline" className="flex items-center gap-2">
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-40">
            <div className="flex gap-2 items-center justify-between">
              <div>
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </div>
              <Copy
                onClick={() => {
                  navigator.clipboard.writeText(address || "");
                  toast("Copied to clipboard");
                }}
                className="w-4 h-4 cursor-pointer"
              />
            </div>
            <Button
              variant="outline"
              className="w-full mt-2"
              onClick={() => {
                disconnect();
              }}
            >
              Disconnect
            </Button>
          </PopoverContent>
        </Popover>
      ) : (
        <ConnectButton />
      )}
    </div>
  );
};
