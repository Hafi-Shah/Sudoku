export class SudokuValidator {
  private grid: number[][];
  private size: number;
  private subGridSize: number;

  constructor(grid: number[][]) {
    this.grid = grid;
    this.size = grid.length;
    this.subGridSize = Math.sqrt(this.size);
  }

  private isValidSet(numbers: number[]): boolean {
    const uniqueNumbers = new Set(numbers);
    for (let i = 1; i <= this.size; i++) {
      if (!uniqueNumbers.has(i)) return false;
    }
    return true;
  }

  private validateRows(): boolean {
    for (const row of this.grid) {
      if (!this.isValidSet(row)) return false;
    }
    return true;
  }

  private validateColumns(): boolean {
    for (let col = 0; col < this.size; col++) {
      const column = this.grid.map((row) => row[col]);
      if (!this.isValidSet(column)) return false;
    }
    return true;
  }

  private validateSubGrids(): boolean {
    for (let row = 0; row < this.size; row += this.subGridSize) {
      for (let col = 0; col < this.size; col += this.subGridSize) {
        const subGrid: number[] = [];
        for (let r = 0; r < this.subGridSize; r++) {
          for (let c = 0; c < this.subGridSize; c++) {
            subGrid.push(this.grid[row + r][col + c]);
          }
        }
        if (!this.isValidSet(subGrid)) return false;
      }
    }
    return true;
  }

  public validate(): boolean {
    if (this.size === 0 || this.subGridSize % 1 !== 0) return false;
    return (
      this.validateRows() && this.validateColumns() && this.validateSubGrids()
    );
  }
}
