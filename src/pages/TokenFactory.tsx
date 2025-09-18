import Navbar from "@/components/Navbar";
import TokenFactoryCard from "@/components/TokenFactoryCard";
// import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  useGetPlatformStatsQuery,
  useGetRecentTokensQuery,
  useGetUserTokensQuery,
} from "@/graphql/__generated__/types-and-hooks";
import { History, TrendingUp } from "lucide-react";
import { useAccount } from "wagmi";

import { UserTokenCard } from "@/components/UserTokenCard";

const TokenFactory = () => {
  const { data: recentTokens } = useGetRecentTokensQuery({
    pollInterval: 10000,
  });
  const { address } = useAccount();
  const { data: platformStats } = useGetPlatformStatsQuery({
    pollInterval: 10000,
  });

  const { data: userTokens } = useGetUserTokensQuery({
    variables: {
      owner: address as string,
    },
    skip: !address,
    pollInterval: 10000,
  });

  const userCreatedTokens = userTokens?.Tokens || [];

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
                    <span className="font-semibold text-accent">
                      {(platformStats?.PlatformStats as any)?.[0]
                        ?.totalTokens || 0}
                    </span>
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
                  {recentTokens?.Tokens?.map((token, index: number) => (
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
                        <p className="text-sm font-medium">
                          {Number(token.totalSupply) /
                            10 ** Number(token.decimalPlaces)}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* User Created Tokens Grid Section */}
          {userCreatedTokens.length > 0 && (
            <div className="mt-16">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Your Created Tokens</h2>
                <p className="text-muted-foreground">
                  Manage and monitor all your created tokens
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userCreatedTokens.map((token, index) => (
                  <UserTokenCard key={index} token={token} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default TokenFactory;
