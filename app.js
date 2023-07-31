const filesSystem = {
    root: {
        files: [],
        directories: [],
        name: 'root'
    },
}

let currentDirectory = filesSystem.root

function getParentDirectory(directory) {
    if (directory === filesSystem.root) {
        return filesSystem.root
    }
    for (const dir in filesSystem) {
        if (filesSystem[dir].directories.includes(directory.name)) {
            return filesSystem[dir];
        }
    }

    return filesSystem.root;
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

        parts.unshift(currentDir.name)
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
        filesSystem[directoryName] = {
            files: [],
            directories: [],
            name: directoryName
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
    const doesDirectoryExists = currentDirectory.directories.includes(sourceDirectory)
    const destinationDirectoryObject = filesSystem[destinationDirectory];

    if (doesDirectoryExists && currentDirectory && destinationDirectoryObject) {
        destinationDirectoryObject.directories.push(sourceDirectory)
        currentDirectory.directories = currentDirectory.directories.filter((dir) => dir !== sourceDirectory);
    } else {
        console.log(`Error: Source or Destination Directory not found`);
    }
}

function moveFile(sourceFile, destinationDirectory) {
    const doesFileExists = currentDirectory.files.includes(sourceFile)
    const destinationDirectoryObject = filesSystem[destinationDirectory];

    if (doesFileExists && currentDirectory && destinationDirectoryObject) {
        destinationDirectoryObject.files.push(sourceFile)
        currentDirectory.files = currentDirectory.files.filter((dir) => dir !== sourceFile);
    } else {
        console.log(`Error: Source or Destination File not found`);
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
    makeDirectory('newDirectorySecondLevel')
    changeDirectory('newDirectorySecondLevel')
    makeDirectory('newDirectoryThirdLevel')
    printCurrentDirectory()
    listFilesAndDirectories()

    changeDirectory('..')
    makeDirectory('dir1')

    changeDirectory('..')
    changeDirectory('..')
    printCurrentDirectory()
    moveDirectory('newDirectory', 'dir1')
    listFilesAndDirectories()

    console.log(filesSystem)

}

simulationFileSystem()