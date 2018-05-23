#!/usr/bin/env node

const express = require("express")
const path = process.cwd()

function startServer(argv) {
    if (argv[0] === "-h" || argv[0] === "--help") {
        console.log("usage:\n")
        console.log("-v or --version [show version]")
        console.log("-s or --start [start a static server on current dir]")
    } else if (argv[0] === "-v" || argv[0] === "--version") {
        console.log("v1.0.2")
    } else if (argv[0] === "-s" || argv[0] === "start") {
        const app = express()
        app.use("/", express.static(path)) // ? 想要配置第二个参数
        app.listen(8088, () => {
            console.log(`A static server is running on http://localhost:8088`)
        })
    } else {
        console.log('No such command.Please try "sss -h" to get help')
    }
}

startServer(process.argv.slice(2))