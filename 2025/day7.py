from utils import *

grid = read_grid('day7.txt')

def print_grid(grid):
    for row in grid:
        print(''.join(row))

total_splits = 0
# go through each row, and find the splits
for row_idx, row in enumerate(grid):
    if row_idx == len(grid) - 1:
        break
    for col_idx, col in enumerate(row):
        if col == 'S':
            grid[row_idx + 1][col_idx] = '|'
        elif col == '|':
            if grid[row_idx + 1][col_idx] == '^':
                grid[row_idx + 1][col_idx - 1] = '|'
                grid[row_idx + 1][col_idx + 1] = '|'
                total_splits += 1
            else:
                grid[row_idx + 1][col_idx] = '|'
    # print_grid(grid)

# part 1
print('total splits', total_splits)

# part 2
def count_paths(row_idx, col_idx, grid, memo):
    # Use memoization to avoid recomputing paths for the same (r, c)
    if (row_idx, col_idx) in memo:
        return memo[(row_idx, col_idx)]

    # Reached the bottom of the grid
    if row_idx == len(grid) - 1:
        return 1

    paths = 0
    # If the cell directly below is a '^', it's a split point
    if grid[row_idx + 1][col_idx] == '^':
        # Check if there's a beam to the left in the next row
        if col_idx > 0 and grid[row_idx + 1][col_idx - 1] == '|':
            paths += count_paths(row_idx + 1, col_idx - 1, grid, memo)
        # Check if there's a beam to the right in the next row
        if col_idx < len(grid[0]) - 1 and grid[row_idx + 1][col_idx + 1] == '|':
            paths += count_paths(row_idx + 1, col_idx + 1, grid, memo)
    # If the cell directly below is a '|', continue straight down
    elif grid[row_idx + 1][col_idx] == '|':
        paths += count_paths(row_idx + 1, col_idx, grid, memo)
 
    # else it's neither '^' nor '|' below, no path continues from here

    memo[(row_idx, col_idx)] = paths
    return paths

# Find the starting 'S' position
start_col = -1
for col_idx, char in enumerate(grid[0]):
    if char == 'S':
        start_col = col_idx
        break

# memoization dictionary
memo = {}
# Start counting paths from the beam directly below 'S'
total_paths = count_paths(1, start_col, grid, memo)
print('total paths', total_paths)
    
