from utils import *
import hashlib

#f=open('day4.txt', 'r')
#lines = [line.strip() for line in f.readlines()]

door_id = 'uqwqemis'
#door_id = 'abc'

def md5(str):
  return hashlib.md5(str.encode()).hexdigest()

password = ''
password2 = [''] * 8
i = 1
while len(password) < 8 or password2.count('') > 0:
  hash = md5(f'{door_id}{i}')
  if hash[:5] == '00000':
    print(i, hash)
    if len(password) < 8:
      password += hash[5]
    if hash[5].isdigit() and int(hash[5]) < 8 and password2[int(hash[5])] == '':
      password2[int(hash[5])] = hash[6]
  i += 1

print(f"Final password: {password}")
print(f"Final password2: {''.join(password2)}")

