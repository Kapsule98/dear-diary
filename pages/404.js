import { useEffect } from "react";
import { useRouter } from "next/router";
const NotFound = () => {

  const router = useRouter();
  useEffect(() => {
    setTimeout(()=> {
      // router.go(x) go x steps back/forward
      router.push("/")
    },2000)
  }, [])

  return (
    <div>
      404 Page not found
    </div>
  );
}
 
export default NotFound;