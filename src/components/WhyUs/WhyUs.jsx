import whyUs from "../../assets/imgs/whyus.jpg";
import { motion } from "framer-motion";
import Title from "../Title/Title";
import { FaCheckCircle } from "react-icons/fa";

export default function WhyUs() {
  return (
    // mt-20 4xl:container p-6
    <div className="my-12 mt-20 overflow-hidden px-5 bg-gradient-to-tr from-slate-400 via-slate-200 to-slate-300 dark:bg-gradient-to-tr dark:from-slate-950 dark:via-slate-800 dark:to-slate-900 lg:p-10 py-6 rounded-md relative 4xl:container">
      <Title title={"Why Us"} mx={"mx-auto"} my={"mb-10"} />

      <div className="grid md:grid-cols-2 items-center gap-16 md:min-h-[340px]">
        <motion.div
          initial={{
            opacity: 0,
            x: -100,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
            transition: { duration: 0.9 },
            
          }}
          viewport={{ once: true }}
        >
          <p className=" text-xl">
            Unlock a world of possibilities with our exclusive features. Explore
            how our unique offerings can transform your journey and empower you
            to achieve more.
          </p>
          <ul className="space-y-4 mt-8">
            <li className="flex items-center gap-3 text-lg ">
              <FaCheckCircle className="text-blue-700 bg-white rounded-full" />
              Fast Delivery
            </li>
            <li className="flex items-center gap-3 text-lg ">
              <FaCheckCircle className="text-blue-700 bg-white rounded-full" />
              Data Export
            </li>
            <li className="flex items-center gap-3 text-lg ">
              <FaCheckCircle className="text-blue-700 bg-white rounded-full" />
              Free Shiping
            </li>
            <li className="flex items-center gap-3 text-lg ">
              <FaCheckCircle className="text-blue-700 bg-white rounded-full" />
              Best Quality
            </li>
          </ul>
        </motion.div>
        <img src={whyUs} className="w-full object-contain rounded-md" />
      </div>
    </div>
  );
}
