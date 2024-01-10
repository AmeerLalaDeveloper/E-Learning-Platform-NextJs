import { authenticate } from "@/lib/data"

function Login() {
  return (
    <form action={authenticate}> 
      <input type="text" name="username"/>
      {/* <input type="hidden" name="username"/> */}
      <input type="text" name="password"/>
      <input type="submit" value={'Login'}/>
    </form>
  )
}

export default Login