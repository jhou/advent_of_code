from utils import *

f=open('day2.txt', 'r')
reports = [[int(num) for num in line.strip().split(' ')] for line in f.readlines()]

def check_report(report):
  prev = None
  dir = None
  for idx, i in enumerate(report):
    if prev is None:
      prev = i
      continue
    if dir is None:
      if i > prev:
        dir = 'up'
      elif i < prev:
        dir = 'down'
      else:
        return False, idx
    elif dir == 'up' and i <= prev:
      return False, idx
    elif dir == 'down' and i >= prev:
      return False, idx

    if abs(i - prev) > 3:
      return False, idx
    prev = i

  return True, None

def remove_index(idx, report):
  return report[:idx] + report[idx + 1:]

def gen_sub_reports(report, idx):
  return [remove_index(0, report), remove_index(idx, report)]

valid_reports = 0
for report in reports:
  safe, unsafe_idx = check_report(report)
  if safe:
    #print('Valid: ', report)
    valid_reports += 1
  else:
    for sub_report in gen_sub_reports(report, unsafe_idx):
      sub_safe, sub_idx = check_report(sub_report)
      if sub_safe:
        valid_reports += 1
        break
    print('Invalid: ', report)

print("Valid reports:", valid_reports)
