import Navbar from "@/components/Navbar";
import TokenFactoryCard from "@/components/TokenFactoryCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Coins, History, TrendingUp } from "lucide-react";

const TokenFactory = () => {
  const recentTokens = [
    {
      name: "DeFi Token",
      symbol: "DFT",
      supply: "1,000,000",
      network: "Ethereum",
    },
    { name: "GameFi Coin", symbol: "GFC", supply: "500,000", network: "BSC" },
    {
      name: "Utility Token",
      symbol: "UTL",
      supply: "2,000,000",
      network: "Polygon",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl font-bold mb-4">
              <span className="text-gradient">Token Factory</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Create custom tokens with advanced features, security controls,
              and automated deployment
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Factory Form */}
            <div className="lg:col-span-2">
              <TokenFactoryCard />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Statistics */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-accent" />
                    <span>Factory Stats</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Tokens Created
                    </span>
                    <span className="font-semibold text-accent">12,847</span>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Tokens */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <History className="w-5 h-5 text-primary" />
                    <span>Recent Tokens</span>
                  </CardTitle>
                  <CardDescription>
                    Latest tokens created on the platform
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentTokens.map((token, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        {/* <div className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center">
                          <Coins className="w-4 h-4 text-primary-foreground" />
                        </div> */}
                        <div>
                          <p className="font-semibold text-sm">{token.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {token.symbol}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{token.supply}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TokenFactory;
