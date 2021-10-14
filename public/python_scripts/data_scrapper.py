# -*- coding: utf-8 -*-
"""data_scrapper.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/11BNQjws4C4ARZ1bb0BBOZkrIkyrXisDb
"""

import requests
import bs4
import json
from json import JSONEncoder

response = requests.get('https://gslegal.gov.gr/?page_id=138')
soup = bs4.BeautifulSoup(response.text, 'html.parser')
# links = soup.select('div.video-summary-data a[href^=/video]')
tablerows=soup.select('table tbody tr')
ministries = soup.select('td[style*="background-color: "] span[style*="color: #000000"] strong')

for m in ministries:
  # print(m.text)
  if 'ΥΠΟΥΡΓΕΙΟ ' in m.text:
    print(m.text)

def hasNumbers(inputString):
  return any(char.isdigit() for char in inputString)

titles=['ΥΠΟΥΡΓΟΣ', 'ΑΝΑΠΛΗΡΩΤΗΣ ΥΠΟΥΡΓΟΣ', 'ΑΝΑΠΛΗΡΩΤΗΣ ΥΠΟΥΡΓΟΣ','ΥΦΥΠΟΥΡΓΟΣ']

allministries=[]
positions=[]
staff=[]
for tr in tablerows:
  ministry=tr.select('td[style*="background-color: "] span[style*="color: #000000"] strong')
  minister=tr.select('td[style="height: 24px; width: 606.392px;"] span[style*="color: #000000"]')
  minister2=tr.select('td[style*="width: 527px"] strong')
  name=tr.select('td[style="height: 24px; width: 606.392px;"] span[style*="color: #000000"]')
  name2=tr.select('td[style*="width: 527px; height: 24px;"] span[style*="color: #000000"]')
  print(name)
  if len(ministry)>0:
    if 'ΥΠΟΥΡΓΕΙΟ ' in ministry[0].text:
      print('-->',ministry[0].text)
      if len(positions)>0:
        allministries.append(positions)
        allministries.append(staff)
      allministries.append(ministry[0].text)
      positions=[]
      staff=[]
      
  elif len(minister)>0:
    if minister[0].text in titles:
      print('*',minister[0].text)
      positions.append(minister[0].text)
      # inminister=True
  elif len(minister2)>0:
    if minister2[0].text in titles:
      print('*',minister2[0].text)
      positions.append(minister2[0].text)
      # inminister=True
  elif len(name)>0:
    if name[0].text.isupper() and len(allministries)%3==1: 
      if 'ΓΓ ' in name[0].text or 'ΕΓ ' in name[0].text or 'ΥΓ ' in name[0].text  or 'ΥΓΓ ' in name[0].text or len(name[0].text)>40 or hasNumbers(name[0].text):
        continue
      print('==>',name[0].text)
      staff.append(name[0].text)
      # inministry=False
      # inminister=False

response = requests.get('https://government.gov.gr/kivernisi/')
soup = bs4.BeautifulSoup(response.text, 'html.parser')

# ministries=soup.select('ol li')
# roles=soup.select('ul li')
items=soup.select('li')

class Ministry:
  def __init__(self):
    self.roles = []
  def __init__(self, ministry):
    self.ministry = ministry
    self.roles = []
  def set_ministry_name(self,ministry):
    self.ministry = ministry
  def add_role(self,role):
    self.roles.append(role)

class MinistryEncoder(JSONEncoder):
    def default(self, o):
        return o.__dict__

class Role:
  def __init__(self, role, responsibility, name):
    self.role=role
    self.responsibility=responsibility
    self.name=name

class RoleEncoder(JSONEncoder):
    def default(self, o):
        return o.__dict__

allministries=[]
roles=[]
ministers=[]
minname=None
for i in items:
  if i.select('a'):
    pass
  elif ':' in i.text:
    # print(i.text)
    tok=i.text.split(':')
    role=(tok[0], tok[1])
    
    word='ΚΥΒΕΡΝΗΤΙΚΗ ΕΚΠΡΟΣΩΠΟΣ'
    if word in tok[0]:
      wordEndIndex = tok[0].index(word) + len(word)
      prefix=tok[0][:wordEndIndex]
      suffix=tok[0][wordEndIndex:]
      # role=Role(prefix.strip(), suffix.strip(), tok[1].strip())
      # print(json.dumps(role, ensure_ascii=False, cls=RoleEncoder))
      roles.append(role)       

    else:
      word='ΥΠΟΥΡΓΟΣ'
      # print(tok[0])
      wordEndIndex = tok[0].index(word) + len(word)
      prefix=tok[0][:wordEndIndex]
      suffix=tok[0][wordEndIndex:]
      # role=Role(prefix.strip(), suffix.strip(), tok[1].strip())
      # print(json.dumps(role, ensure_ascii=False, cls=RoleEncoder))
      roles.append(role)
  
  else:
    if (len(i.text)>0):
      if len(roles)==0:
        min=Ministry(i.text)
      else:
        # allministries.append(roles)
        for r in roles:
          min.add_role(r)
        allministries.append(min)  
        print(json.dumps(min,ensure_ascii=False,cls=MinistryEncoder))
        roles=[]
        min=Ministry(i.text)

      # allministries.append(i.text)
      # min=Ministry(i.text)
      # roles=[]

json_string = json.dumps(allministries,ensure_ascii=False,cls=MinistryEncoder)
print(json_string)

