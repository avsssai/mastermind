import { Color } from "../store/useStore";
import { COLORS } from "../constants/colors";
import { GRID } from "../constants/grid";

export function createDistinctSolution() {
  const sol: Color[] = [];
  const colors: Color[] = Object.values(COLORS);
  for (let i = 0; i < GRID.ROW_LENGTH; i++) {
    let randomColor: Color = pickRandomColor(colors);
    while (sol.includes(randomColor)) {
      randomColor = pickRandomColor(colors);
    }
    sol.push(randomColor);
  }
  return sol;
}
export function createMultipleSolution() {
  const sol: Color[] = [];
  const colors: Color[] = Object.values(COLORS);
  for (let i = 0; i < GRID.ROW_LENGTH; i++) {
    const randomColor: Color = pickRandomColor(colors);

    sol.push(randomColor);
  }
  return sol;
}

function pickRandomColor(colors: Color[]): Color {
  const random = Math.floor(Math.random() * colors.length);
  return colors[random];
}
