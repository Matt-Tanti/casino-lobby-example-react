import { CSSProperties } from "react";

export type Action = {
  type: string;
  payload?: any;
};

export type Styles = {
  [key: string]: CSSProperties;
};

export type GameProvider = {
  name?: string;
  slug?: string;
  link?: string;
  count?: number;
  id: number;
};

export type Game = {
  title?: string;
  slug?: string;
  id: number;
  link?: string;
  url?: string;
  date?: string;
  date_game_thumbnail?: string;
  game_thumbnail?: string;
  game_background?: string;
  game_id?: string;
  game_id_netent?: string;
  game_mobile_id?: string;
  game_mobile_id_netent?: string;
  game_solidgaming_id?: string;
  content?: string;
  include_country?: string;
  exclude_country?: string;
  device_type?: string[];
  game_width?: string;
  game_height?: string;
  game_type?: number[];
  game_provider?: GameProvider;
};

export type GamesJson = {
  [name: string]: Game;
};
