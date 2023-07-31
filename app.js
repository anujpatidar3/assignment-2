const fs = require('fs');
const path = require('path');

const filesSystem= {
    root: {
        files: ['file1.txt', 'file2.txt'],
        directories: ['dir1', 'dir2'],
    },
    dir1: {
        files: ['file3.txt'],
        directories: [],
    },
    dir2: {
        files: ['file4.txt'],
        directories: ['subDir1'],
    },
    subDir1: {
        files: ['file5.txt'],
        directories: [],
    },
}

let currentDirectory= filesSystem.root

function getParentDirectory(directory) {
    if (directory === filesSystem.root){
        return null
    }
    return Object.values(filesSystem).find(dir => dir.directories.includes(directory))
}

function getPath(directory){
    const parts = []
    const parentsMap = {}

    const findDirectoryByName = (name) => filesSystem.find(dir => dir === name)
    filesSystem.forEach(dir=> {
        dir.directories.forEach(subDir => {
            parentsMap[subDir] = dir
        })
    })


    

    let currentDirectory= directory

    while(currentDirectory!=filesSystem.root){
        parts.unshift(currentDirectory)
        currentDirectory = parentsMap[parentDirectory]
        if (parts.includes(currentDirectory)){
            break
        }
    }
    return '/'+parts.join('/')
}

function getCurrentPath() {
    return getPath(currentDirectory);
}

function printCurrentDirectory() {
    console.log('CurrentDirectory:', getCurrentPath())
}

function makeDirectory(directoryName) {
    if(!currentDirectory.directories.includes(directoryName)){
        currentDirectory.directories.push(directoryName)
        currentDirectory[directoryName] = {
            files: [],
            directories: []
        }
        console.log(`Directory Created: ${directoryName}`)
    } else {
        console.log(`Directory already exists with the name: ${directoryName}`)
    }
}

function changeDirectory(directoryName) {
    if(directoryName === '..') {
        if(currentDirectory !== filesSystem.root){
            currentDirectory = getParentDirectory(currentDirectory)
        }
    } else if (currentDirectory.directories.includes(directoryName)) {
        currentDirectory = currentDirectory[directoryName]
        return 'directory changed'
    } else {
        console.log(`Directory not found`)
    }
}

function moveDirectory (sourceDirectory, destinationDirectory) {
    if (currentDirectory.directories.includes(sourceDirectory)) {
        if(currentDirectory.directories.includes(destinationDirectory)) {
            const destinationDirectoryIndex = currentDirectory.directories.indexOf(destinationDirectory)
            const destinationDirectoryObject = currentDirectory.directories[destinationDirectoryIndex]
            currentDirectory.directories.push(sourceDirectory)
            currentDirectory[destinationDirectory] = destinationDirectoryObject

            const sourceDirectoryIndex = currentDirectory.directories.indexOf(sourceDirectory)
            currentDirectory.directories.splice(sourceDirectoryIndex, 1)

            delete currentDirectory[sourceDirectory]

            console.log(`Directory moved successfully`)
        } else {
            console.log(`Destination Directory not found`)
        }
    } else {
        console.log(`Source Directory not found`)
    }
}

function listFilesAndDirectories() {
    console.log(`Files are: `, currentDirectory.files.join(', '))
    console.log(`Directories are: `, currentDirectory.directories.join(', '))
}

function simulationFileSystem() {

    makeDirectory('newDirectory')
    printCurrentDirectory()
    listFilesAndDirectories()

    console.log(changeDirectory('newDirectory'))
    printCurrentDirectory()
    listFilesAndDirectories()

    moveDirectory('newDirectory', 'dir1')
    printCurrentDirectory()
}

simulationFileSystem()