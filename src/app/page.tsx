"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function Home() {
  const [email, setEmail] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [name, setName] = useState("");

  const handleCheckEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/check-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error("Network response was not ok");
      const data = await res.json();

      if (data.exists) {
        toast.success("Email verified — you may continue.");
        setIsVerified(true);
      } else {
        toast.error("Email not found — please try a different email.");
        setIsVerified(false);
      }
    } catch (err) {
      toast.error("Something went wrong. Try again.");
      console.error(err);
    }
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Form submitted — Name: ${name}, Email: ${email}`);
    // do whatever next (send to API, etc.)
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-950 text-white">
      <div className="w-full max-w-md bg-gray-900 rounded-2xl p-6 shadow-lg">
        {!isVerified ? (
          <form onSubmit={handleCheckEmail} className="space-y-4">
            <h1 className="text-xl font-semibold text-center">Verify your Email</h1>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" className="w-full">
              Check Email
            </Button>
          </form>
        ) : (
          <form onSubmit={handleSubmitForm} className="space-y-4">
            <h1 className="text-xl font-semibold text-center">Continue Form</h1>
            <Input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}

