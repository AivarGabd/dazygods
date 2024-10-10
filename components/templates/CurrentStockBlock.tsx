"use client";

import { cn } from "@/lib/utils";

const step = 5;

interface DataCase {
  name: string;
  styles: string;
}

const getDataCase = (value: number, step: number): DataCase => {
  if (value > step) return dataCases[0];
  if (value > 0) return dataCases[1];
  return dataCases[2];
};

const dataCases: DataCase[] = [
  {
    name: "много",
    styles: "font-semibold underline decoration-green-500",
  },
  {
    name: "осталось мало",
    styles: "font-semibold underline decoration-yellow-500",
  },
  {
    name: "нет",
    styles: "font-semibold underline decoration-red-500",
  },
];

const CurrentStockBlock = ({
  value,
  size,
}: {
  value: string;
  size?: "sm" | "md" | "lg";
}) => {
  const dataCase = getDataCase(Number(value), step);

  const sizeStyles =
    size === "sm" ? "text-xs" : size === "md" ? "text-sm" : "text-lg";
  return (
    <div className={cn(sizeStyles, "text-gray-500 font-medium h-fit")}>
      <div>
        В наличии{" "}
        <div className={cn(dataCase.styles, "inline")}>{dataCase.name}</div>
      </div>
    </div>
  );
};

export default CurrentStockBlock;
