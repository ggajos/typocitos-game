import runAll from 'npm-run-all'
import ghpages from 'gh-pages'

const version = process.argv[2]
if (!version) {
    throw Error("You have to provide version name")
}
if (version != 'latest' && !version.startsWith('v')) {
    throw Error(`Invalid version name ${version}`)
}
console.log(`Parameter: version = ${version}`)

// BASE URL IS NOT WORKING
process.env['BASE_URL'] = `https://ggajos.com/typocitos-game/${version}/`
console.log(`Env:BASE_URL = ${process.env['BASE_URL']}`)

async function runPackage() {
    const prev = process.cwd()
    process.chdir("../typocitos")
    await runAll(
        ['p:all'],
        {
            stdin: process.stdin,
            stdout: process.stdout,
            stderr: process.stderr
        }
    )
    process.chdir(prev)
}

async function runPublish() {
    await ghpages.publish(
        '../typocitos/dist',
        {
            dest: version
        },
        () => {
            console.log(`Published to ${process.env['BASE_URL']}`)
        }
    )
}

async function run() {
    // await runPackage()
    // await runPublish()
}

run()