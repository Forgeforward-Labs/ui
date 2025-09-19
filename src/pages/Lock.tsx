import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Slider } from "@/components/ui/slider";
import {
  Lock as LockIcon,
  Shield,
  Clock,
  TrendingUp,
  Search,
  Coins,
  Zap,
} from "lucide-react";
import { format } from "date-fns";
import { convertTimestampToDate } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import { useAccount, useBalance } from "wagmi";
import useLockFactory from "@/hooks/useLockFactory";
import { zeroAddress } from "viem";
import { toast } from "sonner";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useERC20Token } from "@/hooks/useERC20Token";
import { useGetUserLocksQuery } from "@/graphql/__generated__/types-and-hooks";
import { UserLockCard } from "@/components/UserLockCard";
// import { useBalance } from "wagmi";

interface Lock {
  id: string;
  tokenName: string;
  tokenSymbol: string;
  amount: string;
  lockDate: string;
  unlockDate: string;
  status: string;
  type: string;
  tokenType: string;
  contractAddress?: string;
  vestingEnabled: boolean;
  owner: string;
  vestingStart?: string;
  vestingCliff?: string;
  vestingPeriod?: string;
}

const Lock = () => {
  const [lockType, setLockType] = useState("token");
  const [tokenType, setTokenType] = useState("contract"); // "native" or "contract"
  const [tokenCategory] = useState("standard");
  const [tokenAddress, setTokenAddress] = useState("");
  const [lockAmount, setLockAmount] = useState("");
  const [sliderValue, setSliderValue] = useState([0]);
  const [lockDuration, setLockDuration] = useState("");
  const [customUnlockDate, setCustomUnlockDate] = useState<string>("");
  const [searchAddress, setSearchAddress] = useState("");
  const [enableVesting] = useState(false);
  const [vestingStart, setVestingStart] = useState("");
  const [vestingCliff, setVestingCliff] = useState("");
  const [vestingPeriod, setVestingPeriod] = useState("");

  const { createLock } = useLockFactory();

  const { address } = useAccount();

  const { getTokenDetails } = useERC20Token(tokenAddress);

  const { data: tokenDetails } = useQuery({
    queryKey: ["tokenDetails", tokenAddress],
    queryFn: () => getTokenDetails(),
  });

  console.log("tokenDetails", tokenDetails);

  const { data: balanceData, refetch: refetchBalance } = useBalance({
    address: address as `0x${string}`,
    token: tokenType === "native" ? undefined : (tokenAddress as `0x${string}`),
  });

  const balance = balanceData?.formatted || "0";

  const symbol = balanceData?.symbol || "STT";

  //   const { data: tokenBalance } = useERC20Token(tokenAddress);

  const lockToken = async () => {
    if (
      (tokenType === "contract" && !tokenAddress) ||
      !lockAmount ||
      !lockDuration
    ) {
      toast.error("Missing Information", {
        description: "Please fill in all required fields",
      });
      return;
    }

    let lockEndTime = 0;

    const now = Date.now();

    console.log("now", now, Date.now());

    switch (lockDuration) {
      case "30":
        lockEndTime = now + 30 * 24 * 60 * 60;
        break;
      case "90":
        lockEndTime = now + 90 * 24 * 60 * 60;
        break;
      case "180":
        lockEndTime = now + 180 * 24 * 60 * 60;
        break;
      case "365":
        lockEndTime = now + 365 * 24 * 60 * 60;
        break;
      case "730":
        lockEndTime = now + 730 * 24 * 60 * 60;
        break;
      case "custom":
        lockEndTime = (new Date(customUnlockDate).getTime() || 0) / 1000;
    }

    const receipt = await createLock({
      token: tokenType === "native" ? zeroAddress : tokenAddress,
      amount: Number(lockAmount),
      lockTimeEnd: lockEndTime,
      decimals:
        tokenType === "native" ? 18 : (tokenDetails?.decimals as number),
    });

    console.log("receipt", receipt);
  };

  const handleSliderChange = (value: number[]) => {
    setSliderValue(value);
    const amount = ((parseFloat(balance) * value[0]) / 100).toFixed();
    setLockAmount(amount);
  };

  const handleAmountChange = (value: string) => {
    setLockAmount(value);
    if (value && balance) {
      const percentage = (parseFloat(value) / parseFloat(balance)) * 100;
      setSliderValue([Math.min(100, Math.max(0, percentage))]);
    }
  };

  const { mutate: handleLockToken, isPending: isLocking } = useMutation({
    mutationFn: lockToken,
    onSuccess: () => {
      refetchBalance();
    },
  });

  const lockButtonDisabled =
    isLocking ||
    (tokenType === "contract" && !tokenAddress) ||
    !lockAmount ||
    !lockDuration;

  const { data: userLocks } = useGetUserLocksQuery({
    variables: {
      owner: address as `0x${string}`,
    },
    skip: !address,
    pollInterval: 1000,
  });
  const activeLocks = (userLocks?.Lock as any)?.map((lock: any) => ({
    ...lock,
    lockDate: convertTimestampToDate(Number(lock.createdAt)),
    unlockDate: convertTimestampToDate(Number(lock.lockTimeEnd)),
    amount: Number(lock.lockingAmount) / 10 ** Number(tokenDetails?.decimals),
  }));
  console.log("userLocks", userLocks);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 gradient-primary rounded-xl">
              <LockIcon className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Token & LP Lock
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Secure your tokens and liquidity with time-locked smart contracts.
            Build trust and prevent rug pulls.
          </p>
        </div>

        <Tabs defaultValue="lock" className="space-y-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="lock">Create Lock</TabsTrigger>
            <TabsTrigger value="search">Search Locks</TabsTrigger>
          </TabsList>

          <TabsContent value="lock" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Lock Creation Form */}
              <div className="lg:col-span-2">
                <Card className="glass-card border-white/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" />
                      Lock Your Assets
                    </CardTitle>
                    <CardDescription>
                      Create a time-locked vault for your tokens or LP tokens
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Lock Type</Label>
                        <div className="grid grid-cols-2 gap-2">
                          <Button
                            type="button"
                            variant={
                              lockType === "token" ? "protocol" : "outline"
                            }
                            className="justify-start"
                            onClick={() => setLockType("token")}
                          >
                            <Coins className="mr-2 h-4 w-4" />
                            Token Lock
                          </Button>
                          <Button
                            type="button"
                            variant={lockType === "lp" ? "protocol" : "outline"}
                            className="justify-start"
                            onClick={() => setLockType("lp")}
                          >
                            <Zap className="mr-2 h-4 w-4" />
                            LP Lock
                          </Button>
                        </div>
                      </div>

                      {lockType === "token" && (
                        <>
                          <div className="space-y-2">
                            <Label>Token Type</Label>
                            <div className="grid grid-cols-2 gap-2">
                              <Button
                                type="button"
                                variant={
                                  tokenType === "native"
                                    ? "protocol"
                                    : "outline"
                                }
                                className="justify-start"
                                onClick={() => setTokenType("native")}
                              >
                                <Coins className="mr-2 h-4 w-4" />
                                Native Token
                              </Button>
                              <Button
                                type="button"
                                variant={
                                  tokenType === "contract"
                                    ? "protocol"
                                    : "outline"
                                }
                                className="justify-start"
                                onClick={() => setTokenType("contract")}
                              >
                                <Zap className="mr-2 h-4 w-4" />
                                Token CA
                              </Button>
                            </div>
                          </div>
                        </>
                      )}

                      {((lockType === "token" && tokenType === "contract") ||
                        lockType === "lp") && (
                        <div className="space-y-2">
                          <Label htmlFor="token-address">
                            {lockType === "token" ? "Token" : "LP"} Contract
                            Address
                          </Label>
                          <Input
                            id="token-address"
                            placeholder="0x..."
                            value={tokenAddress}
                            onChange={(e) => setTokenAddress(e.target.value)}
                          />
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      {/* <div className="flex items-center space-x-2">
                        <Switch
                          id="enable-vesting"
                          checked={enableVesting}
                          onCheckedChange={(setEnableVesting)}
                        />
                        <Label htmlFor="enable-vesting">
                          Enable Vesting Schedule
                        </Label>
                      </div> */}

                      {enableVesting && (
                        <div className="p-4 glass-card rounded-lg border border-white/10">
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-primary" />
                            <Input type="datetime" />
                            Vesting Configuration
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="vesting-start">
                                Vesting Start Date
                              </Label>
                              <Input
                                id="vesting-start"
                                type="date"
                                value={vestingStart}
                                onChange={(e) =>
                                  setVestingStart(e.target.value)
                                }
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="vesting-cliff">
                                Cliff Period (days)
                              </Label>
                              <Input
                                id="vesting-cliff"
                                placeholder="e.g., 90"
                                value={vestingCliff}
                                onChange={(e) =>
                                  setVestingCliff(e.target.value)
                                }
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="vesting-period">
                                Vesting Period (days)
                              </Label>
                              <Input
                                id="vesting-period"
                                placeholder="e.g., 365"
                                value={vestingPeriod}
                                onChange={(e) =>
                                  setVestingPeriod(e.target.value)
                                }
                              />
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">
                            Tokens will be gradually released over the vesting
                            period after the cliff
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="lock-amount">Amount to Lock</Label>
                        <div className="space-y-4">
                          <Input
                            id="lock-amount"
                            placeholder="0.00"
                            value={lockAmount}
                            onChange={(e) => handleAmountChange(e.target.value)}
                          />
                          {(tokenType === "native" && balance && symbol) ||
                          (tokenType === "contract" &&
                            balance &&
                            symbol !== "STT") ? (
                            <div className="space-y-3">
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">
                                  Balance: {balance}
                                </span>
                                <span className="text-muted-foreground">
                                  {sliderValue[0].toFixed(1)}%
                                </span>
                              </div>
                              <Slider
                                value={sliderValue}
                                onValueChange={handleSliderChange}
                                max={100}
                                step={0.1}
                                className="w-full"
                              />
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleSliderChange([25])}
                                  className="text-xs"
                                >
                                  25%
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleSliderChange([50])}
                                  className="text-xs"
                                >
                                  50%
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleSliderChange([75])}
                                  className="text-xs"
                                >
                                  75%
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleSliderChange([100])}
                                  className="text-xs"
                                >
                                  MAX
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-3">
                              <p className="text-muted-foreground">
                                No balance found
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lock-duration">Lock Duration</Label>
                        <Select
                          value={lockDuration}
                          onValueChange={setLockDuration}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="30">30 Days</SelectItem>
                            <SelectItem value="90">90 Days</SelectItem>
                            <SelectItem value="180">6 Months</SelectItem>
                            <SelectItem value="365">1 Year</SelectItem>
                            <SelectItem value="730">2 Years</SelectItem>
                            <SelectItem value="custom">Custom Date</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {lockDuration === "custom" && (
                      <div className="space-y-2">
                        <Label>Custom Unlock Date</Label>
                        <Input
                          type="datetime-local"
                          value={customUnlockDate}
                          onChange={(e) => setCustomUnlockDate(e.target.value)}
                        />

                        <p className="text-xs text-muted-foreground">
                          Select a future date when tokens will be unlocked
                        </p>
                      </div>
                    )}

                    <div className="hidden"></div>

                    <div className="p-4 glass-card rounded-lg border border-white/10">
                      <h4 className="font-semibold mb-2 text-foreground">
                        Lock Summary
                      </h4>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p>
                          • Lock type:{" "}
                          {lockType === "token" ? "Token" : "LP Token"}
                        </p>
                        {lockType === "token" && tokenType === "contract" && (
                          <p>• Token category: {tokenCategory}</p>
                        )}
                        {lockType === "token" && (
                          <p>
                            • Token type:{" "}
                            {tokenType === "native"
                              ? "Native Token"
                              : "Contract Address"}
                          </p>
                        )}
                        <p>
                          • Unlock date:{" "}
                          {lockDuration === "custom"
                            ? customUnlockDate
                              ? format(customUnlockDate, "PPP")
                              : "Custom date not selected"
                            : lockDuration
                            ? `${lockDuration} days from now`
                            : "Not selected"}
                        </p>
                        {enableVesting && (
                          <p>
                            • Vesting: Enabled with {vestingCliff} day cliff
                          </p>
                        )}
                        <p>
                          • Your assets will be held in a secure smart contract
                        </p>
                      </div>
                    </div>

                    <Button
                      className="w-full"
                      variant="protocol"
                      size="lg"
                      disabled={lockButtonDisabled}
                      onClick={() => handleLockToken()}
                    >
                      <LockIcon className="mr-2 h-4 w-4" />
                      Create Lock
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Lock Benefits */}
              <div className="space-y-6">
                <Card className="glass-card border-white/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      Why Lock Assets?
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Shield className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-sm">Build Trust</h4>
                        <p className="text-xs text-muted-foreground">
                          Show commitment to your project
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-sm">Time Security</h4>
                        <p className="text-xs text-muted-foreground">
                          Prevent early selling or rug pulls
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <LockIcon className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-sm">
                          Smart Contract
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          Immutable and transparent
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Coins className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-sm">
                          Token Categories
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          Specialized forms for different token types
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card border-white/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Lock Statistics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Total Locks
                      </span>
                      <span className="font-semibold">1,247</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Total Value Locked
                      </span>
                      <span className="font-semibold">$52.4M</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Active Locks
                      </span>
                      <span className="font-semibold">892</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="search" className="space-y-6">
            <Card className="glass-card border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5 text-primary" />
                  Search Locks
                </CardTitle>
                <CardDescription>
                  Find token or LP locks by address or view all active locks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Input
                    placeholder="Search by token address..."
                    value={searchAddress}
                    onChange={(e) => setSearchAddress(e.target.value)}
                    className="flex-1"
                  />
                  <Button variant="outline">Search</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-white/20">
              <CardHeader>
                <CardTitle>Your Active Locks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeLocks?.map((lock: any) => (
                    <UserLockCard key={lock.id} lock={lock} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Lock;
