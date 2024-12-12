from utils import *

DIRECTIONS = [(0, 1), (1, 0), (0, -1), (-1, 0)]

grid = read_int_grid('day10.txt')

def in_grid(point):
  return 0 <= point[0] < len(grid) and 0 <= point[1] < len(grid[0])
def move_direction(point, direction):
  return (point[0] + direction[0], point[1] + direction[1])

def get_point_number(point):
  return grid[point[0]][point[1]]

def find_peaks(point, counter=0):
  if counter == 9:
    # base case; we got to 9 somehow, this is one way to do it.
    return [point]
  total_peaks = []
  for direction in DIRECTIONS:
    new_point = move_direction(point, direction)
    if in_grid(new_point) and get_point_number(new_point) == (counter + 1):
      total_peaks += find_peaks(new_point, counter + 1)
  return total_peaks
def find_paths(point, counter=0):
  if counter == 9:
    # base case; we got to 9 somehow, this is one way to do it.
    return 1
  total_paths = 0
  for direction in DIRECTIONS:
    # going in all directions, even though one of them is unecessary
    # most of the time - we just came from there.
    new_point = move_direction(point, direction)
    if in_grid(new_point) and get_point_number(new_point) == (counter + 1):
      total_paths += find_paths(new_point, counter + 1)
  return total_paths

start_points = []
for row_idx, row in enumerate(grid):
  for col_idx, col in enumerate(row):
    if col == 0:
      start_points.append((row_idx, col_idx))

num_peaks = 0
num_paths = 0
for start_point in start_points:
  cur_peaks = find_peaks(start_point, 0)
  num_peaks += len(set(cur_peaks))
  num_paths += find_paths(start_point, 0)


print(f"Part 1 - Number of peaks: {num_peaks}")
print(f"Part 2 - Number of paths: {num_paths}")
