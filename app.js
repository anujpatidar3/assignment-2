const fs = require('fs')
const path = require('path')

const filesSystem = {
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

let currentDirectory = filesSystem.root

function getParentDirectory(directory) {
    if (directory === filesSystem.root) {
        return {}
    }
    return Object.values(filesSystem).find((dir) =>
        dir.directories.includes(directory)
    ) || filesSystem.root
}


function getPath(directory) {
    if (directory === filesSystem.root) {
      return './'
    }
  
    const parts = []
    let currentDir = directory
  
    while (currentDir !== filesSystem.root) {
      const parentDir = getParentDirectory(currentDir)
  
      if (!parentDir) {
        console.log('Error: Parent directory not found!')
        return ''
      }
  
      parts.unshift(currentDir)
      currentDir = parentDir
    }
  
    return './' + parts.join('/')
  }
  

function getCurrentPath() {
    return getPath(currentDirectory)
}

function printCurrentDirectory() {
    console.log('Current Directory:', getCurrentPath())
}

function makeDirectory(directoryName) {
    if (!currentDirectory.directories.includes(directoryName)) {
        currentDirectory.directories.push(directoryName)
        currentDirectory[directoryName] = {
            files: [],
            directories: [],
        }
        console.log(`Directory Created: ${directoryName}`)
    } else {
        console.log(`Directory already exists with the name: ${directoryName}`)
    }
}

function changeDirectory(directoryName) {
    if (directoryName === '..') {
        if (currentDirectory !== filesSystem.root) {
            currentDirectory = getParentDirectory(currentDirectory)
            console.log('Directory changed')
        } else {
            console.log('Already at the root directory.')
        }
    } else if (currentDirectory.directories.includes(directoryName)) {
        currentDirectory = filesSystem[directoryName]  
        console.log('Directory changed')
    } else {
        console.log('Directory not found')
    }
}


function moveDirectory(sourceDirectory, destinationDirectory) {
    if (currentDirectory?.directories?.includes(sourceDirectory)) {
        if (currentDirectory?.directories?.includes(destinationDirectory)) {
            let destinationDirectoryObject =
                currentDirectory[destinationDirectory]
            
            if (!destinationDirectoryObject) {
                currentDirectory.directories.push(destinationDirectory)
                currentDirectory[destinationDirectory] = {
                    files: [],
                    directories: [],
                }
                destinationDirectoryObject = currentDirectory[destinationDirectory] 
            }

            const sourceDirectoryObject = currentDirectory[sourceDirectory]

            destinationDirectoryObject.directories.push(sourceDirectory)
            destinationDirectoryObject.files.push(...sourceDirectoryObject.files)

            currentDirectory.directories.splice(
                currentDirectory.directories.indexOf(sourceDirectory),
                1
            )

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
    console.log(`Files are: `, currentDirectory?.files ? currentDirectory.files.join(', ') : '[]')
    console.log(`Directories are: `, currentDirectory?.directories ? currentDirectory.directories.join(', ') : '[]')
}

function simulationFileSystem() {
    makeDirectory('newDirectory')
    printCurrentDirectory()
    listFilesAndDirectories()

    changeDirectory('newDirectory')
    printCurrentDirectory()
    listFilesAndDirectories()

    changeDirectory('..')

    moveDirectory('newDirectory', 'dir1')
    printCurrentDirectory()

    changeDirectory('dir1')
    printCurrentDirectory()
    listFilesAndDirectories()
}

simulationFileSystem()