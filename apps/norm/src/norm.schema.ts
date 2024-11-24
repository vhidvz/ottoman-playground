import { Schema } from "ottoman";

export const NormSchema = new Schema({
  sensor: { type: String, required: true },
  value: { type: Schema.Types.Mixed, required: true },
  device: { type: String, required: false },
});
