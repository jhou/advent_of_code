from utils import *
from functools import reduce
import operator


f=open('day6.txt', 'r')
  
raw_problems = [line + ' ' for line in f.readlines()]
split_raw_problems = [line.split() for line in raw_problems]
part1_problems = []
# problems is a list of dictionaries, where each dictionary has an 'op' and 'args' key
for row_idx, row in enumerate(split_raw_problems):
  for arg_idx, arg in enumerate(row):
    if row_idx == 0:
      part1_problems.append({'op': None, 'args': [int(arg)]})
    elif row_idx == len(raw_problems) - 1:
      part1_problems[arg_idx]['op'] = arg
    else:
      part1_problems[arg_idx]['args'].append(int(arg))

part2_problems = []
op_row = raw_problems[-1]
# create the list of problems, using the op row as 
# the guide for how many characters are in the columns for each problem (length)
for i in range(len(op_row)):
  if op_row[i] in ('+', '*'):
    part2_problems.append({
      'op': op_row[i], 
      'length': 1,
      'args': []
    })
  else:
    part2_problems[-1]['length'] += 1

# now, go through each problem, and fill in the args, going from rightmost 
# column of each of the rows in raw_problems
raw_problem_pointer = 0
for prob_idx, problem in enumerate(part2_problems):
  args = []
  for i in range(problem['length']-1):
    args.append('')
    for j in range(len(raw_problems) - 1):
      args[-1] += raw_problems[j][raw_problem_pointer]
    # got one number, go to the next column
    raw_problem_pointer += 1
  # got to the space after the last number, go to the next column for the next problem
  raw_problem_pointer += 1
  problem['args'] = list(map(int, args))

def operate(problems):
  total = 0
  for problem in problems:
    if problem['op'] == '+':
      op = operator.add
    elif problem['op'] == '*':
      op = operator.mul
    else:
      raise Exception("Invalid op: " + problem['op'])
    total += reduce(op, problem['args'])
  return total

print("part 1: total :", operate(part1_problems))

# part 2
print("part 2: total :", operate(part2_problems))
