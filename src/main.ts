import * as core from '@actions/core'
import * as io from '@actions/io'
import * as os from 'os'

const IsMacOS = os.platform() === 'darwin'

async function Run()
{
	try {
		core.info(`Clean directory: ${core.getInput('workspace')}`)
		io.rmRF(`${core.getInput('workspace')}/*`)
	} catch (ex: any) {
		core.setFailed(ex.message)
	}
}

if (!IsMacOS) {
	core.setFailed('Action requires macOS agent.')
} else {
    Run()
}
