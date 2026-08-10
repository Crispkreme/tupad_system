import AuthController from './AuthController'
import HouseholdController from './HouseholdController'
import HouseholdMemberController from './HouseholdMemberController'

const Controllers = {
    AuthController: Object.assign(AuthController, AuthController),
    HouseholdController: Object.assign(HouseholdController, HouseholdController),
    HouseholdMemberController: Object.assign(HouseholdMemberController, HouseholdMemberController),
}

export default Controllers