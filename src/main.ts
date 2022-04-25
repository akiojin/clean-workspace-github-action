import * as core from '@actions/core'
import * as io from '@actions/io'
import * as os from 'os'
import { BooleanStateCache } from './StateHelper'

const IsMacOS = os.platform() === 'darwin'
const PostProcess = new BooleanStateCache('IS_POST_PROCESS')

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
	if (!!PostProcess.Get()) {
		Run()
	}
	
	PostProcess.Set(true)
}
