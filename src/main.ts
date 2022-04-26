import * as core from '@actions/core'
import * as io from '@actions/io'
import * as os from 'os'
import { BooleanStateCache } from './StateHelper'

const IsMacOS = os.platform() === 'darwin'
const IsPostProcess = new BooleanStateCache('IS_POST_PROCESS')

try {
	if (!IsMacOS) {
		throw new Error('Action requires macOS agent.')
	} else if (!!IsPostProcess.Get()) {
		core.info(`Clean directory: ${core.getInput('workspace')}`)
		io.rmRF(`${core.getInput('workspace')}/*`)
	} else {
		IsPostProcess.Set(true)
	}
} catch (ex: any) {
	core.setFailed(ex.message)
}
