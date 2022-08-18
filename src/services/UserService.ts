class UserService {
  private static instance: UserService
  public static getInstance() {
    if (!UserService.instance) {
      UserService.instance = new UserService()
    }
    return UserService.instance
  }

  register() {
    return '등록!'
  }
  login() {
    return 'logged in!'
  }
}

export default UserService
