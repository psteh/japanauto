export enum EFilterTypes {
  SLIDER,
  SELECT,
}

export const API_URL: string =
  process.env.NEXT_PUBLIC_API_URL || 'https://api.japanauto.io';

export const FILTER_TYPES: { [key in EFilterTypes]: EFilterTypes } = {
  [EFilterTypes.SLIDER]: EFilterTypes.SLIDER,
  [EFilterTypes.SELECT]: EFilterTypes.SELECT,
};
