#!/usr/bin/env node
const fs = require("fs")
const express = require("express")
const path = require("path")
const proxy = require("http-proxy-middleware")
const curPath = process.cwd()

function startServer(argv) {
    // console.log('参数',argv)
    if (argv[0] === "-h" || argv[0] === "--help") {
        console.log("usage:\n")
        console.log("-v or --version [show version]")
        console.log("-s or --start [start a static server on current dir]")
        console.log(
            "-s -p <path> <proxy url> <oldPath> <newPath> [start a static server on current dir and set a proxy, such as 'sss -s -p //api http://www.example.com' //oldpath //newpath]"
        )
    } else if (argv[0] === "-v" || argv[0] === "--version") {
        // 读取并输出package.json中的version
        fs.readFile(`${__dirname}/package.json`, (err, data) => {
            if (err) {
                return console.error(err)
            }
            console.log(`v${JSON.parse(data).version}`)
        })
    } else if (argv[0] === "-s" || argv[0] === "start") {
        const app = express()
        app.use("/", express.static(curPath)) // ? 想要配置更多参数
        // 代理配置（可选）
        if (argv[1] === "-p" || argv[1] === "--proxy") {
            if (argv[2] && argv[3]) {
                // 如果未传入后两个参数 则默认为'/'
                argv[4] = argv[4] ? argv[4] : "/"
                argv[5] = argv[5] ? argv[5] : "/"
                app.use(
                    proxy(argv[2], {
                        target: argv[3],
                        changeOrigin: true,
                        pathRewrite: {
                            ["^" + argv[4]]: argv[5]
                        }
                    })
                )
            } else {
                console.log(
                    "Please input your proxy mapTable[such as /api https://www.example.com]"
                )
                return false
            }
        }

        app.listen(8099, () => {
            console.log(`A static server is running on http://localhost:8099`)
        })
    } else {
        console.log('No such command.Please try "sss -h" to get help')
    }
}

startServer(process.argv.slice(2))
