import * as core from '@actions/core'
import * as io from '@actions/io'
import { BooleanStateCache } from './StateHelper'

const IsPostProcess = new BooleanStateCache('IS_POST_PROCESS')

try {
	if (!!IsPostProcess.Get()) {
		var workspace = process.env.GITHUB_WORKSPACE

		if (!workspace) {
			throw new Error('Environment variable is abnormal.')
		}

		core.info(`Clean directory: ${workspace}`)
		io.rmRF(workspace)
		io.mkdirP(workspace)
	} else {
		IsPostProcess.Set(true)
	}
} catch (ex: any) {
	core.setFailed(ex.message)
}
