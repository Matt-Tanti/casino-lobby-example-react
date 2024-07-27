import {
  createContext,
  PropsWithChildren,
  Reducer,
  useEffect,
  useReducer,
  useState,
} from "react";
import defaultGamesJson from "../constants/games.json";
import { Action, Game, GamesJson } from "../types/modelTypes";
import { SET_FILTERED_GAMES, SET_SEARCH_FILTER } from "../types/reducerTypes";
import { fuzzySearch } from "../utils/search";

type GamesContextState = {
  filteredGames: Game[] | null;
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
  const [defaultGames, setDefaultGames] = useState<GamesJson | null>(null);

  // Sets the default games
  useEffect(() => {
    if (!defaultGamesJson) return;

    setDefaultGames(defaultGamesJson);
  }, []);

  // On defaultGames/ searchFilter update
  // Update filteredGames
  useEffect(() => {
    if (!defaultGames) return;

    const defaultGamesArray: Game[] = Object.values(defaultGames);

    if (!state.searchFilter) {
      setFilteredGames(defaultGamesArray);
      return;
    }

    // Lowercase search query to remove case sensitivity
    const searchQuery: string = state.searchFilter.toLowerCase();

    // Initially match with substring
    let filteredGames: Game[] = defaultGamesArray.filter((game: Game) =>
      game.title?.toLowerCase().includes(searchQuery)
    );

    // Fuzzy search if no substring matches
    if (filteredGames.length < 1)
      filteredGames = fuzzySearch(defaultGamesArray, searchQuery);

    setFilteredGames(filteredGames);
  }, [defaultGames, state.searchFilter]);

  // Sets the filtered games
  const setFilteredGames = (filteredGames: Game[]) => {
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

    return defaultGames?.[slug] ?? null;
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
