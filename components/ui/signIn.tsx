import {signInAction} from "@/lib/serverActions"
export function SignIn() {
  return (
    <form
      action={signInAction}
    >
      <label>
        Email
        <input name="email" type="email" />
      </label>
      <label>
        Password
        <input name="password" type="password" />
      </label>
      <button>Sign In</button>
    </form>
  )
}