import { useProgress, Html } from "@react-three/drei"
import FadeLoader from "react-spinners/FadeLoader"

const Loader = () => {
  const { progress } = useProgress()

  return (
    <Html>
      <span className="canvas load"></span>
      <p
        style={{
          fontSize: 14,
          color: "#f1f1f1",
          fontWeight: 800,
          marginTop: 40,
        }}
      >
        {progress.toFixed(2)}%
      </p>
    </Html>
  )
}

export const ComponentLoader = () => (
  <div className="w-full h-full flex items-center justify-center">
    <FadeLoader color="#fff" />
  </div>
)

export default Loader
