import copy
from utils import *

f=open('day6.txt', 'r')
grid = [list(l.strip()) for l in f.readlines()]

directions = {
  # (row_delta, col_delta, next_direction)
  'up': (-1, 0, 'right'),
  'right': (0, 1, 'down'),
  'down': (1, 0, 'left'),
  'left': (0, -1, 'up')
}
def check_in_grid(pos):
  return 0 <= pos[0] < len(grid) and 0 <= pos[1] < len(grid[pos[0]])


def calc_next_position(pos):
    """
    Calculate the next position based on the current position and direction.
    Returns:
    tuple: A new tuple representing the next position:
        - The first element (int): The new row index.
        - The second element (int): The new column index.
        - The third element (str): The unchanged direction.

    """
    row_delta, col_delta = directions[pos[2]][:2]
    return (pos[0] + row_delta, pos[1] + col_delta, pos[2])

def calc_next_direction(pos):
    """
    Returns:
    tuple: A new tuple representing the unchanged position with the new direction:
        - The first element (int): The unchanged row index.
        - The second element (int): The unchanged column index.
        - The third element (str): The next direction in the sequence.
    """
    return (pos[0], pos[1], directions[pos[2]][2])

def get_positions(grid):
  """
  Calculates all unique positions in the grid starting from the '^' character.
  Returns:
  list: A list of tuples representing the unique positions (including directions)

  Raises:
  Exception: If a loop is detected in the grid.
  """
  cur_pos = None
  for row_idx, row in enumerate(grid):
    if '^' in row:
      cur_pos = (row_idx, row.index('^'), 'up')
      break

  all_positions = []
  all_set = set()
  while check_in_grid(cur_pos):
    all_positions += [cur_pos]


    all_set.add(cur_pos)
    next_pos = calc_next_position(cur_pos)
    if check_in_grid(next_pos) and grid[next_pos[0]][next_pos[1]] in '#O':
      cur_pos = calc_next_direction(cur_pos)
    else:
      cur_pos = next_pos
    if cur_pos in all_set:
      raise Exception("Loop detected")
  return all_positions

all_positions = get_positions(grid)
first_position = all_positions[0]
deduped_positions = set([(pos[0], pos[1]) for pos in all_positions])
without_start_pos = deduped_positions.copy()
without_start_pos.remove((first_position[0], first_position[1]))

loops = 0
for dpos in without_start_pos:
  test_grid = copy.deepcopy(grid)
  test_grid[dpos[0]][dpos[1]] = 'O'
  try:
    get_positions(test_grid)
  except Exception as e:
#    print(f"found repeated vector at position: {dpos}")
    loops += 1

print("Part 1 - Total positions:", len(deduped_positions))
print("Part 2 - Total positions (without dedupe):", len(all_positions))
print("Part 2 - Total loops:", loops)
