import * as core from '@actions/core'
import * as io from '@actions/io'
import * as path from 'path'
import { BooleanStateCache } from './StateHelper'

const IsPostProcess = new BooleanStateCache('IS_POST_PROCESS')

try {
	if (!!IsPostProcess.Get()) {
		var temp = path.join(core.getInput('workspace'), '*')
		core.info(`Clean directory: ${temp}`)
		io.rmRF(temp)
	} else {
		IsPostProcess.Set(true)
	}
} catch (ex: any) {
	core.setFailed(ex.message)
}
