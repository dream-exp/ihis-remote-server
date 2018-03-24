import base64
import requests

b64 = base64.encodestring(open("./Lenna.jpg", 'rb').read())

# print(b64)

payload = {'image': b64}
r = requests.post("http://172.20.10.7:3000/upload", data=payload)

print(r.text)