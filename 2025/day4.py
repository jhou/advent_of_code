from utils import *

grid, width, height = read_grid_dict('day4.txt')

def count_adjacent(grid, i, j):
    count = 0
    for x in range(max(0, i-1), min(width, i+2)):
        for y in range(max(0, j-1), min(height, j+2)):
            if not (x==i and y==j) and grid[(x, y)] == '@':
                count += 1
    return count

total_rolls = 0
rolls_removed = 0
while (total_rolls == 0 or rolls_removed > 0):
    rolls_removed = 0
    new_grid = {}
    for i in range(width):
      row = ''
      for j in range(height):
          if grid[(i, j)] == '.':
              row += '.'
              new_grid[(i, j)] = '.'
              continue
          count = count_adjacent(grid, i, j)
          if count < 4:
              row += 'x'
              rolls_removed += 1
              new_grid[(i, j)] = '.'
          else:
              row += str(count)
              new_grid[(i, j)] = grid[(i, j)]
      print(row)
    grid = new_grid
    total_rolls += rolls_removed
    print('rolls_removed', rolls_removed)

print(total_rolls)


