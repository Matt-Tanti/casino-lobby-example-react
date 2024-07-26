import {
  createContext,
  PropsWithChildren,
  Reducer,
  useEffect,
  useReducer,
  useState,
} from "react";
import { Action, Games } from "../types/modelTypes";
import { SET_FILTERED_GAMES, SET_SEARCH_FILTER } from "../types/reducerTypes";

type GamesContextState = {
  filteredGames: Games | null;
  searchFilter: string | null;
};

type GamesContextInterface = GamesContextState & {
  setGames: (games: Games) => void;
  setSearchFilter: (searchFilter: string) => void;
};

const initialState: GamesContextInterface = {
  filteredGames: null,
  searchFilter: null,
  setGames: () => undefined,
  setSearchFilter: () => undefined,
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

  // On defaultGames/ searchFilter update
  // Update filteredGames
  useEffect(() => {
    //TODO
  }, [defaultGames, state.searchFilter]);

  // Sets the default games
  const setGames = (games: Games) => {
    setDefaultGames(games);
  };

  // Sets the search filter
  const setSearchFilter = (searchFilter: string) => {
    dispatch({
      type: SET_SEARCH_FILTER,
      payload: searchFilter,
    });
  };

  return (
    <GamesContext.Provider
      value={{
        filteredGames: state.filteredGames,
        searchFilter: state.searchFilter,
        setGames,
        setSearchFilter,
      }}
    >
      {children}
    </GamesContext.Provider>
  );
};
