import json
from collections import Counter

# some JSON:
x =  open("Spring2021.json");

# parse x:
y = json.load(x)

courses = {}
template = {'name': '', 'A+': 0, 'A': 0, 'A-': 0, 'B+': 0, 'B': 0, 'B-': 0, 'C+': 0, 'C': 0, 'C-': 0, 'D+': 0, 'D': 0, 'D-': 0, 'F': 0, 'W': 0}

def append(name, sub):
    if(name not in courses):
        courses[name] = template
        courses[name]["name"] = name
    c = Counter()
    for data in (courses[name], sub):
        c.update(data)
    courses[name] = dict(c)

for i in range(len(y)):
    subject = y[i]["subj"]
    number = y[i]["num"]
    name = subject+number
    append(name, y[i]["grades"])

x = open("2020Fall.json")

def append(name, sub):
    if(name not in courses):
        courses[name] = template
        courses[name]["name"] = name
    c = Counter()
    for data in (courses[name], sub):
        c.update(data)
    courses[name] = dict(c)

for i in range(len(y)):
    subject = y[i]["subj"]
    number = y[i]["num"]
    name = subject+number
    append(name, y[i]["grades"])

f = open("data.json", "a")
for keys in courses:
    #print(str(courses[keys]))
    f.write(str(courses[keys])+",\n")

f.close()
