function NotFoundPage() {
  return (
    <div className="w-full h-screen flex flex-col gap-10 justify-center items-center p-2">
      <div className="flex flex-col gap-5">
        <h1 className="text-4xl font-bold text-center">404 - Page Not Found</h1>
        <p className="text-lg font-medium text-(--slate)/80">
          Oops! The page you're looking for doesn't exist.
        </p>
      </div>
      <a
        className="px-8 py-3.5 bg-(--teal) transition duration-300 rounded-md hover:bg-(--teal)/60 text-(--white) font-bold"
        href="/"
      >
        Go back to homepage
      </a>
    </div>
  );
}
export default NotFoundPage;
