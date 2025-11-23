"use client";

import { Row, Typography } from "@/components/atoms";

interface StepperProps {
  current: number;
  total: number;
}

export default function Stepper({ current, total }: StepperProps) {
  const steps = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <div className="w-full flex flex-col items-center my-6">
      <Row className="items-center gap-0 justify-center">
        {steps.map((step, index) => {
          const isActive = step === current;
          const isCompleted = step < current;

          const nextIsCompleted = step < current - 1;
          const nextIsActive = step === current - 1;

          return (
            <Row className="items-center gap-0" key={step}>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 text-sm font-bold
                  ${isCompleted ? "bg-success border-success text-white" : ""}
                  ${isActive ? "bg-primary border-primary text-white" : ""}
                  ${
                    !isActive && !isCompleted
                      ? "bg-fog border-smoke text-black"
                      : ""
                  }
                `}
              >
                {isCompleted ? "✓" : step}
              </div>

              {index < total - 1 && (
                <div
                  className={`
                    h-1 w-12 
                    ${
                      nextIsCompleted
                        ? "bg-success"
                        : nextIsActive
                        ? "bg-primary"
                        : "bg-silver"
                    }
                  `}
                />
              )}
            </Row>
          );
        })}
      </Row>

      <Row className="justify-center mt-2 gap-12">
        {steps.map((step) => {
          const isActive = step === current;
          return (
            <Typography
              key={step}
              variant="xs"
              className={`${
                isActive ? "text-primary font-semibold" : "text-slate"
              } text-center`}
            >
              Ques {step}
            </Typography>
          );
        })}
      </Row>
    </div>
  );
}

