import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Lock as LockIcon,
  ArrowLeft,
  Copy,
  Calendar,
  Clock,
  Shield,
  Download,
  ExternalLink,
  Coins,
} from "lucide-react";
import { format } from "date-fns";
import Navbar from "@/components/Navbar";
import { LockCertificateModal } from "@/components/LockCertificateModal";
import { toast } from "sonner";
import { useGetLockQuery } from "@/graphql/__generated__/types-and-hooks";
import { useERC20Token } from "@/hooks/useERC20Token";
import { zeroAddress } from "viem";
import { useBalance } from "wagmi";
import { convertTimestampToDate, shortenAddress } from "@/lib/utils";
import { useQuery } from "wagmi/query";
import { somniaTestnet } from "viem/chains";

const LockDetails = () => {
  const { address } = useParams<{ address: string }>();
  const [certificateModalOpen, setCertificateModalOpen] = useState(false);

  const { data: lock, loading: lockLoading } = useGetLockQuery({
    variables: {
      lockAddress: address as `0x${string}`,
    },
    skip: !address,
  });

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  const lockData = (lock?.Lock as any)?.[0];

  const { getTokenDetails } = useERC20Token(lockData?.token as `0x${string}`);

  const { data: lockBalance } = useBalance({
    address: lockData?.lockAddress as `0x${string}`,
    token:
      lockData?.token === zeroAddress
        ? undefined
        : (lockData?.token as `0x${string}`),
  });

  const getUnlockProgress = () => {
    const lockDate = Number(lockData?.createdAt);
    const unlockDate = Number(lockData?.lockTimeEnd);
    const currentDate = Date.now() / 1000;

    const totalPeriod = unlockDate - lockDate;
    const elapsed = currentDate - lockDate;

    return Math.min(Math.max((elapsed / totalPeriod) * 100, 0), 100);
  };

  const { data: tokenDetails } = useQuery({
    queryKey: ["token-details", lockData?.token as `0x${string}`],
    queryFn: () => getTokenDetails(),
  });

  const tokenName =
    lockData?.token === zeroAddress
      ? "STT"
      : ((tokenDetails as any)?.name as string);
  const tokenSymbol =
    lockData?.token === zeroAddress
      ? "STT"
      : ((tokenDetails as any)?.symbol as string);
  const decimalPlaces =
    lockData?.token === zeroAddress ? 18 : (tokenDetails as any)?.decimals || 0;
  const status =
    Number(lockData?.lockTimeEnd) * 1000 > Date.now()
      ? "Locked"
      : Number(lockBalance?.value) > 0
      ? "Unlockable"
      : "Unlocked";

  const shareUrl = window.location.href;

  if (lockLoading) return <div>Loading...</div>;

  if (!lock || !lockData) return <div>Lock not found</div>;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mt-20 mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link to="/lock">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Locks
              </Button>
            </Link>
            <div className="flex-1">
              <h1 className="text-3xl font-bold">Lock Details</h1>
              <p className="text-muted-foreground">
                Viewing lock for {tokenName} ({tokenSymbol})
              </p>
            </div>
            <Badge variant={status === "Locked" ? "default" : "secondary"}>
              {status}
            </Badge>
          </div>

          <div className="grid gap-6">
            {/* Main Lock Info */}
            <Card className="glass-card border-white/10">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <LockIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">
                        {tokenName} ({tokenSymbol})
                      </CardTitle>
                      <CardDescription>Token Lock Certificate</CardDescription>
                    </div>
                  </div>
                  <Button
                    onClick={() => setCertificateModalOpen(true)}
                    variant="outline"
                    size="sm"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Certificate
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Progress */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Unlock Progress</span>
                    <span>{getUnlockProgress()}%</span>
                  </div>
                  <Progress value={getUnlockProgress()} className="h-3" />
                  <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>
                        Locked:{" "}
                        {convertTimestampToDate(lockData.createdAt * 1000)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>
                        Unlocks:{" "}
                        {convertTimestampToDate(lockData.lockTimeEnd * 1000)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Lock Details Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Coins className="h-4 w-4" />
                      Token Information
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Token Address:
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono">
                            {shortenAddress(lockData.token)}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              copyToClipboard(lockData.token, "Token address")
                            }
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Locked Amount:
                        </span>
                        <span className="font-medium">
                          {Number(lockData.lockingAmount) /
                            10 ** Number(decimalPlaces)}
                          {tokenSymbol}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        {/* <span className="text-muted-foreground">
                          Lock Type:
                        </span>
                        <span className="capitalize">{lockData.lockType}</span> */}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Owner Information
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Owner Address:
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono">
                            {shortenAddress(lockData.owner)}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              copyToClipboard(lockData.owner, "Owner address")
                            }
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Lock Date:
                        </span>
                        <span>
                          {convertTimestampToDate(lockData.createdAt * 1000)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Unlock Date:
                        </span>
                        <span>
                          {convertTimestampToDate(lockData.lockTimeEnd * 1000)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Vesting Info */}
                {lockData.isVesting && (
                  <div className="space-y-4 pt-4 border-t border-white/10">
                    <h3 className="font-semibold">Vesting Schedule</h3>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">
                          Vesting Start:
                        </span>
                        <p className="font-medium">
                          {format(
                            new Date(lockData.vestingStart),
                            "MMM dd, yyyy"
                          )}
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          Cliff Period:
                        </span>
                        <p className="font-medium">
                          {lockData.vestingCliff} days
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          Vesting Period:
                        </span>
                        <p className="font-medium">
                          {lockData.vestingPeriod} days
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Share Section */}
                <div className="space-y-4 pt-4 border-t border-white/10">
                  <h3 className="font-semibold">Share This Lock</h3>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 px-3 py-2 bg-muted rounded-md font-mono text-sm">
                      {shareUrl}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(shareUrl, "Share URL")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        window.open(
                          `${somniaTestnet.blockExplorers.default.url}/address/${lockData.lockAddress}`,
                          "_blank"
                        )
                      }
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <LockCertificateModal
        lock={{
          ...lockData,
          tokenName,
          tokenSymbol,
          decimalPlaces,
          lockDate: convertTimestampToDate(Number(lockData.createdAt)),
          unlockDate: convertTimestampToDate(Number(lockData.lockTimeEnd)),
          amount: Number(lockData.lockingAmount) / 10 ** Number(decimalPlaces),
          status,
        }}
        open={certificateModalOpen}
        onOpenChange={setCertificateModalOpen}
      />
    </div>
  );
};

export default LockDetails;
