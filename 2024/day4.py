from utils import *

f=open('day4.txt', 'r')
grid = [l.strip() for l in f.readlines()]

def find_xmas(row_idx, col_idx):
  start_row = max(0, row_idx - 1)
  end_row = min(len(grid) - 1, row_idx + 1)
  start_col = max(0, col_idx - 1)
  end_col = min(len(grid[0]) - 1, col_idx + 1)
  total = 0
  # search the square around 'X' for an 'M'
  for r in range(start_row, end_row + 1):
    for c in range(start_col, end_col + 1):
      if grid[r][c] == 'M':
        # which direction on the row/column do we move?
        # actually more of a delta than a direction.
        row_dir = r - row_idx
        col_dir = c - col_idx
        # don't go outside the grid.
        if r + 2*row_dir < 0 or r + 2*row_dir >= len(grid):
          continue
        if c + 2*col_dir < 0 or c + 2*col_dir >= len(grid[0]):
          continue
        # we know we found 'XM' so far, so look for 'A' and 'S'
        if grid[r + row_dir][c + col_dir] == 'A' and grid[r + 2*row_dir][c + 2*col_dir] == 'S':
          total += 1
  return total

def find_x_mas(row_idx, col_idx):
  ul = grid[row_idx-1][col_idx-1]
  ur = grid[row_idx-1][col_idx+1]
  dl = grid[row_idx+1][col_idx-1]
  dr = grid[row_idx+1][col_idx+1]
  # top M's, bottom S's
  if ul == 'M' and ur == 'M' and dl == 'S' and dr == 'S':
    return 1
  # left M's, right S's
  if ul == 'M' and ur == 'S' and dl == 'M' and dr == 'S':
    return 1
  # bottom M's, top S's
  if ul == 'S' and ur == 'S' and dl == 'M' and dr == 'M':
    return 1
  # right M's, left S's
  if ul == 'S' and ur == 'M' and dl == 'S' and dr == 'M':
    return 1
  return 0

total_xmas = 0
total_x_mas = 0
for row_idx, row in enumerate(grid):
  for col_idx, col in enumerate(row):
    if col == 'X':
      # found an 'X', now look in the neighboring positions for 'M','A','S'
      total_xmas += find_xmas(row_idx, col_idx)
    elif 0 < row_idx < (len(grid) - 1) and 0 < col_idx < (len(row) - 1) and col == 'A':
      # only consider the inner rectangle (excluding 1 row from top,bottom,left,right)
      total_x_mas += find_x_mas(row_idx, col_idx)

print("Total XMAS:", total_xmas)
print("Total X-MAS:", total_x_mas)
