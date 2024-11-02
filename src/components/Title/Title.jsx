export default function Title({ mx, my, title }) {
  return (
    <h2
      className={`text-2xl sm:text-5xl relative ${
        mx ?? ""
      } w-fit font-extrabold dark:text-slate-100 text-gray-800 ${
        my ?? ""
      } group cursor-default`}
    >
      {title}
      <span className="absolute bottom-0 left-0 right-0 h-1/2 bg-blue-700/55 -z-30 group-hover:h-[90%] group-hover:scale-y-110 transition-all duration-500"></span>
    </h2>
  );
}
