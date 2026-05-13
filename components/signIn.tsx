import {loginAction} from "@/lib/serverActions"
import {useActionState} from "react"
export default function SignInForm() {
  const [state,action, pending] = useActionState(loginAction,null)
  return (
    <form
      action={loginAction}
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