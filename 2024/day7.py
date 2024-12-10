from utils import *

f=open('day7.txt', 'r')

def make_equation(eq_str):
  result, operands = eq_str.split(':')
  return {
    'result': int(result),
    'operands': [int(op) for op in operands.strip().split(' ')]
  }

def do_calc(int_list, operators):
  so_far = int_list[0]
  for op_num, operand in enumerate(int_list[1:]):
    if (operators[op_num]) == '*':
      so_far *= operand
    elif (operators[op_num]) == '+':
      so_far += operand
    elif (operators[op_num]) == '||':
      so_far = int(str(so_far) + str(operand))
  return so_far

def gen_operators(how_many_operations, three_operators=False):
  if how_many_operations == 1:
    if three_operators:
      return [['+'], ['*'], ['||']]
    else:
      return [['+'], ['*']]
  next_ops = gen_operators(how_many_operations - 1, three_operators)
  full_operators = []
  for next_op in next_ops:
    full_operators.append(next_op + ['+'])
  for next_op in next_ops:
    full_operators.append(next_op + ['*'])
  if three_operators:
    for next_op in next_ops:
      full_operators.append(next_op + ['||'])
  return full_operators

equations = [
  make_equation(l.strip())
  for l
  in f.readlines()
]
total = 0
part2 = True
for e in equations:
  solution_found = False
  ops = gen_operators(len(e['operands']) -1, part2)
  for operation in ops:
    if e['result'] == do_calc(e['operands'], operation):
      total += e['result']
      break

print(f"Part {'2' if part2 else '1'} - Total:", total)
