#!/usr/bin/env node

const express = require("express")
const path = require("path")
const proxy = require("http-proxy-middleware")
const curPath = process.cwd()

function startServer(argv) {
    if (argv[0] === "-h" || argv[0] === "--help") {
        console.log("usage:\n")
        console.log("-v or --version [show version]")
        console.log("-s or --start [start a static server on current dir]")
        console.log("-s -p <path> <proxy url> [start a static server on current dir and set a proxy, such as 'sss -s -p /api http://www.example.com']")
    } else if (argv[0] === "-v" || argv[0] === "--version") {
        console.log("v1.0.2")
    } else if (argv[0] === "-s" || argv[0] === "start") {
        const app = express()
        app.use("/", express.static(curPath)) // ? 想要配置更多参数

        // 代理配置（可选）
        if (argv[1] === "-p" || argv[1] === "--proxy") {
            if (argv[2] && argv[3]) {
                app.use(
                    argv[2],
                    proxy({
                        target: argv[3],
                        changeOrigin: true
                    })
                )
            } else {
                console.log(
                    "Please input your proxy mapTable[such as /api https://www.example.com]"
                )
                return false
            }
        }

        app.listen(8088, () => {
            console.log(`A static server is running on http://localhost:8088`)
        })
    } else {
        console.log('No such command.Please try "sss -h" to get help')
    }
}

startServer(process.argv.slice(2))
