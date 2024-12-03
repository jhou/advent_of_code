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
        return False
    elif dir == 'up' and i <= prev:
      return False
    elif dir == 'down' and i >= prev:
      return False

    if abs(i - prev) > 3:
      return False
    prev = i

  return True

def remove_index(idx, report):
  return report[:idx] + report[idx + 1:]

def gen_sub_reports(report):
  sub_reports = []
  for i in range(len(report)):
    sub_reports.append(remove_index(i, report))
  return sub_reports

valid_reports = 0
for report in reports:
  if check_report(report):
    #print('Valid: ', report)
    valid_reports += 1
  else:
    for sub_report in gen_sub_reports(report):
      if check_report(sub_report):
        valid_reports += 1
        break
    print('Invalid: ', report)

print("Valid reports:", valid_reports)
