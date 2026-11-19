import { motion } from "motion/react";
import { GiArtificialHive } from "react-icons/gi";

const MotionHive = motion.create(GiArtificialHive);

const LogoItem = () => {
  return (

<MotionHive
 size={15}
      color='white' 

  initial={{ scale: 1 }}
  whileHover={{
    scale: 1.2,
    rotate: 15,
  }}
  whileTap={{
    scale: 0.9,
  }}
  transition={{
    type: "spring",
    stiffness: 300,
  }}
/>

  
  )
}

export default LogoItem
