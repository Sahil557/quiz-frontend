'use client';

import { useState, useEffect } from "react";
import { Tabs } from "@/components/molecules";
import SignIn from "@/components/Signin";
import { CardWrapper, Row, Typography } from "@/components/atoms";

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);

  const subheadings = [
    "Access your admin dashboard to create, manage, and review quiz questions.",
    "Access your quiz, answer questions, and see how you score."
  ];

  useEffect(() => {
    const saved = typeof window !== "undefined" 
      ? localStorage.getItem("activeTab") 
      : null;

    if (saved !== null) setActiveTab(Number(saved));
  }, []);

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    localStorage.setItem("activeTab", String(index));
  };

  return (
    <Row className="min-h-screen flex items-center justify-center px-4">
      <CardWrapper className="max-w-md w-full mx-auto">

        <Typography align="center" weight="bold" variant="2xl">
          Get Started Now
        </Typography>

        <Typography
          color="text-stone"
          align="center"
          weight="normal"
          variant="xs"
          className="mt-2"
        >
          {subheadings[activeTab]}
        </Typography>  

        <Tabs
          className="mt-6"
          tabs={[
            {
              content: <SignIn />,
              icon: "ManagerIcon",
              label: "Admin",
            },
            {
              content: <SignIn />,
              icon: "UserIcon",
              label: "Guest",
            },
          ]}
          defaultIndex={activeTab}
          onTabChange={handleTabChange}
        />
      </CardWrapper>
    </Row>
  );
}
