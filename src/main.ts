import * as core from '@actions/core'
import * as io from '@actions/io'
import * as path from 'path'
import { BooleanStateCache } from './StateHelper'

const IsWindows = process.platform.toLowerCase() === 'win32'
const IsPostProcess = new BooleanStateCache('IS_POST_PROCESS')

try {
	if (!!IsWindows) {
		throw new Error('Not supported platform.')
	}

	if (!!IsPostProcess.Get()) {
		var workspace = process.env.GITHUB_WORKSPACE

		if (!workspace) {
			throw new Error('Environment variable is abnormal.')
		}

		core.info(`Clean directory: ${workspace}`)

		io.rmRF(path.join(workspace, '*'))
	} else {
		IsPostProcess.Set(true)
	}
} catch (ex: any) {
	core.setFailed(ex.message)
}
