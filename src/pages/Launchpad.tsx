import Navbar from "@/components/Navbar";
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
import { Calendar, Clock, Rocket, TrendingUp, Users } from "lucide-react";

const Launchpad = () => {
  const featuredLaunches = [
    {
      name: "DeFi Protocol X",
      symbol: "DPX",
      description:
        "Next-generation yield farming protocol with automated strategies",
      raised: 850000,
      target: 1000000,
      participants: 2847,
      timeLeft: "2 days",
      status: "active",
      allocation: "1 ETH max",
    },
    {
      name: "GameFi Arena",
      symbol: "GFA",
      description: "Play-to-earn metaverse game with NFT integration",
      raised: 1200000,
      target: 1200000,
      participants: 5932,
      timeLeft: "Ended",
      status: "completed",
      allocation: "0.5 ETH max",
    },
    {
      name: "Green Energy Token",
      symbol: "GET",
      description: "Sustainable energy marketplace powered by blockchain",
      raised: 0,
      target: 2000000,
      participants: 0,
      timeLeft: "7 days",
      status: "upcoming",
      allocation: "2 ETH max",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-accent/20 text-accent";
      case "completed":
        return "bg-green-500/20 text-green-400";
      case "upcoming":
        return "bg-yellow-500/20 text-yellow-400";
      default:
        return "bg-muted/20 text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl font-bold mb-4">
              <span className="text-gradient">Launchpad</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover and participate in the latest token launches with fair
              distribution and community governance
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <Card className="glass-card">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Rocket className="w-8 h-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">247</p>
                    <p className="text-sm text-muted-foreground">
                      Total Launches
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-8 h-8 text-accent" />
                  <div>
                    <p className="text-2xl font-bold">$45.2M</p>
                    <p className="text-sm text-muted-foreground">
                      Total Raised
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Users className="w-8 h-8 text-green-400" />
                  <div>
                    <p className="text-2xl font-bold">89.4K</p>
                    <p className="text-sm text-muted-foreground">
                      Participants
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-8 h-8 text-yellow-400" />
                  <div>
                    <p className="text-2xl font-bold">12</p>
                    <p className="text-sm text-muted-foreground">
                      Active Launches
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Featured Launches */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Featured Launches</h2>

            {featuredLaunches.map((launch, index) => (
              <Card key={index} className="glass-card hover-glow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center">
                        <span className="text-primary-foreground font-bold">
                          {launch.symbol.slice(0, 2)}
                        </span>
                      </div>
                      <div>
                        <CardTitle className="text-xl">{launch.name}</CardTitle>
                        <CardDescription className="text-base">
                          {launch.description}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge
                      className={getStatusColor(launch.status)}
                      variant="secondary"
                    >
                      {launch.status.charAt(0).toUpperCase() +
                        launch.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Progress */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-muted-foreground">
                        Progress
                      </span>
                      <span className="text-sm font-semibold">
                        ${launch.raised.toLocaleString()} / $
                        {launch.target.toLocaleString()}
                      </span>
                    </div>
                    <Progress
                      value={(launch.raised / launch.target) * 100}
                      className="h-2"
                    />
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">
                        Participants
                      </p>
                      <p className="text-lg font-semibold">
                        {launch.participants.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Time Left</p>
                      <p className="text-lg font-semibold flex items-center justify-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {launch.timeLeft}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">
                        Max Allocation
                      </p>
                      <p className="text-lg font-semibold">
                        {launch.allocation}
                      </p>
                    </div>
                    <div className="text-center">
                      <Button
                        variant={
                          launch.status === "active" ? "gradient" : "glass"
                        }
                        disabled={launch.status !== "active"}
                        className="w-full"
                      >
                        {launch.status === "active"
                          ? "Participate"
                          : launch.status === "completed"
                          ? "Completed"
                          : "Coming Soon"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Apply for Launch */}
          <Card className="glass-card mt-12 text-center">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                Want to Launch Your Project?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Submit your project for review and launch on our platform. Get
                access to our community of investors and DeFi enthusiasts.
              </p>
              <Button variant="protocol" size="lg">
                <Rocket className="w-5 h-5 mr-2" />
                Apply for Launch
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Launchpad;
