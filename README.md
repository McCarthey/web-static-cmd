# web-static-cmd
A command line tool which starts a static server for testing front-end web page

You should install it globally
```bash
npm i web-static-cmd -g
cd [your project dist/public dir]
sss -s
```
then a static server starts on http://localhost:8088

### optional arguments
You can use **-p** to set a proxy for your webapp

for example:
```bash
sss -s -p /api http://www.example.com
```

You can use **-h** to get help
```
sss -h
```