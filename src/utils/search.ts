// https://en.wikipedia.org/wiki/Levenshtein_distance

import { Game } from "../types/modelTypes";

// Operations needed between two strings
export const levenshteinDistance = (s1 = "", s2 = ""): number => {
  const len1 = s1.length;
  const len2 = s2.length;

  let matrix = Array(len1 + 1);
  for (let i = 0; i <= len1; i++) {
    matrix[i] = Array(len2 + 1);
  }

  for (let i = 0; i <= len1; i++) {
    matrix[i][0] = i;
  }

  for (let j = 0; j <= len2; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + 1
        );
      }
    }
  }

  return matrix[len1][len2];
};

export const fuzzySearch = (games: Game[], searchQuery: string) => {
  const distances = games.map((game: Game) => ({
    game,
    distance: levenshteinDistance(searchQuery, game.title?.toLowerCase()),
  }));

  // Dynamic threshold depending on search query length
  // More text = more error possibility
  const threshold: number = Math.min(Math.floor(searchQuery.length / 3), 5);

  const filteredGames = distances
    .filter(({ distance }) => distance <= threshold)
    .sort((a, b) => a.distance - b.distance)
    .map(({ game }) => game);

  return filteredGames;
};
