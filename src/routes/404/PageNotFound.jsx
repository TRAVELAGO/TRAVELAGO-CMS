import { Link } from "react-router-dom";

import { PATH_URL } from "../../utils/const/common";

function PageNotFound() {
  return (
    <div className="container">
      <div class="relative flex flex-col items-center px-0 py-16 text-center space-y-5">
        <img
          src="/404.webp"
          alt="Not Found"
          className="w-[500px] align-middle"
        />
        <h1 className="text-4xl font-bold">
          Oops, looks like the page is lost.
        </h1>
        <p class="text-center text-2xl">
          This is not a fault, just an accident that was not intentional.
        </p>
        <Link
          to={PATH_URL.HOME}
          className="inline-block border border-primary-100 px-4 py-2"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}

export default PageNotFound;
