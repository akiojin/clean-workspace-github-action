import * as core from '@actions/core'
import rimraf from 'rimraf'
import { BooleanEnvironment } from './Environment'

const IsPostProcess = new BooleanEnvironment('IS_POST_PROCESS')

try {
	if (!!IsPostProcess.Get()) {
		var workspace = process.env.GITHUB_WORKSPACE

		if (!workspace) {
			throw new Error('Environment variable is abnormal.')
		}

		core.info(`Clean directory: ${workspace}`)

		rimraf.rimrafSync(workspace)
	} else {
		IsPostProcess.Set(true)
	}
} catch (ex: any) {
	core.setFailed(ex.message)
}
