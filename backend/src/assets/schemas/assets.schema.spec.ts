import { z } from "zod";
import { AssetSchema, AssetArraySchema } from "./assets.schema";

describe("AssetSchema", () => {
  it("should pass with valid data (number latitude/longitude)", () => {
    const data = {
      address: "123 Main St",
      latitude: 10.5,
      longitude: -20.3,
    };
    expect(() => AssetSchema.parse(data)).not.toThrow();
  });

  it("should pass with valid data (string latitude/longitude)", () => {
    const data = {
      address: "456 Elm St",
      latitude: "15.2",
      longitude: "30.7",
    };
    expect(() => AssetSchema.parse(data)).not.toThrow();
  });

  it("should fail if address is empty", () => {
    const data = {
      address: "",
      latitude: 10,
      longitude: 20,
    };
    expect(() => AssetSchema.parse(data)).toThrow(/Address is required/);
  });

  it("should fail if latitude is empty string", () => {
    const data = {
      address: "789 Oak St",
      latitude: "",
      longitude: 20,
    };
    expect(() => AssetSchema.parse(data)).toThrow(/Latitude is required/);
  });

  it("should fail if longitude is empty string", () => {
    const data = {
      address: "789 Oak St",
      latitude: 10,
      longitude: "",
    };
    expect(() => AssetSchema.parse(data)).toThrow(/Longitude is required/);
  });

  it("should fail if latitude is not a number or non-empty string", () => {
    const data = {
      address: "789 Oak St",
      latitude: {},
      longitude: 20,
    };
    try {
      AssetSchema.parse(data);
      fail("Expected an error but none was thrown");
    } catch (e: unknown) {
      if (e instanceof z.ZodError) {
        expect(e.errors?.[0]?.message).toContain("Invalid input");
      } else {
        fail("Expected a ZodError but got something else");
      }
    }
  });

  it("should fail if longitude is not a number or non-empty string", () => {
    const data = {
      address: "789 Oak St",
      latitude: 10,
      longitude: {},
    };
    expect(() => AssetSchema.parse(data)).toThrow(/Invalid input/);
  });

  it("should fail if latitude is NaN string", () => {
    const data = {
      address: "789 Oak St",
      latitude: "not-a-number",
      longitude: 20,
    };
    try {
      AssetSchema.parse(data);
      fail("Expected an error but none was thrown");
    } catch (e: unknown) {
      if (e instanceof z.ZodError) {
        expect(e.errors?.[0]?.message).toContain("Latitude must be a valid number");
      } else {
        fail("Expected a ZodError but got something else");
      }
    }
  });

  it("should fail if longitude is NaN string", () => {
    const data = {
      address: "789 Oak St",
      latitude: 10,
      longitude: "not-a-number",
    };
    expect(() => AssetSchema.parse(data)).toThrow(/Longitude must be a valid number/);
  });
});

describe("AssetArraySchema", () => {
  it("should pass with an array of valid assets", () => {
    const data = [
      { address: "A", latitude: 1, longitude: 2 },
      { address: "B", latitude: "3", longitude: "4" },
    ];
    expect(() => AssetArraySchema.parse(data)).not.toThrow();
  });

  it("should fail if any asset in the array is invalid", () => {
    const data = [
      { address: "A", latitude: 1, longitude: 2 },
      { address: "", latitude: "3", longitude: "4" },
    ];
    expect(() => AssetArraySchema.parse(data)).toThrow(/Address is required/);
  });
});