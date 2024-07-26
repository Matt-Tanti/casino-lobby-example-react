import {
  createContext,
  PropsWithChildren,
  Reducer,
  useEffect,
  useReducer,
  useState,
} from "react";
import defaultGamesJson from "../constants/games.json";
import { Action, Game, Games } from "../types/modelTypes";
import { SET_FILTERED_GAMES, SET_SEARCH_FILTER } from "../types/reducerTypes";

type GamesContextState = {
  filteredGames: Games | null;
  searchFilter: string | null;
};

type GamesContextInterface = GamesContextState & {
  setSearchFilter: (searchFilter: string) => void;
  getGameBySlug: (slug?: string) => Game | null;
};

const initialState: GamesContextInterface = {
  filteredGames: null,
  searchFilter: null,
  setSearchFilter: () => undefined,
  getGameBySlug: () => null,
};

export const GamesContext = createContext<GamesContextInterface>(initialState);

const GamesReducer = (state: GamesContextState, action: Action) => {
  switch (action.type) {
    case SET_FILTERED_GAMES:
      return {
        ...state,
        filteredGames: action.payload,
      };
    case SET_SEARCH_FILTER:
      return {
        ...state,
        searchFilter: action.payload,
      };
    default:
      return state;
  }
};

export const GamesProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer<Reducer<GamesContextState, Action>>(
    GamesReducer,
    initialState
  );

  // Internal variable to keep track of all the games
  const [defaultGames, setDefaultGames] = useState<Games | null>(null);

  // Sets the default games
  useEffect(() => {
    if (!defaultGamesJson) return;

    setDefaultGames(defaultGamesJson);
  }, []);

  // On defaultGames/ searchFilter update
  // Update filteredGames
  useEffect(() => {
    if (!defaultGames) return;

    if (!state.searchFilter) setFilteredGames(defaultGames);

    //TODO add filtering
  }, [defaultGames, state.searchFilter]);

  // Sets the filtered games
  const setFilteredGames = (filteredGames: Games) => {
    dispatch({
      type: SET_FILTERED_GAMES,
      payload: filteredGames,
    });
  };

  // Sets the search filter
  const setSearchFilter = (searchFilter: string) => {
    dispatch({
      type: SET_SEARCH_FILTER,
      payload: searchFilter,
    });
  };

  // Gets game details by slug
  const getGameBySlug = (slug?: string) => {
    if (!slug) return null;

    return state.filteredGames?.[slug] ?? null;
  };

  return (
    <GamesContext.Provider
      value={{
        filteredGames: state.filteredGames,
        searchFilter: state.searchFilter,
        setSearchFilter,
        getGameBySlug,
      }}
    >
      {children}
    </GamesContext.Provider>
  );
};
