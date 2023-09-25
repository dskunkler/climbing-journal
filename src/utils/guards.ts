import { symbol } from "zod";
import { OutdoorMileage } from "~/components/outdoor-mileage";

export const isString = (item: unknown): item is string => {
  return typeof item == "string";
};

export const isNumber = (item: unknown): item is number => {
  return typeof item == "number";
};

export const isObject = (
  item: unknown
): item is { [key in PropertyKey]: unknown } => {
  return typeof item == "object";
};

type optional<K> = K | void;

export type YosemiteGrade =
  | "5.5"
  | "5.6"
  | "5.7"
  | "5.8"
  | "5.9"
  | "5.10a"
  | "5.10b"
  | "5.10c"
  | "5.10d"
  | "5.11a"
  | "5.11b"
  | "5.11c"
  | "5.11d"
  | "5.12a"
  | "5.12b"
  | "5.12c"
  | "5.12d"
  | "5.13a"
  | "5.13b"
  | "5.13c"
  | "5.13d"
  | "5.14a"
  | "5.14b"
  | "5.14c"
  | "5.14d";

export const YosemiteGrades = [
  "na",
  "5.5",
  "5.6",
  "5.7",
  "5.8",
  "5.9",
  "5.10a",
  "5.10b",
  "5.10c",
  "5.10d",
  "5.11a",
  "5.11b",
  "5.11c",
  "5.11d",
  "5.12a",
  "5.12b",
  "5.12c",
  "5.12d",
  "5.13a",
  "5.13b",
  "5.13c",
  "5.13d",
  "5.14a",
  "5.14b",
  "5.14c",
  "5.14d",
];

export const isOptionalNumber = (item: unknown): boolean => {
  return item == null || isNumber(item);
};

export const isOptionalString = (item: unknown): boolean => {
  return item == null || isString(item);
};
