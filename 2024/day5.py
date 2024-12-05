from utils import *
import math

f=open('day5.txt', 'r')
raw_rules, updates = f.read().strip().split('\n\n')
raw_rules = [list(map(int, rule.strip().split('|'))) for rule in raw_rules.split('\n')]
updates = [list(map(int, update.strip().split(','))) for update in updates.split('\n')]

def find_middle(update):
  return update[math.floor(len(update) / 2)]

def check_update_single_rule(idx, update, rule_nums):
  update_right = update[idx:]
  for right_num in rule_nums:
    if right_num in update and right_num not in update_right:
      return False, right_num
  return True, None

def check_update(update):
  for idx, num in enumerate(update):
    passed, failed_num = check_update_single_rule(idx, update, rules[num])
    if not passed:
      return False, failed_num
  return True, None

def move_list_element_to_end(l, item):
    idx = l.index(item)
    # 1 first part of list before element to be moved
    # 2 rest of the list after element
    # 3 the moved element
    return l[:idx] + l[idx+1:] + [ item ]

corrections = 0
def correct_update(update, failed_num):
  global corrections
  while failed_num is not None:
    print(update)
    update = move_list_element_to_end(update, failed_num)
    corrections += 1
    passed, failed_num = check_update(update)
  return update

rules = {}
# process rules into a dict to easily find order requirements
# key is the number, value is a list of number which should come *after*
for rule in raw_rules:
  if rule[0] not in rules:
    rules[rule[0]] = []
  rules[rule[0]].append(rule[1])

total_of_middles = 0
total_of_corrected_middles = 0
for update in updates:
  update_passed, failed_num = check_update(update)
  if update_passed:
    total_of_middles += find_middle(update)
  else:
    corrected_update = correct_update(update, failed_num)
    total_of_corrected_middles += find_middle(corrected_update)



print(f"Total of Middles: {total_of_middles}")
print(f"Total of Corrected Middles: {total_of_corrected_middles}")
print(f"Total Corrections: {corrections}")
