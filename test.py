from io import StringIO
import urllib.request
import webvtt

url = 'https://course-recording-q1-2020-taii.s3.eu-west-3.amazonaws.com/us/GMT20200117-205611_AI-Inst--U.transcript.vtt'
response = urllib.request.urlopen(url)
data = response.read() 
text = data.decode('utf-8')
buffer = StringIO(text)

for l in webvtt.read_buffer(buffer):
    print(l.text)