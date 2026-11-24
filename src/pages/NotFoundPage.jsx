function NotFoundPage() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center mt-10">
      <h1 className="text-2xl font-bold text-center">
        Error 404: Page Not Found!
      </h1>
      <p className="text-lg font-medium">
        Go back{" "}
        <a className="font-semibold underline" href="/">
          Home
        </a>
      </p>
    </div>
  );
}
export default NotFoundPage;
