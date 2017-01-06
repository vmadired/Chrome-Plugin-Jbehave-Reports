#!/usr/bin/env bash


function killAllChromes {
    killall -SIGTERM 'Google Chrome'
}

function startChrome {
    open -a Google\ Chrome --args --disable-web-security --user-data-dir
}

function main {
    killAllChromes
    startChrome
}

main