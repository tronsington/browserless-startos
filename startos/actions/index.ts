import { sdk } from '../sdk'
import { showToken } from './showToken'

export const actions = sdk.Actions.of().addAction(showToken)
