import { Schema } from 'ottoman';

export interface Norm {
  sensor: string;
  value: any;
  device?: string;
}

export interface NormDto {
  sensor: string;
  value: any;
  device?: string;
}

export interface NormSerializer {
  sensor: string;
  value: any;
  device?: string;
}

export const NormSchema = new Schema({
  sensor: { type: String, required: true },
  value: { type: Schema.Types.Mixed, required: true },
  device: { type: String, required: false },
} satisfies { [k in keyof Norm]: any });
