
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Droplets } from "lucide-react";

export default function Home() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");

  const correctPassword = "Agem@20162016";

  const handleLogin = () => {
    if (password === correctPassword) {
      setIsAuthenticated(true);
    } else {
      setError("Incorrect password");
    }
  };

  if (isAuthenticated) {
    return (
      <section className="flex-1 w-full py-12 md:py-24 lg:py-32 xl:py-48 flex items-center justify-center">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4 text-center lg:text-left">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Track Your Glycemia with Ease
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl mx-auto lg:mx-0">
                  Our app helps you log your blood glucose levels, track your insulin dosage, and gain insights with AI-powered suggestions.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center lg:justify-start">
                <Button asChild size="lg">
                  <Link href="/dashboard">Go to Dashboard</Link>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Droplets className="h-32 w-32 text-primary" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Render password input form when not authenticated
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-2xl font-bold">Welcome to Glycemia Tracker</h1>
          <p className="text-muted-foreground">Enter password to access the application.</p>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleLogin();
                }
              }}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button onClick={handleLogin} className="mt-2">
              Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
