'use client'

import { useActionState } from "react";
import {loginAction, logOutAction} from "@/lib/serverActions"

export default function logOutForm() {
    const [state,action, pending] = useActionState(logOutAction,null)
  return (
    <form
      action={action}
    >
    
        {pending? <p>Logging out...</p>: <button>Log Out</button>}
    </form>
  )
}