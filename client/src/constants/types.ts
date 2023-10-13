import { ChangeEvent } from "react";

export type StageType =
  | "default"
  | "search"
  | "start"
  | "parse"
  | "images"
  | "final";

export type sizeType = "big" | "medium" | "small";

export type DropdownType = "none" | "order" | "size" | "watch";

export type Field = {
  if: boolean;
  type: "text" | "number";
  title: string;
  placeholder: string;
  maxLength: number;
  rows?: number;
  value: string | number;
  onChange: (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
};
