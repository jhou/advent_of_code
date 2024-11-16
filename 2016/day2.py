from utils import *

f=open('day2.txt', 'r')
lines = [line.strip() for line in f.readlines()]

# first digit of position is the row, second digit is the column
grid = [
  ['.', '.', '1', '.', '.'],
  ['.', '2', '3', '4', '.'],
  ['5', '6', '7', '8', '9'],
  ['.', 'A', 'B', 'C', '.'],
  ['.', '.', 'D', '.', '.']
]
def get_digit(position):
  return grid[position[0]][position[1]]

def check_position(position):
  if position[0] < 0 or position[0] > 4 or position[1] < 0 or position[1] > 4:
    return False
  if get_digit(position) == '.':
    return False
  return True

def run_line(line, position):
  for c in line:
    if c == 'U' and check_position([position[0] - 1, position[1]]):
      position[0] = position[0] - 1
    elif c == 'D' and check_position([position[0] + 1, position[1]]):
      position[0] = position[0] + 1
    elif c == 'L' and check_position([position[0], position[1] - 1]):
      position[1] = position[1] - 1
    elif c == 'R' and check_position([position[0], position[1] + 1]):
      position[1] = (position[1] + 1)
    else:
      print(f"Invalid character: {c}")

    print(f"instruction: {c} , position: {position}")

  return position


digits=[]
pos = [2,0]
for line in lines:
  pos = run_line(line, pos)
  print(f"position: {pos}, digit: {get_digit(pos)}")
  digits.append(str(get_digit(pos)))

print(f"digits: {''.join(digits)}")
