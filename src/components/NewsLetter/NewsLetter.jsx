import * as fontAwesome from "react-icons/fa"; //fontawesome icons

export default function NewsLetter() {
  return (
    <div
      id="newsLetter"
      className="news-letter px-2 lg:p-10 py-6 my-12 4xl:container"
    >
      <div className="grid lg:grid-cols-2 items-center gap-16 max-w-7xl mx-auto min-h-[350px]">
        <div>
          <h3 className="text-white text-4xl font-bold">
            Subscribe to Our Newsletter
          </h3>
          <p className="text-base mt-6 text-gray-300">
            Subscribe to our newsletter and stay up to date with the latest
            news, updates, and exclusive offers. Get valuable insights. Join our
            community today!
          </p>
          <div className="flex gap-2 flex-wrap">
            <div className="relative sm:w-96">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <fontAwesome.FaEnvelope className="text-white" />
              </div>
              <input
                type="text"
                id="input-group-1"
                className="bg-transparent border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@example.com"
              />
            </div>
            <button
              type="button"
              className="disabled:cursor-not-allowed px-6 py-2.5 group relative overflow-hidden bg-blue-700 focus:ring-4 focus:ring-blue-300 inline-flex items-center rounded-lg text-white justify-center"
            >
              <span className=" flex items-center">Submit</span>
              <div className="absolute inset-0 h-[200%] w-[200%] rotate-45 translate-x-[-80%] transition-all group-hover:scale-100 bg-white/30 group-hover:translate-x-[55%] z-20 duration-1000"></div>
            </button>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <fontAwesome.FaCalendarAlt className="text-blue-600 mb-6 text-5xl p-3 border border-gray-500  rounded-md" />
            <h3 className="text-white text-xl font-semibold mb-3">
              Weekly Products
            </h3>
            <p className="text-gray-300 text-sm">
              Be the first to know about new products every week.
            </p>
          </div>
          <div>
            <fontAwesome.FaHandPaper className="text-blue-600 mb-6 text-5xl p-3 border border-gray-500  rounded-md" />
            <h3 className="text-white text-xl font-semibold mb-3">Security</h3>
            <p className="text-gray-300 text-sm">
              We will never spam. {"That's"} our promise .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
