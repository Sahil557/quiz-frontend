"use client";

import { MouseEventHandler } from "react";
import { Button, CardWrapper, Row, Typography } from "../atoms";
import Image from "next/image";

interface Card {
  title: string;
  description: string;
  img: string;
  width: number;
  height: number;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export default function Card({ title, description, width, height, img, onClick, }: Card) {
  return (
    <CardWrapper
      onClick={onClick}
      className="relative w-full cursor-pointer"
    >
      <Row className="flex flex-col items-center">
        <Typography variant="lg" weight="semibold">
          {title}
        </Typography>
        <Image src={img} alt="sasa" width={width} height={height} className="object-contain" />
        <Typography variant="xs" weight="semibold">
          {description}
        </Typography>
      </Row>
    </CardWrapper>
  );
}
