import { exec, execSync } from 'child_process'
import ghpages from 'gh-pages'
import shelljs from 'shelljs'

const version = process.argv[2]
if (!version) {
    throw Error("You have to provide version name")
}
if (version != 'latest' && !version.startsWith('v')) {
    throw Error(`Invalid version name ${version}`)
}
console.log(`Parameter: version = ${version}`)

const BASE_URL = `https://ggajos.com/typocitos-game/${version}/`
console.log(`Env:BASE_URL = ${BASE_URL}`)

async function runPackage() {
    execSync('npm run-script p:all', {
        cwd: "../typocitos",
        env: {
            BASE_URL
        },
        stdio: 'inherit'
    })
}

async function runPublish() {
    await ghpages.publish(
        '../typocitos/dist',
        {
            dest: version
        },
        () => {
            console.log(`Published to ${BASE_URL}`)
        }
    )
}

async function run() {
    await runPackage()
    await runPublish()
}

run()