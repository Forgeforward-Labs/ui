import { useMemo, useState } from "react";
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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, Gift, Users, Download, Send, Coins } from "lucide-react";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";
import { useAirdrop } from "@/hooks/useAirdrop";
import { useERC20Token } from "@/hooks/useERC20Token";
import { useQuery } from "@tanstack/react-query";

const Airdrop = () => {
  const [tokenType, setTokenType] = useState("contract"); // "native" or "contract"
  const [tokenAddress, setTokenAddress] = useState("");
  const [allocationType, setAllocationType] = useState("allocation"); // "allocation" or "equal"
  //   const [totalAmount, setTotalAmount] = useState("");
  const [amountPerRecipient, setAmountPerRecipient] = useState("");
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [csvData, setCsvData] = useState<any[]>([]);

  const { getTokenDetails } = useERC20Token(tokenAddress);

  const { data: tokenDetails } = useQuery({
    queryKey: ["tokenDetails", tokenAddress],
    queryFn: () => getTokenDetails(),
  });

  const {
    distributeEtherAllocation,
    distributeTokenAllocation,
    distributeEther,
    distributeToken,
  } = useAirdrop();

  const totalAmount = useMemo(() => {
    if (allocationType === "allocation") {
      return csvData.reduce((acc, curr) => acc + Number(curr.amount), 0);
    }
    return Number(amountPerRecipient) * csvData.length;
  }, [allocationType, csvData, amountPerRecipient]);

  const parseCSV = (content: string) => {
    const lines = content.trim().split("\n");
    const data = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line) {
        const columns = line.split(",").map((col) => col.trim());
        if (allocationType === "allocation" && columns.length >= 2) {
          data.push({ address: columns[0], amount: columns[1] });
        } else if (allocationType === "equal" && columns.length >= 1) {
          data.push({ address: columns[0] });
        }
      }
    }

    return data;
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "text/csv") {
      setCsvFile(file);

      // Read and parse CSV file
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        const parsedData = parseCSV(content);
        setCsvData(parsedData.slice(1, parsedData.length));

        toast.success(
          `${file.name} uploaded successfully with ${
            parsedData.length - 1
          } recipients`
        );
      };
      reader.readAsText(file);
    } else {
      toast.error("Please upload a CSV file");
    }
  };

  const downloadCSVTemplate = (type: "allocation" | "equal") => {
    let csvContent = "";
    let filename = "";

    if (type === "allocation") {
      csvContent =
        "address,amount\n0x1234567890123456789012345678901234567890,100.50\n0x0987654321098765432109876543210987654321,250.75";
      filename = "airdrop_allocation_template.csv";
    } else {
      csvContent =
        "address\n0x1234567890123456789012345678901234567890\n0x0987654321098765432109876543210987654321";
      filename = "airdrop_equal_template.csv";
    }

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    toast.success(`${filename} has been downloaded`);
  };

  const handleCreateAirdrop = async () => {
    if (!csvFile) {
      toast.error("Please upload a CSV file");
      return;
    }

    if (tokenType === "contract" && !tokenAddress) {
      toast.error("Please enter token contract address");
      return;
    }

    if (allocationType === "allocation" && !totalAmount) {
      toast.error("Please enter total amount");
      return;
    } else if (allocationType === "equal" && !amountPerRecipient) {
      toast.error("Please enter amount per recipient");
      return;
    }

    if (tokenType === "native" && allocationType === "allocation") {
      const tx = await distributeEtherAllocation(
        csvData.map((data) => data.address),
        csvData.map((data) => BigInt(Number(data.amount) * 10 ** 18))
      );
      toast.success("Ether distributed successfully");
      return tx;
    }

    if (tokenType === "contract" && allocationType === "allocation") {
      const tx = await distributeTokenAllocation(
        tokenAddress,
        csvData.map((data) => data.address),
        csvData.map((data) =>
          BigInt(
            Number(data.amount) * 10 ** Number(tokenDetails?.decimals ?? 0)
          )
        )
      );
      toast.success("Token distributed successfully");
      return tx;
    }

    if (tokenType === "native" && allocationType === "equal") {
      const tx = await distributeEther(
        csvData.map((data) => data.address),
        BigInt(Number(amountPerRecipient) * 10 ** 18)
      );
      toast.success("Ether distributed successfully");
      return tx;
    }

    if (tokenType === "contract" && allocationType === "equal") {
      const tx = await distributeToken(
        tokenAddress,
        csvData.map((data) => data.address),
        BigInt(
          Number(amountPerRecipient) * 10 ** Number(tokenDetails?.decimals ?? 0)
        )
      );
      toast.success("Token distributed successfully");
      return tx;
    }

    toast.success(
      `Token dispenser created successfully with ${csvData.length} recipients`
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 gradient-primary rounded-xl">
              <Gift className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Token Dispenser
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Distribute tokens efficiently to your community with our automated
            airdrop system.
          </p>
        </div>

        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Token Dispenser Form */}
            <div className="lg:col-span-2">
              <Card className="glass-card border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Send className="h-5 w-5 text-primary" />
                    Create Token Dispenser
                  </CardTitle>
                  <CardDescription>
                    Set up automated token distribution to multiple recipients
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Token Type</Label>
                    <Select value={tokenType} onValueChange={setTokenType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="native">
                          <div className="flex items-center gap-2">
                            <Coins className="h-4 w-4" />
                            Native Token
                          </div>
                        </SelectItem>
                        <SelectItem value="contract">
                          <div className="flex items-center gap-2">
                            <Gift className="h-4 w-4" />
                            Contract Token
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {tokenType === "contract" && (
                    <div className="space-y-2">
                      <Label htmlFor="token-address">
                        Token Contract Address
                      </Label>
                      <Input
                        id="token-address"
                        placeholder="0x..."
                        value={tokenAddress}
                        onChange={(e) => setTokenAddress(e.target.value)}
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label>Allocation Type</Label>
                    <Select
                      value={allocationType}
                      onValueChange={setAllocationType}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="allocation">
                          Individual Allocation (CSV with amounts)
                        </SelectItem>
                        <SelectItem value="equal">
                          Equal Distribution (Same amount for all)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {allocationType === "allocation" ? (
                    <></>
                  ) : (
                    <div className="space-y-2">
                      <Label htmlFor="amount-per-recipient">
                        Amount per Recipient
                      </Label>
                      <Input
                        id="amount-per-recipient"
                        placeholder="0.00"
                        value={amountPerRecipient}
                        onChange={(e) => setAmountPerRecipient(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">
                        Each address will receive this exact amount
                      </p>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="csv-upload">Recipients List (CSV)</Label>
                    <div className="border border-dashed border-white/20 rounded-lg p-6 text-center hover:border-white/40 transition-colors">
                      <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-sm text-muted-foreground mb-2">
                        {allocationType === "allocation"
                          ? "Upload CSV file with recipient addresses and amounts"
                          : "Upload CSV file with recipient addresses only"}
                      </p>
                      <Input
                        id="csv-upload"
                        type="file"
                        accept=".csv"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <Label htmlFor="csv-upload" className="cursor-pointer">
                        <Button variant="outline" asChild>
                          <span>Choose File</span>
                        </Button>
                      </Label>
                      {csvFile && (
                        <div className="mt-3 space-y-1">
                          <p className="text-sm text-primary">
                            {csvFile.name} selected
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {csvData.length} recipients loaded
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-4 glass-card rounded-lg border border-white/10">
                    <h4 className="font-semibold mb-2 text-foreground">
                      CSV Format & Template
                    </h4>
                    {allocationType === "allocation" ? (
                      <div className="text-sm text-muted-foreground space-y-1 mb-3">
                        <p>• Column 1: Wallet Address</p>
                        <p>• Column 2: Token Amount</p>
                        <p>• Example: 0x123...,100.50</p>
                      </div>
                    ) : (
                      <div className="text-sm text-muted-foreground space-y-1 mb-3">
                        <p>• Column 1: Wallet Address</p>
                        <p>• Example: 0x123...</p>
                      </div>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        downloadCSVTemplate(
                          allocationType as "allocation" | "equal"
                        )
                      }
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download Template
                    </Button>
                  </div>

                  <Button
                    className="w-full"
                    variant="protocol"
                    size="lg"
                    onClick={handleCreateAirdrop}
                  >
                    <Gift className="mr-2 h-4 w-4" />
                    Create Token Dispenser
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Dispenser Info */}
            <div className="space-y-6">
              <Card className="glass-card border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Dispenser Benefits
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Gift className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-sm">
                        Batch Distribution
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        Send tokens to multiple addresses at once
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-sm">
                        Flexible Amounts
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        Equal or custom amounts per recipient
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Send className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-sm">CSV Upload</h4>
                      <p className="text-xs text-muted-foreground">
                        Easy bulk recipient management
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Airdrop;
