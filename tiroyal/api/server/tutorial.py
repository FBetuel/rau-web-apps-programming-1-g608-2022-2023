print("Hello, World!")
a = 10 
b = 20
c = 10.5
d = "This is a string."
e = 'This is another string.'
f = f"This a dynamic string {a}"
g = """This is a multi line
string
"""
print(f)


# list 
l1 = [1, 2, 3, "String1", [5, 6, 7]]
l2 = list(l1)

print(l1)
print(l1[0])
l1[4] = "String2"
print(l1)

l1.append("String3")
print(l1)
l1.remove(3)
print(l1)

l1.extend(l2)
print(l1)

stack = []
stack.append("call1")
stack.append("call2")
stack.append("call3")

print(stack.pop())
print(stack.pop())
print(stack.pop())

t1 = (1, 2, 3, ["v1", "v2"])
t2 = tuple(t1)

print(t1[0])
print(t1)
t1[3][0] = "new value"
print(t1)

l3 = list(l2)
l4 = l3
print(l3)
print(l4)
l4[0] = "2000"
print(l3)
print(l4)

l5 = list(l4)
print(l5)
l4[0] = 5000
print(l4)
print(l5)

d1 = {
    "name": "G608",
    "year": 2022,
    "uni": "RAU",
    "address": {
        "street": "",
        "city": "",
        "postcode": ""
    },
    "phone": {
        "country_code": "+40",
        "number": 111111111
    },
    "students": [
        {
            "name": "A",
        }
    ]
}

print(d1)
d1["loc"] = "Bucuresti"
print(d1)

d1["phone"]["country_code"] = "+44"

print(d1)

d1.get("phone", {})

keys = d1.keys()
values = d1.values()
items = d1.items()

print(list(keys))
print(list(values))
print(list(items))

# >, >=, <, <=, ==, != and, or, not, in
if a > 10 and b == 30:
    print(values)
elif c in l1:
    print(keys)
else:
    print(items)

for element in l1:
    print(element)

for idx in range(len(l1)):
    print(idx, l1[idx])

s = 10
while s > 0:
    print(f"Iteratia {s}")
    s = s - 1

def numele():
    a = 10
    b = a / 3
    return b


def is_odd(x):
    if x % 2 == 0:
        return False
    else:
        return True 


val = numele()
print(val)

isodd = is_odd(x=24)
print(isodd)