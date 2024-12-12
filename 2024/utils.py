import json

def print_json(n):
  print(json.dumps(n, indent=2))

def read_grid(filename):
  f=open(filename, 'r')
  grid = [list(l.strip()) for l in f.readlines()]
  return grid

def read_grid_dict(filename, use_int = False):
  grid_list = read_int_grid(filename) if use_int else read_grid(filename)
  grid_dict = {}
  for i, row in enumerate(grid_list):
    for j, cell in enumerate(row):
      grid_dict[(i, j)] = cell
  return grid_dict

def read_int_grid(filename):
  f=open(filename, 'r')
  grid = [list(map(int, list(l.strip()))) for l in f.readlines()]
  return grid
